from fastapi import FastAPI, HTTPException
import numpy as np
import gurobipy as gp
from gurobipy import GRB
import pandas as pd

app = FastAPI()

def parse_offices(file_path):
    try:
        offices_data = pd.read_csv(file_path, header=None, sep=':', engine='python')
        offices = {}
        for _, row in offices_data.iterrows():
            floor, office_str = row[0], row[1]
            for office_info in office_str.split(','):
                office, capacity = office_info.split('(')
                capacity = int(capacity.replace(')', ''))
                offices[office] = {
                    'floor': floor.replace('floor', ''),
                    'capacity': capacity
                }
        return offices
    except pd.errors.ParserError as e:
        raise HTTPException(status_code=500, detail=f"Error parsing CSV file: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

def clean_data(data):
    data.columns = [col.strip() for col in data.columns]
    data = data.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    return data

@app.get("/optimize")
def optimize():
    employee_file_path = 'employee_data.csv'
    office_file_path = 'offices.csv'
    
    try:
        employee_data = pd.read_csv(employee_file_path, encoding='iso-8859-1')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading employee data: {e}")

    employee_data = clean_data(employee_data)
    
    offices = parse_offices(office_file_path)

    # Print debug information for offices
    print("Parsed Offices:", offices)
    
    departments = employee_data['Department'].unique()

    # Employees and their roles
    employees = [f"{name}_{i}" for i, name in enumerate(employee_data['Name'])]
    employee_roles = employee_data['Role'].tolist()
    employee_departments = employee_data['Department'].tolist()

    # Print debug information for employees
    print("Employees:", employees)
    print("Employee Roles:", employee_roles)
    print("Employee Departments:", employee_departments)

    # Define role weights
    role_weights = {
        'Department Chair': 3,
        'Prof.': 2.5,
        'Assoc. Prof.': 2,
        'Assist Prof.': 1.5,
        'Ph.D': 1.35,
        'Teaching Assist.': 1,
        'Prof. (Part time)': 0.1
    }

    model = gp.Model('EmployeeOfficeAssignment')

    # Assignment variables
    assignment = {}
    for e, role, dept in zip(employees, employee_roles, employee_departments):
        assignment[e] = {o: model.addVar(vtype=GRB.BINARY, name=f"Assign_{e}_{o}") for o in offices.keys()}

    # Set objective to maximize role weights
    objective = gp.quicksum(assignment[e][o] * role_weights[role] for e, role in zip(employees, employee_roles) for o in assignment[e])
    model.setObjective(objective, GRB.MAXIMIZE)

    # Constraint: Each employee to exactly one office
    for e in employees:
        model.addConstr(gp.quicksum(assignment[e][o] for o in assignment[e]) == 1)

    # Print debug information for constraints
    print("Office Capacities:", {o: offices[o]['capacity'] for o in offices.keys()})
    
    # Constraint: Office capacities
    for o in offices.keys():
        model.addConstr(gp.quicksum(assignment[e][o] for e in employees) <= offices[o]['capacity'])

    # Unique offices for Department Chairs
    for dept in departments:
        chairs = [e for e, role in zip(employees, employee_roles) if role == 'Department Chair' and employee_departments[employees.index(e)] == dept]
        if chairs:
            for e in chairs:
                model.addConstr(gp.quicksum(assignment[e][o] for o in assignment[e]) == 1)

    # Optimize the model
    model.optimize()

    if model.status == GRB.OPTIMAL:
        solution = {e: [o for o in assignment[e] if assignment[e][o].X > 0.5][0] for e in employees}
        office_occupancy = {o: 0 for o in offices.keys()}
        for e in solution:
            office_occupancy[solution[e]] += 1
        assignments = [
            {
                "name": e.split('_')[0],
                "id": e.split('_')[1],
                "office": office,
                "role": role,
                "department": dept,
                "floor": offices[office]['floor'],
                "capacity": offices[office]['capacity'],
                "occupancy": office_occupancy[office]
            }
            for e, office, role, dept in zip(employees, solution.values(), employee_roles, employee_departments)
        ]
        return assignments
    else:
        # Print infeasibility information
        model.computeIIS()
        model.write("model.ilp")
        print("Infeasible constraints written to model.ilp")
        return {"error": "No feasible solution found"}

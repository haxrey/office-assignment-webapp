import logging
from fastapi import FastAPI, HTTPException
import numpy as np
import gurobipy as gp
from gurobipy import GRB
import pandas as pd

app = FastAPI()

logging.basicConfig(level=logging.DEBUG)

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
        logging.error(f"Error parsing CSV file: {e}")
        raise HTTPException(status_code=500, detail=f"Error parsing CSV file: {e}")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")

def clean_data(data):
    data.columns = [col.strip() for col in data.columns]
    data = data.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    return data

@app.get("/optimize")
def optimize():
    logging.debug("Optimize endpoint called.")
    employee_file_path = 'employee_data.csv'
    office_file_path = 'offices.csv'
    
    try:
        employee_data = pd.read_csv(employee_file_path, encoding='iso-8859-1')
        logging.debug("Employee data read successfully.")
    except Exception as e:
        logging.error(f"Error reading employee data: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading employee data: {e}")

    try:
        employee_data = clean_data(employee_data)
        offices = parse_offices(office_file_path)
        logging.debug(f"Parsed Offices: {offices}")
        
        departments = employee_data['Department'].unique()
        employees = [f"{name}_{i}" for i, name in enumerate(employee_data['Name'])]
        employee_roles = employee_data['Role'].tolist()
        employee_departments = employee_data['Department'].tolist()
        logging.debug(f"Employees: {employees}")
        logging.debug(f"Employee Roles: {employee_roles}")
        logging.debug(f"Employee Departments: {employee_departments}")

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
        assignment = {}
        for e, role, dept in zip(employees, employee_roles, employee_departments):
            assignment[e] = {o: model.addVar(vtype=GRB.BINARY, name=f"Assign_{e}_{o}") for o in offices.keys()}

        objective = gp.quicksum(assignment[e][o] * role_weights[role] for e, role in zip(employees, employee_roles) for o in assignment[e])
        model.setObjective(objective, GRB.MAXIMIZE)

        for e in employees:
            model.addConstr(gp.quicksum(assignment[e][o] for o in assignment[e]) == 1)
        logging.debug("Constraints for each employee to exactly one office added.")

        for o in offices.keys():
            model.addConstr(gp.quicksum(assignment[e][o] for e in employees) <= offices[o]['capacity'])
        logging.debug(f"Office Capacities: {offices}")

        for dept in departments:
            chairs = [e for e, role in zip(employees, employee_roles) if role == 'Department Chair' and employee_departments[employees.index(e)] == dept]
            if chairs:
                for e in chairs:
                    model.addConstr(gp.quicksum(assignment[e][o] for o in assignment[e]) == 1)
        logging.debug("Unique offices for Department Chairs added.")

        model.optimize()
        logging.debug("Model optimized.")

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
            logging.debug(f"Assignments: {assignments}")
            return assignments
        else:
            model.computeIIS()
            model.write("model.ilp")
            logging.error("Infeasible constraints written to model.ilp")
            raise HTTPException(status_code=500, detail="No feasible solution found")
    except Exception as e:
        logging.error(f"Unexpected error during optimization: {e}")
        raise HTTPException(status_code=500, detail=f"Unexpected error during optimization: {e}")

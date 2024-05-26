import numpy as np
import gurobipy as gp
from gurobipy import GRB
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/optimize")
async def optimize():
    file_path = 'employee_data.csv'
    employee_data = pd.read_csv(file_path, encoding='iso-8859-1')

    departments = employee_data['Department'].unique()
    num_offices_per_dept = 13  # Adjust as needed

    # Mapping offices to departments
    department_office_map = {}
    office_counter = 1
    for dept in departments:
        department_office_map[dept] = [f'Office{office_counter + i}_{dept}' for i in range(num_offices_per_dept)]
        office_counter += num_offices_per_dept

    # Employees and their roles
    employees = [f"{name}_{i}" for i, name in enumerate(employee_data['Name'])]
    employee_roles = employee_data['Role'].tolist()
    employee_departments = employee_data['Department'].tolist()

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
        valid_offices = department_office_map[dept]
        assignment[e] = {o: model.addVar(vtype=GRB.BINARY, name=f"Assign_{e}_{o}") for o in valid_offices}

    # Set objective to maximize role weights
    objective = gp.quicksum(assignment[e][o] * role_weights[role] for e, role in zip(employees, employee_roles) for o in assignment[e])
    model.setObjective(objective, GRB.MAXIMIZE)

    # Constraint: Each employee to exactly one office
    for e in employees:
        model.addConstr(gp.quicksum(assignment[e][o] for o in assignment[e]) == 1)

    # Unique offices for Department Chairs
    for dept in departments:
        chairs = [e for e, role in zip(employees, employee_roles) if role == 'Department Chair' and employee_departments[employees.index(e)] == dept]
        if chairs:
            chair_offices = department_office_map[dept][:len(chairs)]  # Reserve first few offices for chairs
            for i, e in enumerate(chairs):
                model.addConstr(assignment[e][chair_offices[i]] == 1)

    # Office capacities
    for dept, offices in department_office_map.items():
        for o in offices:
            model.addConstr(gp.quicksum(assignment[e][o] for e in employees if o in assignment[e]) <= 1)  

    # Optimize the model
    model.optimize()

    result = []
    if model.status == GRB.OPTIMAL:
        solution = {e: {o: assignment[e][o].X for o in assignment[e]} for e in employees}
        for e in solution:
            for o in solution[e]:
                if solution[e][o] > 0.5:
                    result.append({"employee": e, "office": o})
    else:
        raise HTTPException(status_code=400, detail="No feasible solution found")

    return result

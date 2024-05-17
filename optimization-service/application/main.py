from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import gurobipy as gp
from gurobipy import GRB
import pandas as pd
import os
import re

app = FastAPI()

class OfficeAssignment(BaseModel):
    office: str
    assigned_to: str
    role: str
    department: str
    floor: int

def parse_offices(csv_file_path):
    offices = []
    with open(csv_file_path, 'r', encoding='latin1') as file:
        for line in file:
            if line.startswith('floor'):
                floor_number = int(re.findall(r'\d+', line)[0])
                office_entries = re.findall(r'(\w+\(\d+\))', line)
                for entry in office_entries:
                    office_name = re.findall(r'(\w+)', entry)[0]
                    capacity = int(re.findall(r'\((\d+)\)', entry)[0])
                    offices.append((floor_number, office_name, capacity))
    return offices

def run_gurobi_model():
    # Load the employee data from CSV using an absolute path and specify encoding
    base_dir = os.path.dirname(os.path.abspath(__file__))
    employee_csv = os.path.join(base_dir, 'employee_data.csv')
    office_csv = os.path.join(base_dir, 'offices.csv')
    
    employee_data = pd.read_csv(employee_csv, encoding='latin1')
    employees = employee_data['Name'].tolist()
    roles = employee_data['Role'].tolist()
    departments = employee_data['Department'].tolist()
    
    offices = parse_offices(office_csv)
    office_names = [office[1] for office in offices]
    office_capacities = {office[1]: office[2] for office in offices}
    
    # Ensure unique employee names by appending a unique identifier
    unique_employees = []
    employee_count = {}
    for emp in employees:
        if emp in employee_count:
            employee_count[emp] += 1
            unique_employees.append(f"{emp}_{employee_count[emp]}")
        else:
            employee_count[emp] = 1
            unique_employees.append(emp)
    
    # Create a Gurobi model
    model = gp.Model('EmployeeOfficeAssignment')

    # Decision variables
    assignment = model.addVars(unique_employees, office_names, vtype=GRB.BINARY, name="Assign")

    # Objective: maximize assignment (dummy objective since we removed preferences)
    objective = gp.quicksum(assignment[e, o] for e in unique_employees for o in office_names)
    model.setObjective(objective, GRB.MAXIMIZE)

    # Constraints
    # Each employee assigned to exactly one office
    for e in unique_employees:
        model.addConstr(assignment.sum(e, '*') == 1, name=f"OneOffice_{e}")

    # Office capacities
    for o in office_names:
        model.addConstr(assignment.sum('*', o) <= office_capacities[o], name=f"Cap_{o}")

    # Optimize the model
    model.optimize()

    # Debugging: Check for infeasibility
    if model.status == GRB.INFEASIBLE:
        model.computeIIS()
        model.write("model.ilp")

    # Extract the solution
    assignments = []
    if model.status == GRB.OPTIMAL:
        solution = model.getAttr('X', assignment)
        for i, e in enumerate(unique_employees):
            for o in office_names:
                if solution[e, o] > 0.5:
                    original_emp = e.split('_')[0]
                    role = roles[employees.index(original_emp)]
                    department = departments[employees.index(original_emp)]
                    floor = next(office[0] for office in offices if office[1] == o)
                    assignments.append({
                        "office": o, 
                        "assigned_to": original_emp, 
                        "role": role, 
                        "department": department, 
                        "floor": floor
                    })

    return assignments

@app.get("/assignments", response_model=List[OfficeAssignment])
def get_assignments():
    results = run_gurobi_model()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

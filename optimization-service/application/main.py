from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import gurobipy as gp
from gurobipy import GRB
import pandas as pd
import os

app = FastAPI()

class OfficeAssignment(BaseModel):
    office: str
    assigned_to: str
    role: str
    department: str
    floor: int

def run_gurobi_model():
    # Load the employee data from CSV using an absolute path and specify encoding
    base_dir = os.path.dirname(os.path.abspath(__file__))
    employee_csv_path = os.path.join(base_dir, 'employee_data.csv')
    office_csv_path = os.path.join(base_dir, 'offices.csv')
    employee_data = pd.read_csv(employee_csv_path, encoding='latin1')
    office_data = pd.read_csv(office_csv_path, encoding='latin1')

    # Limit the number of employees and offices to fit the license limit
    max_employees = 50  # Adjust this number to fit within the license limits
    max_offices = 20    # Adjust this number to fit within the license limits

    employees = employee_data['Name'].tolist()[:max_employees]
    roles = employee_data['Role'].tolist()[:max_employees]
    departments = employee_data['Department'].tolist()[:max_employees]

    # Process office data
    offices = []
    capacities = {}
    floors = {}
    for index, row in office_data.iterrows():
        floor_data = row[0].split(':')
        floor = int(floor_data[0].replace('floor', ''))
        office_list = floor_data[1].split(',')
        for office in office_list:
            office_name, capacity = office.split('(')
            capacity = int(capacity.replace(')', ''))
            offices.append(office_name)
            capacities[office_name] = capacity
            floors[office_name] = floor
            if len(offices) >= max_offices:
                break
        if len(offices) >= max_offices:
            break

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
    assignment = model.addVars(unique_employees, offices, vtype=GRB.BINARY, name="Assign")

    # Objective: maximize assignment (dummy objective since we removed preferences)
    objective = gp.quicksum(assignment[e, o] for e in unique_employees for o in offices)
    model.setObjective(objective, GRB.MAXIMIZE)

    # Constraints
    # Each employee assigned to exactly one office
    for e in unique_employees:
        model.addConstr(assignment.sum(e, '*') == 1, name=f"OneOffice_{e}")

    # Office capacities
    for o in offices:
        model.addConstr(assignment.sum('*', o) <= capacities[o], name=f"Cap_{o}")

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
        for e in unique_employees:
            for o in offices:
                if solution[e, o] > 0.5:
                    original_emp = e.split('_')[0]
                    emp_index = employees.index(original_emp)
                    assignments.append({
                        "office": o,
                        "assigned_to": original_emp,
                        "role": roles[emp_index],
                        "department": departments[emp_index],
                        "floor": floors[o]
                    })

    return assignments

@app.get("/assignments", response_model=List[OfficeAssignment])
def get_assignments():
    results = run_gurobi_model()
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

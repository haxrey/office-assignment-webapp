from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import gurobipy as gp
from gurobipy import GRB

app = FastAPI()

class OptimizationInput(BaseModel):
    # Define the structure of your input data here
    data_path: str

@app.post("/optimize/")
def run_optimization(input: OptimizationInput):
    try:
        data = pd.read_csv(input.data_path, index_col=0)
        # Your Gurobi code would go here. For now, we are simulating an optimization.
        model = gp.Model('EmployeeOfficeAssignment')
        employees = list(data.index[:-1])  # Excludes the 'Capacities' row
        offices = list(data.columns)
        preferences = {employee: data.loc[employee].to_dict() for employee in employees}
        capacities = data.loc['Capacities'].to_dict()

        # Decision variables
        assignment = { (employee, office): model.addVar(vtype=GRB.BINARY, name=f'assign_{employee}_{office}')
                        for employee in employees for office in offices }

        # Objective function
        model.setObjective(gp.quicksum(preferences[employee][office] * assignment[employee, office]
                                       for employee in employees for office in offices), GRB.MAXIMIZE)

        # Constraints
        for employee in employees:
            model.addConstr(gp.quicksum(assignment[employee, office] for office in offices) == 1)

        for office in offices:
            model.addConstr(gp.quicksum(assignment[employee, office] for employee in employees) <= capacities[office])

        model.optimize()

        # Collect results
        results = {employee: {office: assignment[employee, office].x
                              for office in offices if assignment[employee, office].x > 0.5}
                   for employee in employees}

        return {"status": "success", "assignments": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


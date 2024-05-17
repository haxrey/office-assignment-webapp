from flask import Flask, request, jsonify
import pandas as pd
import gurobipy as gp
from gurobipy import GRB

app = Flask(__name__)

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    try:
        distances = pd.DataFrame(data['distances'])

        employees = distances.index.tolist()
        offices = distances.columns.tolist()

        model = gp.Model('EmployeeOfficeAssignment')

        assignment = model.addVars(employees, offices, vtype=GRB.BINARY, name="Assign")

        objective = gp.quicksum(assignment[e, o] * distances.loc[e, o] for e in employees for o in offices)
        model.setObjective(objective, GRB.MINIMIZE)

        for e in employees:
            model.addConstr(assignment.sum(e, '*') == 1, name=f"OneOffice_{e}")

        for o in offices:
            model.addConstr(assignment.sum('*', o) <= 2, name=f"Cap_{o}")

        model.optimize()

        if model.status == GRB.OPTIMAL:
            solution = model.getAttr('X', assignment)
            results = {e: {o: solution[e, o] for o in offices if solution[e, o] > 0.5} for e in employees}
            return jsonify({'status': 'success', 'assignments': results})
        else:
            return jsonify({'error': 'Optimization failed'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000)

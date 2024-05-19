import pandas as pd
import numpy as np
from scipy.optimize import linprog

class SciPyOptimizer:
    def __init__(self, employee_file_path, office_file_path):
        self.employee_data = pd.read_csv(employee_file_path, encoding='iso-8859-1')
        self.offices = self.parse_offices(office_file_path)
        self.role_weights = {
            'Department Chair': 3,
            'Prof.': 2.5,
            'Assoc. Prof.': 2,
            'Assist Prof.': 1.5,
            'Ph.D': 1.35,
            'Teaching Assist.': 1,
            'Prof. (Part time)': 0.1
        }
        self.employees = [f"{name}_{i}" for i, name in enumerate(self.employee_data['Name'])]
        self.employee_roles = self.employee_data['Role'].tolist()
        self.employee_departments = self.employee_data['Department'].tolist()
        self.office_keys = list(self.offices.keys())
        self.num_employees = len(self.employees)
        self.num_offices = len(self.office_keys)
        self.assignments = None

    def parse_offices(self, file_path):
        offices_data = pd.read_csv(file_path, header=None, sep=':', engine='python')
        offices = {}
        for _, row in offices_data.iterrows():
            floor, office_str = row[0], row[1]
            for office_info in office_str.split(','):
                office, capacity = office_info.split('(')
                capacity = int(capacity.replace(')', ''))
                offices[office] = {
                    'floor': floor.replace('floor', ''),
                    'capacity': capacity,
                    'occupancy': 0
                }
        return offices

    def build_problem(self):
        # Objective function
        c = []
        for emp, role in zip(self.employees, self.employee_roles):
            for office in self.office_keys:
                c.append(-self.role_weights[role])  # SciPy linprog does minimization, hence the negative sign

        # Constraints
        A_eq = []
        b_eq = []
        
        # Each employee must be assigned to exactly one office
        for i in range(self.num_employees):
            constraint = [0] * (self.num_employees * self.num_offices)
            for j in range(self.num_offices):
                constraint[i * self.num_offices + j] = 1
            A_eq.append(constraint)
            b_eq.append(1)

        # Office capacity constraints
        for j in range(self.num_offices):
            constraint = [0] * (self.num_employees * self.num_offices)
            for i in range(self.num_employees):
                constraint[i * self.num_offices + j] = 1
            A_eq.append(constraint)
            b_eq.append(self.offices[self.office_keys[j]]['capacity'])

        return np.array(c), np.array(A_eq), np.array(b_eq)

    def solve(self):
        c, A_eq, b_eq = self.build_problem()
        bounds = [(0, 1) for _ in range(self.num_employees * self.num_offices)]
        result = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')

        if result.success:
            self.assignments = result.x.reshape((self.num_employees, self.num_offices))
            return self.generate_assignments()
        else:
            raise ValueError("No feasible solution found")

    def generate_assignments(self):
        assignments = []
        for i, emp in enumerate(self.employees):
            for j, office in enumerate(self.office_keys):
                if self.assignments[i, j] > 0.5:
                    name, _id = emp.split('_')
                    role = self.employee_roles[i]
                    dept = self.employee_departments[i]
                    assignments.append({
                        'name': name,
                        'id': _id,
                        'office': office,
                        'role': role,
                        'department': dept,
                        'floor': self.offices[office]['floor'],
                        'capacity': self.offices[office]['capacity'],
                        'occupancy': self.offices[office]['occupancy'] + 1  # Assuming each office will be filled as per capacity
                    })
                    self.offices[office]['occupancy'] += 1
        return assignments

import pulp

# Create a simple LP problem
prob = pulp.LpProblem("SimpleProblem", pulp.LpMaximize)

# Decision variables
x = pulp.LpVariable('x', lowBound=0, cat='Continuous')
y = pulp.LpVariable('y', lowBound=0, cat='Continuous')

# Objective function
prob += 3 * x + 2 * y, "Objective"

# Constraints
prob += 2 * x + y <= 20
prob += 4 * x - 5 * y >= -10
prob += x - 2 * y >= -2
prob += -x + 5 * y == 15

# Solve the problem
prob.solve()

# Print the results
print("Status:", pulp.LpStatus[prob.status])
print("x =", pulp.value(x))
print("y =", pulp.value(y))

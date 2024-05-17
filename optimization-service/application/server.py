# server.py using Flask
from flask import Flask, request, jsonify
import model  # Import the model.py file

app = Flask(__name__)

@app.route('/optimize', methods=['POST'])
def optimize():
    try:
        data = request.json
        result = model.run_optimization(data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

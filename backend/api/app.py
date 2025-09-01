from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) #replace this with our frontend domain in prod

@app.route('/')
def hello_world():
    return 'Hello, Flask is working!'

if __name__ == "__main__":
    app.run(debug=True)
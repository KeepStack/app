from flask import Flask, request, jsonify
from flask_cors import CORS
from endpoints.auth import AuthService
from models.user import User

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) #replace this with our frontend domain in prod

@app.route('/')
def hello_world():
    return 'Hello'

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    user = User(email, password)
    response = AuthService.register_user(user)
    return jsonify(response)

@app.route('login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or password:
        return jsonify({"error": "Email and password are required"}), 400
    
    response = AuthService.login_user(email, password)
    return jsonify(response)

#TODO: implement sign in with google

if __name__ == "__main__":
    app.run(debug=True)
"""Main flask application."""

import sqlite3
from flask import Flask, request, jsonify
from db import init_db
from flask_cors import CORS
# from firewall import RequestLoggerMiddleware

# Create and configure Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Apply middleware
# app.wsgi_app = RequestLoggerMiddleware(app.wsgi_app)

# Database connection helper
def db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

# Routes

# Register a new user
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    conn = db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO Users (email, password) VALUES (?, ?)", (email, password))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 400

# Login an existing user
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users WHERE email = ? AND password = ?", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

# Fetch all users
@app.route('/users', methods=['GET'])
def get_all_users():
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
    return jsonify({'users': [dict(row) for row in users]})

# Fetch posts of a specific user
@app.route('/users/<int:user_id>/posts', methods=['GET'])
def get_user_posts(user_id):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Posts WHERE user_id = ?", (user_id,))
    posts = cursor.fetchall()
    return jsonify({'posts': [dict(row) for row in posts]})

# Create a post for a specific user
@app.route('/users/<int:user_id>/posts', methods=['POST'])
def create_post(user_id):
    data = request.json
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Posts (user_id, title, content) VALUES (?, ?, ?)", (user_id, title, content))
    conn.commit()
    return jsonify({'message': 'Post created successfully'}), 201

# Manage request logs
@app.route('/logs', methods=['GET', 'POST'])
def manage_logs():
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM RequestLogs")
        logs = cursor.fetchall()
        return jsonify({'logs': [dict(row) for row in logs]})

    elif request.method == 'POST':
        data = request.json
        user_id = data.get('user_id')
        request_url = data.get('request_url')
        request_payload = data.get('request_payload')
        request_type = data.get('request_type')
        request_ip = data.get('request_ip')
        response_status = data.get('response_status')
        response_object = data.get('response_object')

        cursor.execute("""
            INSERT INTO RequestLogs 
            (user_id, request_url, request_payload, request_type, request_ip, response_status, response_object)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (user_id, request_url, request_payload, request_type, request_ip, response_status, response_object))
        conn.commit()
        return jsonify({'message': 'Log entry created'}), 201

# Fetch logs of a specific user
@app.route('/users/<int:user_id>/logs', methods=['GET'])
def get_user_logs(user_id):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM RequestLogs WHERE user_id = ?", (user_id,))
    logs = cursor.fetchall()
    return jsonify({'logs': [dict(row) for row in logs]})

# Fetch profile of a specific user
@app.route('/users/<int:user_id>/profile', methods=['GET', 'POST', 'PUT', 'DELETE'])
def manage_profile(user_id):
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == 'GET':
        cursor.execute("SELECT * FROM Profiles WHERE user_id = ?", (user_id,))
        profile = cursor.fetchone()
        if profile:
            return jsonify(dict(profile))
        else:
            return jsonify({'error': 'Profile not found'}), 404

    data = request.json

    if request.method == 'POST':
        name = data.get('name')
        bio = data.get('bio')
        if not name:
            return jsonify({'error': 'Name is required'}), 400

        cursor.execute("INSERT INTO Profiles (user_id, name, bio) VALUES (?, ?, ?)", (user_id, name, bio))
        conn.commit()
        return jsonify({'message': 'Profile created successfully'}), 201

    elif request.method == 'PUT':
        name = data.get('name')
        bio = data.get('bio')

        cursor.execute("UPDATE Profiles SET name = ?, bio = ? WHERE user_id = ?", (name, bio, user_id))
        conn.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200

    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM Profiles WHERE user_id = ?", (user_id,))
        conn.commit()
        return jsonify({'message': 'Profile deleted successfully'}), 200

# Initialize database before starting the server
if __name__ == '__main__':
    init_db()
    app.run(port=5000, debug=True)
    # app.run(debug=True)

"""Main flask application."""

import sqlite3
from flask import Flask, request, jsonify
from db import init_db
# from firewall import RequestLoggerMiddleware

# Create and configure Flask app
app = Flask(__name__)

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
    print("i am here")
    if request.method == 'GET':
        print("inside get method")
        cursor.execute("SELECT * FROM Profile WHERE id = ?", (user_id,))
        profile = cursor.fetchone()
        if profile:
            profile_dict = {
                'id': profile[0],
                'user_id': profile[1],
                'name': profile[2],
                'phone_number': profile[3],
                'date_of_birth': profile[4],
                'address': profile[5],
                'created_at': profile[6],
                'updated_at': profile[7]
            }
            return jsonify(profile_dict)
        else:
            return jsonify({'error': 'Profile not found'}), 404
   
    elif request.method == 'DELETE':
        cursor.execute("DELETE FROM Profile WHERE user_id = ?", (user_id,))
        conn.commit()
        return jsonify({'message': 'Profile deleted successfully'}), 200
    
    data = request.json

    if request.method == 'POST':
        name = data.get('name')
        phone_number = data.get('phone_number')
        date_of_birth = data.get('date_of_birth')
        address = data.get('address')
        
        if not name:
            return jsonify({'error': 'Name is required'}), 400

        cursor.execute(
            """
            INSERT INTO Profile (user_id, name, phone_number, date_of_birth, address)
            VALUES (?, ?, ?, ?, ?)
            """,
            (user_id, name, phone_number, date_of_birth, address)
        )
        conn.commit()
        return jsonify({'message': 'Profile created successfully'}), 201

    elif request.method == 'PUT':
        name = data.get('name')
        phone_number = data.get('phone_number')
        date_of_birth = data.get('date_of_birth')
        address = data.get('address')

        cursor.execute(
            """
            UPDATE Profile
            SET name = ?, phone_number = ?, date_of_birth = ?, address = ?, updated_at = CURRENT_TIMESTAMP
            WHERE user_id = ?
            """,
            (name, phone_number, date_of_birth, address, user_id)
        )
        conn.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200

# Initialize database before starting the server
if __name__ == '__main__':
    init_db()
    app.run(port=8000, debug=True)
    # app.run(debug=True)

from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Post, Profile, RequestLog
from flask_migrate import Migrate

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

# Log requests and responses
def log_request(user_id, request_url, request_payload, request_type, request_ip, response_status, response_object):
    conn = db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO RequestLogs 
        (user_id, request_url, request_payload, request_type, request_ip, response_status, response_object)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (user_id, request_url, str(request_payload), request_type, request_ip, response_status, str(response_object)))
    conn.commit()
    conn.close()

# Routes

# Register a new user
@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({"id": new_user.id, "email": new_user.email})

@app.route("/current_user")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    return jsonify({"id": user.id, "email": user.email})

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    client_ip = request.remote_addr

    user = User.query.filter_by(email=email).first()
    
    # Log the request
    log_request(None, request.path, data, 'POST', client_ip, 400, response)
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    if user.is_admin:
        return jsonify({"id": user.id, "email": user.email, "is_admin": True})
    
    return jsonify({"id": user.id, "email": user.email})


@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

# Fetch all users
@app.route("/users", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify(
        {
            "users": [
                {
                    "id": user.id,
                    "email": user.email,
                    "created_at": user.created_at,
                    "updated_at": user.updated_at,
                    "is_admin": user.is_admin
                }
                for user in users
            ]
        }
    )


# Fetch posts of a specific user
@app.route("/users/<int:user_id>/posts", methods=["GET"])
def get_user_posts(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    posts = Post.query.filter_by(user_id=user_id).all()
    return jsonify(
        {
            "posts": [
                {
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "created_at": post.created_at,
                    "updated_at": post.updated_at
                }
                for post in posts
            ]
        }
    )


# Create a post for a specific user
@app.route("/users/<int:user_id>/posts", methods=["POST"])
def create_post(user_id):
    data = request.json
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    new_post = Post(user_id=user_id, title=title, content=content)
    db.session.add(new_post)
    db.session.commit()
    return (
        jsonify({"message": "Post created successfully", "post_id": new_post.id}),
        201,
    )

# Manage request logs
@app.route("/logs", methods=["GET", "POST"])
def manage_logs():
    if request.method == "GET":
        logs = RequestLog.query.all()
        return jsonify(
            {
                "logs": [
                    {
                        "id": log.id,
                        "user_id": log.user_id,
                        "request_url": log.request_url,
                        "request_type": log.request_type,
                        "request_time": log.request_time,
                        "response_status": log.response_status,
                    }
                    for log in logs
                ]
            }
        )

    elif request.method == "POST":
        data = request.json
        user_id = data.get("user_id")
        request_url = data.get("request_url")
        request_payload = data.get("request_payload")
        request_type = data.get("request_type")
        request_ip = data.get("request_ip")
        response_status = data.get("response_status")
        response_object = data.get("response_object")

        new_log = RequestLog(
            user_id=user_id,
            request_url=request_url,
            request_payload=request_payload,
            request_type=request_type,
            request_ip=request_ip,
            response_status=response_status,
            response_object=response_object,
        )
        db.session.add(new_log)
        db.session.commit()
        return jsonify({"message": "Log entry created", "log_id": new_log.id}), 201


# Fetch logs of a specific user
@app.route("/users/<int:user_id>/logs", methods=["GET"])
def get_user_logs(user_id):
    logs = RequestLog.query.filter_by(user_id=user_id).all()
    return jsonify(
        {
            "logs": [
                {
                    "id": log.id,
                    "request_url": log.request_url,
                    "request_type": log.request_type,
                    "request_time": log.request_time,
                    "response_status": log.response_status,
                }
                for log in logs
            ]
        }
    )


# Fetch and manage profile of a specific user
@app.route("/users/<int:user_id>/profile", methods=["GET", "POST", "PUT", "DELETE"])
def manage_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "GET":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify(
            {
                "id": profile.id,
                "name": profile.name,
                "phone_number": profile.phone_number,
                "date_of_birth": profile.date_of_birth,
                "address": profile.address,
                "created_at": profile.created_at,
                "updated_at": profile.updated_at,
            }
        )

    data = request.json

    if request.method == "POST":
        name = data.get("name")
        phone_number = data.get("phone_number")
        date_of_birth = data.get("date_of_birth")
        address = data.get("address")

        if not name:
            return jsonify({"error": "Name is required"}), 400

        new_profile = Profile(
            user_id=user_id,
            name=name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            address=address,
        )
        db.session.add(new_profile)
        db.session.commit()
        return (
            jsonify(
                {
                    "message": "Profile created successfully",
                    "profile_id": new_profile.id,
                }
            ),
            201,
        )

    elif request.method == "PUT":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        profile.name = data.get("name", profile.name)
        profile.phone_number = data.get("phone_number", profile.phone_number)
        profile.date_of_birth = data.get("date_of_birth", profile.date_of_birth)
        profile.address = data.get("address", profile.address)
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200

    elif request.method == "DELETE":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        db.session.delete(profile)
        db.session.commit()
        return jsonify({"message": "Profile deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)

# Create and configure Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Apply middleware
# app.wsgi_app = RequestLoggerMiddleware(app.wsgi_app)

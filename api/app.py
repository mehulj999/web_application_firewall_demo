from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Post, Profile, RequestLog
from functools import wraps

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

# Initialize Flask extensions
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)  # Enable CORS with credentials
Session(app)
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

# Helper function for logging requests and responses
def log_request(user_id, request_url, request_payload, request_type, request_ip, response_status, response_object):
    # Add your logging logic here if necessary
    pass

def login_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return jsonify({"error": "Unauthorized"}), 401
        return func(*args, **kwargs)
    return wrapper

def admin_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Ensure the user is logged in
        user_id = session.get("user_id")
        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401

        # Ensure the user is an admin
        user = User.query.get(user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Forbidden: Admins only"}), 403

        # Proceed with the original function
        return func(*args, **kwargs)
    return wrapper

# ----------------------
# Routes Implementation
# ----------------------

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json.get("email")
    password = request.json.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id
    return jsonify({"id": new_user.id, "email": new_user.email})


@app.route("/register_admin", methods=["POST"])
def register_admin():
    if User.query.filter_by(email="admin@gmail.com").first():
        return jsonify({"error": "Admin user already exists"}), 409

    hashed_password = bcrypt.generate_password_hash("ttticc").decode("utf-8")
    admin_user = User(email="admin@gmail.com", password=hashed_password, is_admin=True)
    db.session.add(admin_user)
    db.session.commit()
    return jsonify({"message": "Admin registered"})


@app.route("/current_user", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"id": user.id, "email": user.email, "is_admin": user.is_admin})


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    session["user_id"] = user.id
    return jsonify({"id": user.id, "email": user.email, "is_admin": user.is_admin})


@app.route("/logout", methods=["POST"])
@login_required  # Protected route
def logout_user():
    print("This did not run")
    session.pop("user_id", None)
    return jsonify({"message": "Logged out successfully"})


@app.route("/users", methods=["GET"])
@login_required  # Protected route
def get_all_users():
    users = User.query.all()
    return jsonify([
        {
            "id": user.id,
            "email": user.email,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "is_admin": user.is_admin
        }
        for user in users
    ])


@app.route("/posts", methods=["GET"])
@login_required  # Protected route
def get_all_posts():
    posts = Post.query.all()
    return jsonify([
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at,
            "updated_at": post.updated_at
        }
        for post in posts
    ])

@app.route("/users/<int:user_id>/posts", methods=["GET"])
@login_required  # Protected route
def get_user_posts(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    posts = Post.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "created_at": post.created_at,
            "updated_at": post.updated_at
        }
        for post in posts
    ])


@app.route("/users/<int:user_id>/posts", methods=["POST"])
@login_required  # Protected route
def create_post(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    title = request.json.get("title")
    content = request.json.get("content")

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    new_post = Post(user_id=user_id, title=title, content=content)
    db.session.add(new_post)
    db.session.commit()
    return jsonify({"message": "Post created successfully", "post_id": new_post.id})


@app.route("/users/<int:user_id>/logs", methods=["GET"])
@login_required  # Protected route
def get_user_logs(user_id):
    logs = RequestLog.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": log.id,
            "request_url": log.request_url,
            "request_type": log.request_type,
            "request_time": log.request_time,
            "response_status": log.response_status
        }
        for log in logs
    ])


@app.route("/users/<int:user_id>/profile", methods=["GET", "POST", "PUT", "DELETE"])
@login_required  # Protected route
def manage_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == "GET":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404
        return jsonify({
            "id": profile.id,
            "name": profile.name,
            "phone_number": profile.phone_number,
            "date_of_birth": profile.date_of_birth,
            "address": profile.address,
            "created_at": profile.created_at,
            "updated_at": profile.updated_at
        })

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
            address=address
        )
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({"message": "Profile created successfully", "profile_id": new_profile.id})

    if request.method == "PUT":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        profile.name = data.get("name", profile.name)
        profile.phone_number = data.get("phone_number", profile.phone_number)
        profile.date_of_birth = data.get("date_of_birth", profile.date_of_birth)
        profile.address = data.get("address", profile.address)
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"})

    if request.method == "DELETE":
        profile = Profile.query.filter_by(user_id=user_id).first()
        if not profile:
            return jsonify({"error": "Profile not found"}), 404

        db.session.delete(profile)
        db.session.commit()
        return jsonify({"message": "Profile deleted successfully"})


# Print routes for debugging
@login_required  # Protected route
def print_routes():
    print("Defined Routes:")
    for rule in app.url_map.iter_rules():
        methods = ', '.join(rule.methods)
        print(f"{rule.endpoint}: {rule.rule} [{methods}]")


if __name__ == "__main__":
    print_routes()  # Print all defined routes
    app.run(debug=True)
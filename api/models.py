from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

# User model
class User(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(345), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    posts = db.relationship("Post", backref="author", cascade="all, delete", lazy=True)
    profile = db.relationship("Profile", backref="user", cascade="all, delete", uselist=False)

# Post model
class Post(db.Model):
    __tablename__ = "Posts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


# Profile model
class Profile(db.Model):
    __tablename__ = "Profiles"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="CASCADE"), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15))
    date_of_birth = db.Column(db.Date)
    address = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# RequestLogs model
class RequestLog(db.Model):
    __tablename__ = "RequestLogs"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id", ondelete="SET NULL"))
    request_url = db.Column(db.Text, nullable=False)
    request_body = db.Column(db.Text)
    request_type = db.Column(db.String(10), nullable=False)
    request_time = db.Column(db.DateTime, default=datetime.utcnow)
    request_ip = db.Column(db.String(45))
    response_status = db.Column(db.Integer)
    response_object = db.Column(db.Text)

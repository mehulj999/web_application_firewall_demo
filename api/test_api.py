import unittest
import json
import sqlite3
from app import app, db_connection
from db import init_db
from werkzeug.security import generate_password_hash

class AuthTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Setup database schema before running tests
        init_db()

    def setUp(self):
        # Configure app for testing
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'test_secret_key'
        self.client = app.test_client()

        # Prepare test database
        self.conn = db_connection()
        self.cursor = self.conn.cursor()

        # Clear existing test data
        self.cursor.execute("DELETE FROM Users")
        self.conn.commit()

    def tearDown(self):
        # Close database connection after each test
        self.conn.close()

    def test_register_successful(self):
        # Register a new user
        response = self.client.post('/register', json={
            'email': 'test@example.com',
            'password': 'password123'
        })

        self.assertEqual(response.status_code, 201)
        self.assertIn('User registered successfully', response.json['message'])

    def test_register_existing_email(self):
        # Insert a user to simulate existing email
        hashed_password = generate_password_hash('password123', method='sha256')
        self.cursor.execute("INSERT INTO Users (email, password) VALUES (?, ?)", ('test@example.com', hashed_password))
        self.conn.commit()

        # Attempt to register the same user
        response = self.client.post('/register', json={
            'email': 'test@example.com',
            'password': 'password123'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('Email already exists', response.json['error'])

    def test_login_successful(self):
        # Insert a user into the database
        hashed_password = generate_password_hash('password123', method='sha256')
        self.cursor.execute("INSERT INTO Users (email, password) VALUES (?, ?)", ('test@example.com', hashed_password))
        self.conn.commit()

        # Attempt to login
        response = self.client.post('/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn('Login successful', response.json['message'])
        self.assertIn('token', response.json)

    def test_login_invalid_credentials(self):
        # Insert a user into the database
        hashed_password = generate_password_hash('password123', method='sha256')
        self.cursor.execute("INSERT INTO Users (email, password) VALUES (?, ?)", ('test@example.com', hashed_password))
        self.conn.commit()

        # Attempt to login with incorrect password
        response = self.client.post('/login', json={
            'email': 'test@example.com',
            'password': 'wrongpassword'
        })

        self.assertEqual(response.status_code, 401)
        self.assertIn('Invalid credentials', response.json['error'])

    def test_register_invalid_input(self):
        # Missing password field
        response = self.client.post('/register', json={
            'email': 'test@example.com'
        })

        self.assertEqual(response.status_code, 400)
        self.assertIn('Email and password are required', response.json['error'])

if __name__ == '__main__':
    unittest.main()

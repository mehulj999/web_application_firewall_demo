import time
import sqlite3
from flask import Flask, request, jsonify
from firewall import RequestLoggerMiddleware
from db import init_db, fetch_logs

# Create and configure Flask app
app = Flask(__name__)

# Apply middleware
app.wsgi_app = RequestLoggerMiddleware(app.wsgi_app)

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Placeholder: Save user details to a database (not implemented here)
    return jsonify({'message': f'User {username} registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Placeholder: Authenticate user details (not implemented here)
    return jsonify({'message': f'User {username} logged in successfully'}), 200

@app.route('/logs', methods=['GET'])
def get_logs():
    logs = fetch_logs()
    return jsonify({'logs': logs})

# Initialize database before starting the server
if __name__ == '__main__':
    init_db()
    app.run(debug=True)




""" 
Below is a commented out template code for the routes to be defined in our project
This file will contain all the routes and the DB connection.
"""

# @app.route('/books', methods=['GET', 'POST'])  # Creating a route decorator for the '/books' URL with support for GET and POST methods.
# def books():  # Defining a function to handle requests to the '/books' endpoint.
#     conn = db_connection()  # Establishing a connection to the SQLite database.
#     cursor = conn.cursor()  # Creating a cursor object to execute SQL queries.

#     if request.method == 'GET':  # Checking if the request method is GET.
#         try:
#             cursor.execute("SELECT * FROM books")  # Executing a SQL query to select all books from the database.
#             books = [dict(id=row[0], author=row[1], title=row[2]) for row in cursor.fetchall()]  # Fetching all books from the database and converting them into a list of dictionaries.
#             return jsonify(books), 200  # Returning the list of books as JSON with a status code of 200 (OK).
#         except sqlite3.Error as e:
#             return jsonify({"error": str(e)}), 500  # Handling database errors and returning an error message with a status code of 500 (Internal Server Error).

#     elif request.method == 'POST':  # Checking if the request method is POST.
#         try:
#             new_title = request.args.get('title')  # Retrieving the title of the new book from the request arguments.
#             new_author = request.args.get('author')  # Retrieving the author of the new book from the request arguments.
#             if new_title and new_author:  # Checking if both title and author are provided.
#                 cursor.execute("INSERT INTO books (author, title) VALUES (?, ?)", (new_author, new_title))  # Executing a SQL query to insert a new book into the database.
#                 conn.commit()  # Committing the transaction to save changes.
#                 return jsonify({"message": "Book added successfully"}), 201  # Returning a success message with a status code of 201 (Created).
#             else:
#                 return jsonify({"error": "Title and author are required fields"}), 400  # Returning an error message if title or author is missing with a status code of 400 (Bad Request).
#         except sqlite3.Error as e:
#             return jsonify({"error": str(e)}), 500  # Handling database errors and returning an error message with a status code of 500 (Internal Server Error).

# @app.route('/books/<int:id>', methods=['GET', 'PUT', 'DELETE'])  # Creating a route decorator for the '/books/<id>' URL with support for GET, PUT, and DELETE methods.
# def book(id):  # Defining a function to handle requests to the '/books/<id>' endpoint with a specific book ID.
#     conn = db_connection()  # Establishing a connection to the SQLite database.
#     cursor = conn.cursor()  # Creating a cursor object to execute SQL queries.

#     if request.method == 'GET':  # Checking if the request method is GET.
#         try:
#             cursor.execute("SELECT * FROM books WHERE id=?", (id,))  # Executing a SQL query to select a book with the given ID from the database.
#             book = cursor.fetchone()  # Fetching the book record from the database.
#             if book:  # Checking if the book exists.
#                 return jsonify({"id": book[0], "author": book[1], "title": book[2]}), 200  # Returning the book details as JSON with a status code of 200 (OK).
#             else:
#                 return jsonify({"error": "Book not found"}), 404  # Returning an error message if the book is not found with a status code of 404 (Not Found).
#         except sqlite3.Error as e:
#             return jsonify({"error": str(e)}), 500  # Handling database errors and returning an error message with a status code of 500 (Internal Server Error).

#     elif request.method == 'PUT':  # Checking if the request method is PUT.
#         try:
#             update_title = request.args.get('title')  # Retrieving the updated title of the book from the request arguments.
#             update_author = request.args.get('author')  # Retrieving the updated author of the book from the request arguments.
#             if update_title and update_author:  # Checking if both updated title and author are provided.
#                 cursor.execute("UPDATE books SET title=?, author=? WHERE id=?", (update_title, update_author, id))  # Executing a SQL query to update the book in the database.
#                 conn.commit()  # Committing the transaction to save changes.
#                 return jsonify({"message": "Book updated successfully"}), 200  # Returning a success message with a status code of 200 (OK).
#             else:
#                 return jsonify({"error": "Title and author are required fields"}), 400  # Returning an error message if updated title or author is missing with a status code of 400 (Bad Request).
#         except sqlite3.Error as e:
#             return jsonify({"error": str(e)}), 500  # Handling database errors and returning an error message with a status code of 500 (Internal Server Error).

#     elif request.method == 'DELETE':  # Checking if the request method is DELETE.
#         try:
#             cursor.execute("DELETE FROM books WHERE id=?", (id,))  # Executing a SQL query to delete the book from the database.
#             conn.commit()  # Committing the transaction to save changes.
#             return jsonify({"message": "Book deleted successfully"}), 200  # Returning a success message with a status code of 200 (OK).
#         except sqlite3.Error as e:
#             return jsonify({"error": str(e)}), 500  # Handling database errors and returning an error message with a status code of 500 (Internal Server Error).

# if __name__ == '__main__':
#     app.run(debug=True)  # Running the Flask application in debug mode.
import sqlite3
from datetime import datetime

DATABASE = 'requests_log.db'

def init_db():
    """Initialize the database and create tables if not exist."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS request_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                path TEXT NOT NULL,
                method TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        ''')
        conn.commit()

def log_request(path, method):
    """Log a request to the database."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('INSERT INTO request_log (path, method, timestamp) VALUES (?, ?, ?)', 
                       (path, method, timestamp))
        conn.commit()

def fetch_logs():
    """Retrieve all logs from the database."""
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM request_log')
        return cursor.fetchall()

import sqlite3

def init_db():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # Create Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP           
    )
    """)

    # Create Profiles table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        bio TEXT,
        FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
    )
    """)

    # Create Posts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS Posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
    )
    """)

    # Create RequestLogs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS RequestLogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        request_url TEXT NOT NULL,
        request_payload TEXT,
        request_type TEXT NOT NULL,
        request_ip TEXT NOT NULL,
        response_status INTEGER NOT NULL,
        response_object TEXT,
        logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES Users (id)
    )
    """)

    conn.commit()
    conn.close()

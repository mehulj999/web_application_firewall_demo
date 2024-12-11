-- Drop existing tables if they exist
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Profile;
DROP TABLE IF EXISTS RequestLogs;

-- Create Users table
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Posts table
CREATE TABLE Posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

-- Create Profile table
CREATE TABLE Profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    phone_number TEXT,
    date_of_birth DATE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

-- Create RequestLogs table
CREATE TABLE RequestLogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    request_url TEXT NOT NULL,
    request_payload TEXT,
    request_type TEXT NOT NULL,
    request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_ip TEXT,
    response_status INTEGER,
    response_object TEXT,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE SET NULL
);

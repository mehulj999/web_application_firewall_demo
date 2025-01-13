# Web Application Firewall Demo

## Project Overview
This project demonstrates a basic Web Application Firewall (WAF) setup using a Flask-based backend and React for the frontend. The application allows users to simulate and monitor good and malicious requests via the React interface. A Python middleware-based firewall processes incoming requests, logging them and applying predefined policies to filter and handle requests appropriately.

The project features:
1. **Authentication**: Register and login functionalities for users.
2. **Profile Management**: Users can create, view, update, and delete their profiles.
3. **Posts Management**: Users can create, retrieve, and view all their posts.
4. **Request Logging**: Tracks incoming requests and stores them in a database.
5. **Admin Monitoring**: Provides an interface to review all users, their posts, and request logs.

> **Note**: This is a demo project intended for educational purposes and may not be suitable for production use.

---

## Project Details

- **Python Version**: 3.13.0
- **Node.js Version**: 18.x or later
- **Database**: SQLite
- **Group Members**: Mehul, Daniel, Bora, Isabella, Berke, Can
- **Tech Stack**:
  - **Backend**: Flask
  - **Frontend**: React
  - **Database**: SQLite

## Folder Structure

project/
├── api/                    # Flask backend
│   ├── app.py              # Main application file
│   ├── db.py               # Database initialization
│   ├── requirements.txt    # Python dependencies
│   ├── firewall.py         # Middleware for request logging
│   ├── database.db         # SQLite database (auto-created)
│   └── venv/               # Python virtual environment (not included in repo)
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # React components
│   ├── package.json        # Frontend dependencies
│   └── node_modules/       # Node.js modules (not included in repo)
└── README.md               # Project documentation

## Dependencies

### Backend (Flask API)
- `Flask`
- `flask-cors`
- `sqlite3` (built-in with Python)
- `firewall` (custom middleware)
  
Install these using `requirements.txt`.

### Frontend (React)
- `react`
- `react-router-dom`
- Other dependencies defined in `package.json`

---

## Installation

### Prerequisites
Ensure the following are installed on your system:
- **Python 3.13.0+**
- **Node.js** (18.x or later) with npm

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/web_application_firewall_demo.git
cd web_application_firewall_demo
```

### Step 2: Backend Setup

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```
2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
    ```
3. Install the required dependencies
    ```bash
    pip install -r requirements.txt
    ```


### Step 3: Frontend Setup
1. Navigate to the `parent` folder:
   ```bash
   cd ..
   ```
2. Install the dependencies:
   ```bash
   npm install --save-dev typescript @types/react @types/react-dom
   ```

### Step 4: Start the Application
1. Start Flask backend:
```bash
cd ../api
flask run
```
**OR from the / (root)**
```bash
npm run start-api
```

Backend runs at: `http://localhost:5000`.

2. Start the React frontend:
```bash
npm start
```
Frontend runs at: `http://localhost:3000`.

---

## Usage
- **Register/Login**: Create an account or log in to access features.
- **Profile Management**: Create, update, and view your profile.
- **Post Management**: Manage your posts via the React interface.
- **Request Logs**: View all requests or those associated with a specific user.

---

## Notes
- The database file `database.db` is auto-created in the `api` folder during initialization.
- Logs can be reviewed via dedicated API endpoints or the frontend interface.


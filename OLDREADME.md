# Web Application Firewall Demo

## Project Overview
This project demonstrates a basic Web Application Firewall (WAF) setup using a Flask-based backend with React for the frontend. The application enables users to simulate good and bad requests via the React interface, which then sends these requests to the server for handling. A middleware-based firewall, written in Python, processes the incoming requests to log and filter them based on defined policies.

The application’s primary features include:
1. **Monitor**: Display and track incoming requests.
2. **Filter**: Block or allow requests based on predefined criteria.
3. **Defined Policies**: Implement rules that differentiate between good and malicious requests.

The logs for all requests and responses are stored in an SQLite database, and a monitoring interface allows filtering and review of handled requests.

> **Note**: This project is intended as a classroom demonstration and may not be suitable for production use.

## Project Details
- **Python Version**: 3.13.0
- **Group Members**: Mehul, Daniel, Bora, Isabella, Berke, Can
- **Tech Stack**: Flask (backend), React (frontend), SQLite (database)

## Dependencies
- **Backend**:
  - Flask
  - SQLAlchemy

- **Frontend**:
  - React
  - Node.js & npm

## Installation Links

To set up the project environment, you can install the necessary tools by following the official setup guides below:

- **Python 3.13.0**: [Download and install Python](https://www.python.org/downloads/release/python-3130/)
- **Node.js and npm**: [Download Node.js and npm](https://nodejs.org/en/download/)
- **Flask**: [Flask Documentation](https://flask.palletsprojects.com/en/2.3.x/installation/)
- **SQLite**: [SQLite Installation Guide](https://www.sqlite.org/download.html)

## Running the Project

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/web_application_firewall_demo.git
cd web_application_firewall_demo
```

### Step 2: Install Dependencies
Use pip or pipenv to install dependencies for the backend, and npm for the frontend:

- **Backend**: Install Python dependencies from `requirements.txt`
  ```bash
  pip install -r requirements.txt
  ```
- **Frontend**: Install dependencies
  ```bash
  npm install
  ```

### Step 3: Start the Application
- **Backend**: Run the Flask server
  ```bash
  flask run
  ```
- **Frontend**: Start the React development server
  ```bash
  npm start
  ```

Access the application in your web browser at http://localhost:3000 (for the frontend) and http://localhost:5000 (for the backend).

## Usage
- **Monitor Interface**: Displays incoming requests and allows filtering based on request status (good or bad).
- **Testing Firewall**: Use the UI to send various types of requests and observe how the firewall handles them.
- **Logs**: View logs of all requests in the SQLite database, including details on whether they were blocked or allowed.

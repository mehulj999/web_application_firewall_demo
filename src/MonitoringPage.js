import React, { useState, useEffect } from 'react';
import './MonitoringPage.css';

const MonitoringPage = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/logs');
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        setLogs(data.logs);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="monitoring-page">
      <h1>WAF Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <div className="dashboard-summary">
        <p>Total Requests: {logs.length}</p>
        <p>GET Requests: {logs.filter(log => log.method === 'GET').length}</p>
        <p>POST Requests: {logs.filter(log => log.method === 'POST').length}</p>
        <p>Errors: {logs.filter(log => log.status >= 400).length}</p>
      </div>
      <table className="traffic-logs-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Client IP</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.method}</td>
              <td>{log.endpoint}</td>
              <td>{log.status}</td>
              <td>{log.client_ip}</td>
              <td>{log.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonitoringPage;

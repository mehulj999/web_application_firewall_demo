import React, { useState, useEffect } from 'react';
import './MonitoringPage.css';
import SideBar from '../SideBar/SideBar';


interface Log {
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
  client_ip: string;
  user: string;
}

const MonitoringPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/logs', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        setLogs(data.logs);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchLogs();
  }, []);
  

  return (
    <div className="monitoring-main">
      <SideBar/>
      <div className="content">
        <div className="header">
          <div className="title">WAF Dashboard</div>
          <div className="metrics">
            <div className="metric">
              Total Requests: <strong>{logs.length}</strong>
            </div>
            <div className="metric">
              GET: <strong>{logs.filter(log => log.method === 'GET').length}</strong> | POST: <strong>{logs.filter(log => log.method === 'POST').length}</strong>
            </div>
            <div className="metric">
              Errors: <strong>{logs.filter(log => log.status >= 400).length}</strong>
            </div>
            <div className="metric">
              Active IPs: <strong>{new Set(logs.map(log => log.client_ip)).size}</strong>
            </div>
          </div>
          <div className="filters">
            <select>
              <option value="today">Today</option>
              <option value="last-hour">Last Hour</option>
              <option value="last-7-days">Last 7 Days</option>
            </select>
            <select>
              <option value="all-methods">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <select>
              <option value="all-status">All Status Codes</option>
              <option value="2xx">2xx Success</option>
              <option value="4xx">4xx Client Errors</option>
              <option value="5xx">5xx Server Errors</option>
            </select>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search IPs, Endpoints, or Users..." />
            <button>Search</button>
          </div>
        </div>
        <div className="main">
          <div className="main-panel">
            <h2>Traffic Logs</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Method</th>
                  <th>Endpoint</th>
                  <th>Status</th>
                  <th>Client IP</th>
                  <th>User</th>
                  <th>Details</th>
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
                    <td>
                      <button className="details-button">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-sidebar">
            <div className="section">
              <div className="section-title">Error Alerts</div>
              {logs.filter(log => log.status >= 400).map((log, index) => (
                <div className="error-alert" key={index}>
                  <strong>Error {log.status}:</strong> {log.endpoint}
                </div>
              ))}
            </div>
            <div className="section">
              <div className="section-title">Traffic Insights</div>
              <div className="chart">
                <strong>Top Endpoints</strong>
                <br />
                <small>(Graph Placeholder)</small>
              </div>
              <div className="chart">
                <strong>Geo-Location Map</strong>
                <br />
                <small>(Map Placeholder)</small>
              </div>
              <div className="chart">
                <strong>Status Code Distribution</strong>
                <br />
                <small>(Pie Chart Placeholder)</small>
              </div>
            </div>
            <div className="section">
              <div className="section-title">Quick Links</div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <a href="#" style={{ color: '#4a90e2', textDecoration: 'none' }}>
                    View Full Logs
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#4a90e2', textDecoration: 'none' }}>
                    Analyze IP Behavior
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#4a90e2', textDecoration: 'none' }}>
                    Error Details
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;

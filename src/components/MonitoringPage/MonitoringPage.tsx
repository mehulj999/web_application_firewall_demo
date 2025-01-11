import React, { useState, useEffect } from 'react';
import './MonitoringPage.css';
import SideBar from '../SideBar/SideBar';

interface Log {
  timestamp: Date;
  method: string;
  endpoint: string;
  status: number;
  client_ip: string;
  user: string;
}

const MonitoringPage: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const [selectedLog, setSelectedLog] = useState<Log | null>(null); // State for the selected log details

  const [dateFilter, setDateFilter] = useState<string>('today');
  const [methodFilter, setMethodFilter] = useState<string>('all-methods');
  const [statusFilter, setStatusFilter] = useState<string>('all-status');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/monitoring_logs', { credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();
        const parsedLogs = data.logs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
        setLogs(parsedLogs);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchLogs();
  }, []);

  const handleDateFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(event.target.value);
  };

  const handleMethodFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethodFilter(event.target.value);
  };

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredLogs = logs.filter((log) => {
    const now = new Date();
    let isValid = true;

    if (dateFilter === 'last-hour') {
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      isValid = isValid && log.timestamp > oneHourAgo;
    } else if (dateFilter === 'last-7-days') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      isValid = isValid && log.timestamp > sevenDaysAgo;
    } else if (dateFilter === 'today') {
      isValid = isValid && log.timestamp.toDateString() === now.toDateString();
    }

    if (methodFilter !== 'all-methods') {
      isValid = isValid && log.method === methodFilter;
    }

    if (statusFilter !== 'all-status') {
      isValid = isValid && log.status.toString() === statusFilter;
    }

    if (searchQuery) {
      isValid =
        isValid &&
        (
          (log.client_ip?.toLowerCase().includes(searchQuery) || '') ||
          (log.endpoint?.toLowerCase().includes(searchQuery) || '') ||
          (String(log.user || '').toLowerCase().includes(searchQuery))
        );
    }

    return isValid;
  });

  const handleDetailsClick = (log: Log) => {
    setSelectedLog(log); // Set the selected log details
    setPopupVisible(true); // Show the popup
  };

  const closePopup = () => {
    setPopupVisible(false); // Hide the popup
    setSelectedLog(null); // Clear the selected log
  };

  return (
    <div className="monitoring-main">
      <SideBar />
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
            <select value={dateFilter} onChange={handleDateFilterChange}>
              <option value="today">Today</option>
              <option value="last-hour">Last Hour</option>
              <option value="last-7-days">Last 7 Days</option>
            </select>
            <select value={methodFilter} onChange={handleMethodFilterChange}>
              <option value="all-methods">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="all-status">All Status Codes</option>
              <option value="200">200 Success</option>
              <option value="403">403 Forbidden</option>
              <option value="429">429 Too many requests</option>
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search IPs, Endpoints, or Users..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
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
                {filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).map((log, index) => (
                  <tr
                    key={index}
                    className={log.status === 403 || log.status === 429 ? 'highlight-row' : ''}
                  >
                    <td>{log.timestamp.toLocaleString()}</td>
                    <td>{log.method}</td>
                    <td>{log.endpoint.replace('http://127.0.0.1:5000/', '')}</td>
                    <td>{log.status}</td>
                    <td>{log.client_ip}</td>
                    <td>{log.user}</td>
                    <td>
                      <button className="details-button" onClick={() => handleDetailsClick(log)}>
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dashboard-sidebar">
            <div className="section">
              <div className="section-title">Error Alerts</div>
              {logs.filter(log => log.status >= 400)
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((log, index) => (
                  <div className="error-alert" key={index}>
                    <strong>
                      {log.status === 403 || log.status === 429
                        ? `Error ${log.status}: Malicious activity detected`
                        : `Error ${log.status}`}
                    </strong>
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

      {/* Popup */}
      {popupVisible && selectedLog && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={closePopup}>
              &times;
            </button>
            <h2>Log Details</h2>
            <p><strong>Timestamp:</strong> {selectedLog.timestamp.toLocaleString()}</p>
            <p><strong>Method:</strong> {selectedLog.method}</p>
            <p><strong>Endpoint:</strong> {selectedLog.endpoint}</p>
            <p><strong>Status:</strong> {selectedLog.status}</p>
            <p><strong>Client IP:</strong> {selectedLog.client_ip}</p>
            <p><strong>User:</strong> {selectedLog.user}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoringPage;

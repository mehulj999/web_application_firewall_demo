import React from 'react';
import './MonitoringPage.css';
import SideBar from '../global/SideBar';

const MonitoringPage = () => {
  return (

    <div className='monitoring-main'>
        <SideBar className="monitoring-sidebar" />
        <div className='content'>
            <div class="header">
            <div class="title">WAF Dashboard</div>

            <div class="metrics">
                <div class="metric">Total Requests: <strong>12,345</strong></div>
                <div class="metric">GET: <strong>7,890</strong> | POST: <strong>3,200</strong></div>
                <div class="metric">Errors: <strong>123</strong></div>
                <div class="metric">Active IPs: <strong>78</strong></div>
            </div>

            <div class="filters">
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

            <div class="search-bar">
                <input type="text" placeholder="Search IPs, Endpoints, or Users..." />
                <button>Search</button>
            </div>
            </div>

            <div class="main">

                <div class="main-panel">
                    <h2>Traffic Logs</h2>
                    <table class="table">
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
                            <tr>
                                <td>2024-12-18 14:30:45</td>
                                <td>GET</td>
                                <td>/api/v1/users</td>
                                <td>200</td>
                                <td>192.168.1.1</td>
                                <td>user123</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:31:12</td>
                                <td>POST</td>
                                <td>/api/v1/orders</td>
                                <td>500</td>
                                <td>203.0.113.5</td>
                                <td>N/A</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>



                            <tr>
                                <td>2024-12-18 14:30:45</td>
                                <td>GET</td>
                                <td>/api/v1/users</td>
                                <td>200</td>
                                <td>192.168.1.1</td>
                                <td>user123</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:31:12</td>
                                <td>POST</td>
                                <td>/api/v1/orders</td>
                                <td>500</td>
                                <td>203.0.113.5</td>
                                <td>N/A</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>




                            <tr>
                                <td>2024-12-18 14:30:45</td>
                                <td>GET</td>
                                <td>/api/v1/users</td>
                                <td>200</td>
                                <td>192.168.1.1</td>
                                <td>user123</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:31:12</td>
                                <td>POST</td>
                                <td>/api/v1/orders</td>
                                <td>500</td>
                                <td>203.0.113.5</td>
                                <td>N/A</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>
                            <tr>
                                <td>2024-12-18 14:32:08</td>
                                <td>PUT</td>
                                <td>/api/v1/items</td>
                                <td>404</td>
                                <td>198.51.100.10</td>
                                <td>user789</td>
                                <td><button class="details-button">Details</button></td>
                            </tr>

                            
                        </tbody>
                    </table>
                </div>

                <div class="dashboard-sidebar">
                    <div class="section">
                        <div class="section-title">Error Alerts</div>
                        <div class="error-alert">
                            <strong>Error 500:</strong> Internal Server Error at <em>/api/v1/orders</em>
                        </div>
                        <div class="error-alert">
                            <strong>Error 404:</strong> Not Found at <em>/api/v1/items</em>
                        </div>
                        <div class="error-alert">
                            <strong>Error 403:</strong> Forbidden at <em>/api/v1/admin</em>
                        </div>
                        
                    </div>

                    <div class="section">
                        <div class="section-title">Traffic Insights</div>
                        <div class="chart">
                            <strong>Top Endpoints</strong>
                            <br/>
                            <small>(Graph Placeholder)</small>
                        </div>
                        <div class="chart">
                            <strong>Geo-Location Map</strong>
                            <br/>
                            <small>(Map Placeholder)</small>
                        </div>
                        <div class="chart">
                            <strong>Status Code Distribution</strong>
                            <br/>
                            <small>(Pie Chart Placeholder)</small>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">Quick Links</div>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li><a href="#" style={{ color: "#4a90e2", textDecoration: "none" }}>View Full Logs</a></li>
                            <li><a href="#" style={{ color: "#4a90e2", textDecoration: "none" }}>Analyze IP Behavior</a></li>
                            <li><a href="#" style={{ color: "#4a90e2", textDecoration: "none" }}>Error Details</a></li>
                        </ul>
                    </div>
                </div>
            </div>






        </div>


          
          
          
          
          
          
    </div>

  );
};

export default MonitoringPage;

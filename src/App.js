import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MonitoringPage from './components/MonitoringPage/MonitoringPage'; // New page

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Update the body class based on the current route
    if (location.pathname === '/') {
      document.body.className = 'login-register-body';
    } else if (location.pathname === '/monitoring') {
      document.body.className = 'monitoring-page-body';
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/monitoring" element={<MonitoringPage />} />
    </Routes>
  );
};

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MonitoringPage from './components/MonitoringPage/MonitoringPage'; // New page
import MainPage from './components/MainPage/MainPage'; // Import MainPage
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Update the body class based on the current route
    if (location.pathname === '/') {
      document.body.className = 'login-register-body';
    } else if (location.pathname === '/monitoring') {
      document.body.className = 'monitoring-page-body';
    }
    else if (location.pathname === '/main') {
      document.body.className = 'main-page-body';
    }

  }, [location]);

    return (
      <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route
              path="/monitoring"
              element={
                  <ProtectedRoute>
                      <MonitoringPage />
                  </ProtectedRoute>
              }
          />
          <Route
              path="/main"
              element={
                  <ProtectedRoute>
                      <MainPage />
                  </ProtectedRoute>
              }
          />       

      </Routes>
  );  
};

  const Root = () => (
  <AuthProvider>
      <Router>
          <App />
      </Router>
  </AuthProvider>
);

export default Root;
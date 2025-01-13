import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MonitoringPage from './components/MonitoringPage/MonitoringPage'; // New page
import WeakHomePage from './components/WeakHomePage/WeakHomePage'; // Import WeakHomePage
import HomePage from './components/HomePage/HomePage'; // Import HomePage
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ProfilePage from './components/ProfilePage/ProfilePage';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Update the body class based on the current route
    if (location.pathname === '/') {
      document.body.className = 'login-register-body';
    } else if (location.pathname === '/monitoring') {
      document.body.className = 'monitoring-page-body';
    }
    else if (location.pathname === '/home') {
      document.body.className = 'home-page-body';
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
              path="/home"
              element={
                  <ProtectedRoute>
                      <HomePage />
                  </ProtectedRoute>
              }
          />     
          <Route
              path="/weak_home"
              element={
                  <ProtectedRoute>
                      <WeakHomePage />
                  </ProtectedRoute>
              }
          /> 
                    <Route
              path="/profile"
              element={
                  <ProtectedRoute>
                      <ProfilePage />
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
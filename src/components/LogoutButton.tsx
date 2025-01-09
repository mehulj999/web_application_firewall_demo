import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LogoutButton: React.FC = () => {
  const { setUser } = useAuth(); // Access the setUser function from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optionally, make a backend request to destroy the session
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      console.info('Logged Out Sucessfully');
      // Clear the user context
      setUser(null);

      // Redirect to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};



export default LogoutButton;
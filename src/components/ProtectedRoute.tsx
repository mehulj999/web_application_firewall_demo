import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    console.log('ProtectedRoute');
    const { isAuthenticated } = useAuth(); // Ensure useAuth is properly typed
    console.log('isAuthenticated:', isAuthenticated);
    //return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
    return <>{children}</>
};

export default ProtectedRoute;

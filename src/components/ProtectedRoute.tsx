import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Ensure useAuth is properly typed

    return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;

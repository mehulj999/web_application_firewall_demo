import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface AdminRouteProps {
  children: React.ReactNode; // Use React.ReactNode here
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
  
    if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not logged in
    }

    if (!user.is_admin || user.is_admin === null) {
    return <Navigate to="/home" replace />; // Redirect to home if not an admin
    }

    return <>{children}</>; // Render the children if the user is an admin
};

export default AdminRoute;
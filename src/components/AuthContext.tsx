import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of the AuthContext
interface AuthContextType {
    login: () => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// Create a default context value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Use state to track authentication

    const login = () => {
        console.log('User logged in');
        setIsAuthenticated(true); // Update state
    };

    const logout = () => {
        console.log('User logged out');
        setIsAuthenticated(false); // Update state
    };

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

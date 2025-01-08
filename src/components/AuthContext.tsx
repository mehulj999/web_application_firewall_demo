import React, { createContext, useContext, ReactNode } from 'react';

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
    const login = () => {
        console.log('User logged in');
    };

    const logout = () => {
        console.log('User logged out');
    };

    const isAuthenticated = false; // Example, replace with real logic

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

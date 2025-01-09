import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User } from './types/User';

interface AuthContextType {
  user: User | null; // User object if logged in, null otherwise
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the current user
    fetch('/current_user', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: User | null) => {
        setUser(data); // Set the user if valid
        setLoading(false);
      })
      .catch(() => {
        setUser(null); // Reset user on error
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
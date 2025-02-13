// src/context/AuthContext.ts

'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { isAuthenticated, clearToken } from '../utils/auth';

// Create the AuthContext
export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

// Custom hook to access the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component to wrap the app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true); // Update state to reflect login
    };

    const logout = () => {
        clearToken(); // Clear the token from localStorage
        setIsLoggedIn(false); // Update state to reflect logout
    };

    // Re-check authentication status on component mount
    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
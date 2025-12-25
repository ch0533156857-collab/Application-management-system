//AuthContext - login, logout, token         # ניהול משתמש וטוקן

import React, { createContext, useState, useEffect, useContext } from 'react';
import type {AuthResponse, user} from '../types/User';

interface AuthContextType {
    user: user | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); 

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<user | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try{
            const rsponse = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data: AuthResponse = await rsponse.json();
            
            if (rsponse.ok) {
                setUser(data.user);
                setToken(data.token);
                setIsAuthenticated(true);

                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                await new Promise((resolve) => setTimeout(resolve, 100));

                return {success: true};
            } else {
                return {success: false};
            }
        }
        catch(error){
            return {
            success: false,
            error: 'An error occurred during login.',
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const Context = useContext(AuthContext);
    if(!Context){
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return Context;
}
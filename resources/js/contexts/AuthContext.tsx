import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('auth_token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await api.get('/user');
                    setUser(res.data);
                } catch (error) {
                    localStorage.removeItem('auth_token');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (email: string, password: string) => {
        const res = await api.post('/login', { email, password });
        const { user: loggedInUser, token: authToken } = res.data;
        localStorage.setItem('auth_token', authToken);
        setToken(authToken);
        setUser(loggedInUser);
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        const res = await api.post('/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
        const { user: registeredUser, token: authToken } = res.data;
        localStorage.setItem('auth_token', authToken);
        setToken(authToken);
        setUser(registeredUser);
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            // Ignore error on server-side logout
        } finally {
            localStorage.removeItem('auth_token');
            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

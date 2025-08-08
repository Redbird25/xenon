import React, { createContext, useContext, useState } from 'react';
import { login, register } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const loginUser = async (email, password) => {
        const { token: jwt } = await login({ email, password });
        localStorage.setItem('token', jwt);
        setToken(jwt);
    };

    const registerUser = async (email, password) => {
        await register({ email, password });
        return loginUser(email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth должен быть внутри AuthProvider');
    return ctx;
}

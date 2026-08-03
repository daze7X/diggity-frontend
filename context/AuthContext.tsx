'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, setCookie, getCookie, eraseCookie } from '../lib/auth';

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (name: string, email: string, password?: string, passwordConfirmation?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

    useEffect(() => {
        const storedToken = getCookie('token');
        const storedUser = getCookie('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Gagal login. Periksa kembali email dan password Anda.');
        }

        const tokenVal = data.token;
        const userVal = data.user;

        setToken(tokenVal);
        setUser(userVal);
        setCookie('token', tokenVal, 7);
        setCookie('user', JSON.stringify(userVal), 7);
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Gagal registrasi. Pastikan data valid.');
        }

        const tokenVal = data.token;
        const userVal = data.user;

        setToken(tokenVal);
        setUser(userVal);
        setCookie('token', tokenVal, 7);
        setCookie('user', JSON.stringify(userVal), 7);
    };

    const logout = async () => {
        const activeToken = token || getCookie('token');
        if (activeToken) {
            try {
                await fetch(`${API_URL}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${activeToken}`,
                    },
                });
            } catch (err) {
                console.warn('Backend logout request failed', err);
            }
        }

        setUser(null);
        setToken(null);
        eraseCookie('token');
        eraseCookie('user');
    };

    const updateProfile = async (name: string, email: string, password?: string, passwordConfirmation?: string) => {
        const activeToken = token || getCookie('token');
        if (!activeToken) throw new Error('Unauthenticated');

        const res = await fetch(`${API_URL}/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${activeToken}`,
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Gagal memperbarui profil.');
        }

        const updatedUser = data.user;
        setUser(updatedUser);
        setCookie('user', JSON.stringify(updatedUser), 7);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

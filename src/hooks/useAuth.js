// src/hooks/useAuth.ts
import { create } from 'zustand';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // keep if you use cookies; otherwise remove
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }
            const { access_token, refresh_token, role, } = data;
            set({
                accessToken: access_token,
                refreshToken: refresh_token,
                isAuthenticated: true,
                error: null,
            });
            // After login, fetch user profile
            await get().fetchUserData();
        }
        catch (err) {
            console.error('Login error:', err);
            set({
                loading: false,
                error: err?.message || 'Login failed',
                user: null,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
            });
            throw err;
        }
        finally {
            set({ loading: false });
        }
    },
    fetchUserData: async () => {
        const { accessToken } = get();
        if (!accessToken) {
            set({ isAuthenticated: false, user: null });
            return;
        }
        set({ loading: true, error: null });
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch user data');
            }
            const user = data;
            set({ user, isAuthenticated: true, loading: false });
        }
        catch (err) {
            console.error('fetchUserData error:', err);
            set({
                loading: false,
                error: err?.message || 'Failed to fetch user data',
                user: null,
                isAuthenticated: false,
            });
        }
    },
    logout: async () => {
        const { refreshToken } = get();
        try {
            if (refreshToken) {
                await fetch(`${API_BASE_URL}/users/logout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ refresh_token: refreshToken }),
                });
            }
        }
        catch (err) {
            console.error('Logout error:', err);
        }
        set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
        });
    },
}));
export function useAuth() {
    return useAuthStore();
}

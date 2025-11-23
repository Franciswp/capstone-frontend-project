// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return React.createElement("div", null, "Checking authentication...");
    }
    return isAuthenticated ? children : React.createElement(Navigate, { to: "/profile", replace: true });
}

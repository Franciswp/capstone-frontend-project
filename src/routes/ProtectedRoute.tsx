// src/routes/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
    children: JSX.Element;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Checking authentication...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/profile" replace />;
}
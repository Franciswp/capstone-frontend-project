// src/pages/Login.tsx
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography, Link, } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        defaultValues: { email: '', password: '' },
    });
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate('/login');
        }
        catch {
            // error already in store
        }
    };
    const isBusy = loading || isSubmitting;
    return (React.createElement(Box, { display: "flex", justifyContent: "center", mt: 6 },
        React.createElement(Paper, { sx: { p: 4, width: 420 } },
            React.createElement(Typography, { variant: "h5", mb: 2 }, "Login"),
            error && (React.createElement(Alert, { severity: "error", sx: { mb: 2 } }, error)),
            React.createElement("form", { onSubmit: handleSubmit(onSubmit), noValidate: true },
                React.createElement(Stack, { spacing: 2 },
                    React.createElement(TextField, { label: "Email", type: "email", autoComplete: "email", fullWidth: true, error: !!errors.email, helperText: errors.email?.message, ...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Enter a valid email address',
                            },
                        }) }),
                    React.createElement(TextField, { label: "Password", type: "password", autoComplete: "current-password", fullWidth: true, error: !!errors.password, helperText: errors.password?.message, ...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        }) }),
                    React.createElement(Button, { type: "submit", variant: "contained", disabled: isBusy, fullWidth: true, size: "large" }, isBusy ? (React.createElement(React.Fragment, null,
                        React.createElement(CircularProgress, { color: "inherit", size: 20, sx: { mr: 1 } }),
                        "Logging in...")) : ('Login'))),
                React.createElement(Stack, { sx: { mt: 2 } },
                    React.createElement(Typography, { variant: "body2" },
                        "Don't have an account?",
                        ' ',
                        React.createElement(Link, { component: RouterLink, to: "/bookings" },
                            React.createElement("strong", null, "Booking"))),
                    React.createElement(Typography, { variant: "body2" },
                        "Membership's account?",
                        ' ',
                        React.createElement(Link, { component: RouterLink, to: "/register" },
                            React.createElement("strong", null, "Register"))))))));
};
export default Login;

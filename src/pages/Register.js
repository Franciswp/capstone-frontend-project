// Register.tsx
import React from 'react';
import { Container, TextField, Button, Typography, Box, } from '@mui/material';
const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle registration logic here
        console.log('Form submitted');
    };
    return (React.createElement(Container, { component: "main", maxWidth: "xs" },
        React.createElement(Box, { sx: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8,
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                backgroundColor: 'white',
            } },
            React.createElement(Typography, { component: "h1", variant: "h5" }, "Register"),
            React.createElement(Box, { component: "form", onSubmit: handleSubmit, sx: { mt: 1 } },
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "firstName", label: "First Name", name: "firstName", autoComplete: "given-name", autoFocus: true }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "lastName", label: "Last Name", name: "lastName", autoComplete: "family-name" }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", type: "email" }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "new-password" }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm Password", type: "password", id: "confirmPassword", autoComplete: "new-password" }),
                React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", sx: { mt: 3, mb: 2 } }, "Register")))));
};
export default Register;

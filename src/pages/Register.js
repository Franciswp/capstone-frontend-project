import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Basic validation: Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError(null); // Reset error
        setSuccess(null); // Reset success message
        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Registration failed!");
            }
            else {
                setSuccess("Registration successful!");
                // Clear the form after successful registration
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        }
        catch (error) {
            setError("An error occurred. Please try again.");
        }
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
                error && React.createElement(Typography, { color: "error" }, error),
                success && React.createElement(Typography, { color: "green" }, success),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "firstName", label: "First Name", name: "firstName", autoComplete: "given-name", autoFocus: true, value: formData.firstName, onChange: handleChange }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "lastName", label: "Last Name", name: "lastName", autoComplete: "family-name", value: formData.lastName, onChange: handleChange }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, id: "email", label: "Email Address", name: "email", autoComplete: "email", type: "email", value: formData.email, onChange: handleChange }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, name: "password", label: "Password", type: "password", id: "password", autoComplete: "new-password", value: formData.password, onChange: handleChange }),
                React.createElement(TextField, { margin: "normal", required: true, fullWidth: true, name: "confirmPassword", label: "Confirm Password", type: "password", id: "confirmPassword", autoComplete: "new-password", value: formData.confirmPassword, onChange: handleChange }),
                React.createElement(Button, { type: "submit", fullWidth: true, variant: "contained", color: "primary", sx: { mt: 3, mb: 2 } }, "Register")))));
};
export default Register;

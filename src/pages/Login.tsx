// src/pages/Login.tsx
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      navigate('/profile');
    } catch {
      // error already in store
    }
  };

  const isBusy = loading || isSubmitting;

  return (
      <Box display="flex" justifyContent="center" mt={6}>
        <Paper sx={{ p: 4, width: 420 }}>
          <Typography variant="h5" mb={2}>
            Login
          </Typography>

          {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <TextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
              />

              <TextField
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
              />

              <Button
                  type="submit"
                  variant="contained"
                  disabled={isBusy}
                  fullWidth
                  size="large"
              >
                {isBusy ? (
                    <>
                      <CircularProgress color="inherit" size={20} sx={{ mr: 1 }} />
                      Logging in...
                    </>
                ) : (
                    'Login'
                )}
              </Button>
            </Stack>

            <Stack sx={{ mt: 2 }}>
              <Typography variant="body2">
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/bookings">
                  <strong>Booking</strong>
                </Link>
              </Typography>

              <Typography variant="body2">
                Membership&apos;s account?{' '}
                <Link component={RouterLink} to="/register">
                  <strong>Register</strong>
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Box>
  );
};

export default Login;
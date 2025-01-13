import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, Typography, Box, Grid, Alert, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: ''  });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            setMessage('Password do not match!')
            setSeverity('error')
            setOpen(true)
            setLoading(false)
            return;
        }
        try {
            const { data } = await API.post('/auth/register', formData);
            setMessage(`SignUp Successful!`)
            setSeverity('success')
            setOpen(true)
            setTimeout(() => navigate('/login'), 1000)
            // console.log('SignUp Successful', data);
        } catch (error) {
            setMessage(`Signup has been failed!`);
            setSeverity('error');
            setOpen(true);
        }
    };

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f4f6f8',
        }}>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: theme.palette.background.paper }}
            >
                <Typography variant="h4" align="center" fontWeight={700} gutterBottom sx={{ color: theme.palette.text.primary }}>
                    REGISTER
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Full Name"
                            name="name"
                            type="text"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange}
                            sx={{
                                input: { color: theme.palette.text.primary },
                                label: { color: theme.palette.text.secondary }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                            sx={{
                                input: { color: theme.palette.text.primary },
                                label: { color: theme.palette.text.secondary }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            required
                            value={formData.password}
                            onChange={handleChange}
                            inputProps={{ minLength: 2 }}
                            sx={{
                                input: { color: theme.palette.text.primary },
                                label: { color: theme.palette.text.secondary }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            fullWidth
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            inputProps={{ minLength: 2 }}
                            sx={{
                                input: { color: theme.palette.text.primary },
                                label: { color: theme.palette.text.secondary }
                            }}
                        />
                    </Grid>

                    {/* <Grid item xs={12}>
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                            required
                            sx={{
                                color: theme.palette.text.primary,
                                '& .MuiSelect-icon': { color: theme.palette.text.secondary }
                            }}
                        >
                            <MenuItem value="">Select Role</MenuItem>
                            <MenuItem value="patient">Patient</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                        </Select>
                    </Grid> */}

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            // disabled={loading}
                        >
                            Register
                        </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity={severity} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Register;
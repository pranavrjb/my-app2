import React, { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import API from '../api';

const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate()
    const {user,login}=useContext(UserContext);
  
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    if (user) {
        navigate('/');
        return null;
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const { data } = await API.post('/auth/login', formData);
            window.sessionStorage.setItem('userToken', data.token);
            login(data.token);
            setMessage(`Welcome, You are now logged in!`)
            setSeverity('success')
            setOpen(true)
            const redirectPath = '/'
            setTimeout(() => navigate(redirectPath), 1500);
        } catch(error){
            const errorMessage =
            error.response?.data?.message || 'Login failed. Please try again.';
            setMessage(errorMessage);
            setSeverity('error');
            setOpen(true);
    } finally {
      setLoading(false);
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
            flexDirection: 'column',
            alignItems: 'center',
            pt: 8,
            bgcolor: theme.palette.background.default
        }}>
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: theme.palette.background.paper }}>

                <Typography variant="h4" align="center" fontWeight={700} sx={{ color: theme.palette.text.primary }} gutterBottom>
                    LOGIN
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{ minLength: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth

                        >
                            Log in
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" align="center" sx={{
                            color: theme.palette.text.primary
                        }}>
                            Don't have an account?{' '}
                            <a href="/register" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
                                Register
                            </a>
                        </Typography>
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

export default Login;

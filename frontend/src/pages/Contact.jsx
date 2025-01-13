import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Snackbar, Alert, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import API from '../api';

const Contact = () => {
    const theme=useTheme()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await API.post('/contacts/userContacts', formData);
            console.log(data);
            setMessage('Your message has been sent successfully!');
            setSeverity('success');
            setOpen(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            setMessage('Failed to send message! Please try again.');
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
            flexDirection: 'column',
            alignItems: 'center',
            mx:'auto',
            p:6,
            bgcolor: theme.palette.background.default
        }}>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.palette.background.paper }}>
                <Typography variant="h4" align="center" fontWeight={700} sx={{ color: theme.palette.text.primary }} gutterBottom>
                    Contact Us
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                            inputProps={{ maxLength: 10, pattern: '[0-9]{10}' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>

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
            </form>
        </Box>
    );
};

export default Contact;

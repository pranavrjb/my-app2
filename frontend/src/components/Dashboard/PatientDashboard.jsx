import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import API from '../../api';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await API.get('/appointments/patient');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    const cancelAppointment = async (id) => {
        try {
            await API.delete(`/appointments/${id}`);
            setAppointments((prev) =>
                prev.filter((appointment) => appointment._id !== id)
            );
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={3}>My Appointments</Typography>
            <Grid container spacing={3}>
                {appointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Doctor: {appointment.doctorName}</Typography>
                                <Typography>Time: {appointment.time}</Typography>
                                <Typography>Status: {appointment.status}</Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => cancelAppointment(appointment._id)}
                                    sx={{ mt: 2 }}
                                >
                                    Cancel
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PatientDashboard;

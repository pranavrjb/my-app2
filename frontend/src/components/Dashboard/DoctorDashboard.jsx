import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import API from '../../api';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await API.get('/appointments/doctor');
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/appointments/${id}/status`, { status });
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment._id === id ? { ...appointment, status } : appointment
                )
            );
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={3}>Doctor Dashboard</Typography>
            <Grid container spacing={3}>
                {appointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Patient: {appointment.patientName}</Typography>
                                <Typography>Time: {appointment.time}</Typography>
                                <Typography>Status: {appointment.status}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => updateStatus(appointment._id, 'Completed')}
                                    sx={{ mt: 2 }}
                                >
                                    Mark as Completed
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DoctorDashboard;

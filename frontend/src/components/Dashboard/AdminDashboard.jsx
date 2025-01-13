import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Button,
    CircularProgress
} from '@mui/material';
import API from '../../api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchUsers();
        // fetchBookings();
    }, []);

    const fetchUsers = async () => {
        console.log(API.defaults.headers)
        try {
            const response = await API.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.log('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    // const fetchBookings = async () => {
    //     try {
    //         const response = await API.get('/admin/bookings');
    //         setBookings(response.data);
    //     } catch (error) {
    //         console.error('Error fetching bookings:', error);
    //     }
    // };

    // const handleDeleteUser = async (id) => {
    //     if (window.confirm('Are you sure you want to delete this user?')) {
    //         try {
    //             await API.delete(`/admin/users/${id}`);
    //             fetchUsers();
    //         } catch (error) {
    //             console.error('Failed to delete user:', error);
    //         }
    //     }
    // };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" textAlign={'center'} gutterBottom>
                Admin Dashboard
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" textAlign={'center'} gutterBottom>
                                Users
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow >
                                            <TableCell>Avatar</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            {/* <TableCell>Actions</TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>
                                                    <Avatar src={user.avatar} alt={user.name} />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                {/* <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDeleteUser(user._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Bookings
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Doctor</TableCell>
                                            <TableCell>Patient</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bookings.map((booking) => (
                                            <TableRow key={booking._id}>
                                                <TableCell>{booking.doctorId.name}</TableCell>
                                                <TableCell>{booking.patientId.name}</TableCell>
                                                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                                                <TableCell>{booking.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>*/}
                </Grid> 
            )}
        </Box>
    );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Avatar, CircularProgress,Select, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../api';

const ManageBookingsAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        try {
            const response = await API.get('/bookings'); // Fetch all bookings
            setBookings(response.data);
        } catch (error) {
            console.error('Error fetching all bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await API.delete(`/bookings/${id}`);
                setBookings(bookings.filter((booking) => booking._id !== id));
                setMessage('Booking deleted successfully');
            } catch (error) {
                console.error('Failed to delete booking:', error);
            }
        }
    };
 const handleStatusChange = async (id, newStatus) => {
        try {
            await API.put(`/bookings/${id}/status`, { status: newStatus });
            setBookings(
                bookings.map((booking) =>
                    booking._id === id ? { ...booking, status: newStatus } : booking
                )
            );
            setMessage('Status updated successfully');
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', p: 4 }}>
            <Typography variant="h3" textAlign="center" gutterBottom>
                Manage Bookings
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : bookings.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                 <TableCell>Avatar</TableCell>
                                <TableCell>Doctor</TableCell>
                                <TableCell>Patient</TableCell>
                                <TableCell>Symptoms</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                             {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>
                                        <Avatar src={booking.doctor.image} alt={booking.doctor.name} />
                                    </TableCell>
                                    <TableCell>{booking.doctor.name}</TableCell>
                                    <TableCell>{booking.patient.name}</TableCell>
                                    <TableCell>{booking.symptoms}</TableCell>
                                    <TableCell>{new Date(booking.time).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={booking.status}
                                            onChange={(e) =>
                                                handleStatusChange(booking._id, e.target.value)
                                            }
                                        >
                                            <MenuItem value="Pending" >Pending</MenuItem>
                                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(booking._id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No bookings found.</Typography>
            )}
        </Box>
    );
};

export default ManageBookingsAdmin;

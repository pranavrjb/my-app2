import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, CircularProgress, Snackbar, Alert, Popover, List, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 
import API from '../../api';

const ManageBookingsAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'purple'; 
            case 'Confirmed':
                return 'green'; 
            case 'Completed':
                return 'blue';
            case 'Cancelled':
                return 'red'; 
            default:
                return 'white'; 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await API.delete(`/bookings/${id}`);
                setBookings(bookings.filter((booking) => booking._id !== id));
                setMessage('Booking deleted successfully');
                setOpenSnackbar(true); 
            } catch (error) {
                console.error('Failed to delete booking:', error);
            }
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await API.put(`/bookings/${id}`, { status: newStatus });
            setBookings(
                bookings.map((booking) =>
                    booking._id === id ? { ...booking, status: newStatus } : booking
                )
            );
            setMessage('Status updated successfully');
            setOpenSnackbar(true); 
            handleClosePopover();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleClickPopover = (event, bookingId) => {
        setAnchorEl(event.currentTarget);
        setSelectedBookingId(bookingId);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSelectedBookingId(null);
    };

    const open = Boolean(anchorEl);

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
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Doctor</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Patient</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Symptoms</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Date & Time</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Status</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell>{booking.doctor.name}</TableCell>
                                    <TableCell>{booking.patient.name}</TableCell>
                                    <TableCell>{booking.symptoms}</TableCell>
                                    <TableCell>{new Date(booking.time).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={(e) => handleClickPopover(e, booking._id)}
                                            sx={{ 
                                                backgroundColor: getStatusColor(booking.status), 
                                                color: '#fff',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            {booking.status}
                                            <ArrowDropDownIcon sx={{ ml: 1 }} />
                                        </Button>
                                        <Popover
                                            open={open && selectedBookingId === booking._id}
                                            anchorEl={anchorEl}
                                            onClose={handleClosePopover}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <List>
                                                {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                                                    <ListItemButton
                                                        key={status}
                                                        onClick={() => updateStatus(booking._id, status)}
                                                        sx={{ backgroundColor: getStatusColor(status), color: '#000' }}
                                                    >
                                                        <ListItemText primary={status} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Popover>
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManageBookingsAdmin;

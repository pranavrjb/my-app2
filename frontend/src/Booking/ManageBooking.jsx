import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import API from '../api';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBooking, setNewBooking] = useState({
    doctor: '',
    patient: '',
    time: '',
    symptoms: '',
  });
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await API.get('/bookings', {
        params: { status: statusFilter },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new booking
  const handleAddBooking = async () => {
    try {
      const response = await API.post('/bookings', newBooking);
      setBookings((prev) => [...prev, response.data]);
      setDialogOpen(false);
      setNewBooking({ doctor: '', patient: '', time: '', symptoms: '' });
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  // Load bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  return (
    <Container sx={{minHeight: '100vh', py: 8}}>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Booking Management
      </Typography>

      {/* Filter */}
     <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
  <InputLabel id="status-filter-label">Status</InputLabel>
  <Select
    labelId="status-filter-label"
    id="status-filter"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    label="Status"
  >
    <MenuItem value="">All</MenuItem>
    <MenuItem value="Pending">Pending</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
    <MenuItem value="Cancelled">Cancelled</MenuItem>
  </Select>
</FormControl>

      {/* Add Booking Button */}
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
        Add Booking
      </Button>

      {/* Bookings Table */}
      {loading ? (
        <CircularProgress sx={{ mt: 2 }} />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Symptoms</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.doctor}</TableCell>
                  <TableCell>{booking.patient}</TableCell>
                  <TableCell>
                    {new Date(booking.time).toLocaleString()}
                  </TableCell>
                  <TableCell>{booking.symptoms}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Booking Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Doctor"
            fullWidth
            margin="dense"
            value={newBooking.doctor}
            onChange={(e) => setNewBooking({ ...newBooking, doctor: e.target.value })}
          />
          <TextField
            label="Patient"
            fullWidth
            margin="dense"
            value={newBooking.patient}
            onChange={(e) => setNewBooking({ ...newBooking, patient: e.target.value })}
          />
          <TextField
            label="Time"
            fullWidth
            margin="dense"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={newBooking.time}
            onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
          />
          <TextField
            label="Symptoms"
            fullWidth
            margin="dense"
            multiline
            rows={3}
            value={newBooking.symptoms}
            onChange={(e) => setNewBooking({ ...newBooking, symptoms: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddBooking} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageBooking;

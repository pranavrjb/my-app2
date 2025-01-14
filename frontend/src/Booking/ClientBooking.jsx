import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import API from '../api';

const ClientBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [stateMessage, setStateMessage] = useState({
  //   success:'',
  //   error:'',
  //   warning:''
  // })

  // setStateMessage.success = "heelo"
  // console.log(stateMessage.success)
  const [booking, setBooking] = useState({
    doctor: '',
    time: '',
    symptoms: '',
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await API.get('/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setErrorMessage('Failed to load doctors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!booking.doctor || !booking.time || !booking.symptoms) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      await API.post('/bookings', booking);
      setSuccessMessage('Appointment booked successfully!');
      setBooking({ doctor: '', time: '', symptoms: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Failed to book appointment. Please try again later.');
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Container component={'paper'} sx={{minHeight: '100vh', py: 8 }}>
      <Typography variant="h4"  gutterBottom>
        Book an Appointment
      </Typography>

      {loading && <CircularProgress sx={{ mb: 2 }} />}

      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

      <form onSubmit={handleSubmit}>
       <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <InputLabel id="doctor-label">Select Doctor</InputLabel>
          <Select
            labelId="doctor-label"
            id="doctor"
            value={booking.doctor}
            onChange={(e) => setBooking({ ...booking, doctor: e.target.value })}
            label="Select Doctor"
          >
            {doctors.map((doctor) => (
              <MenuItem key={doctor._id} value={doctor._id}>
                {doctor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Time Selection */}
        <TextField
          label="Appointment Time"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={booking.time}
          onChange={(e) => setBooking({ ...booking, time: e.target.value })}
          sx={{ mb: 2 }}
          required
        />

        {/* Symptoms Input */}
        <TextField
          label="Symptoms"
          fullWidth
          multiline
          rows={3}
          value={booking.symptoms}
          onChange={(e) => setBooking({ ...booking, symptoms: e.target.value })}
          sx={{ mb: 2 }}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Book Appointment
        </Button>
      </form>
    </Container>
  );
};

export default ClientBooking;

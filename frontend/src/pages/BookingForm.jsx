import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Alert,
  Collapse, 
  IconButton,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const { control, handleSubmit, reset } = useForm();
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await API.get('/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const onSubmit = async (data) => {
    try {
      await API.post('/bookings/book', data);
      reset();
        setAlertMessage('Appointment booked successfully!');
        setAlertSeverity('success');
        setAlertOpen(true);
        setTimeout(() => {
        setAlertOpen(false);
        navigate('/bookings');
    }, 6000);
    } catch (error) {
        setAlertMessage('Error booking appointment. Please try again.');
        setAlertSeverity('error');
        setAlertOpen(true);
        setTimeout(() => {
      setAlertOpen(false);
    }, 6000);
    }
  };

 return (
  <Container maxWidth="sm" sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column',pt: 8}}>
  
  <Collapse in={alertOpen}>
    <Alert
      severity={alertSeverity}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setAlertOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >
      {alertMessage}
    </Alert>
  </Collapse>
  <Paper elevation={3} sx={{ p: 4 }}>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography variant="h4" textAlign={'center'} gutterBottom>
    Book an Appointment
  </Typography>
      <Controller
        name="doctor"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Select Doctor"
            fullWidth
            required
          >
            {doctors.map((doc) => (
              <MenuItem key={doc._id} value={doc._id}>
                {doc.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="time"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Appointment Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
          />
        )}
      />
      <Controller
        name="symptoms"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Symptoms"
            multiline
            rows={4}
            fullWidth
            required
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Book Appointment
      </Button>
    </Box>
  </Paper>
</Container>
  );
}

export default BookingForm;

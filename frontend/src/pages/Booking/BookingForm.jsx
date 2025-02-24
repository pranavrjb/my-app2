import React, { useState, useEffect } from "react";
import dayjs from "dayjs"; // Import dayjs for date handling
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
  Paper,
  FormControl,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import API from "../../api";

const BookingForm = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await API.get("/service");
        setProviders(res.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const handleProviderChange = (e) => {
    const providerId = e.target.value;
    setSelectedProvider(providerId);
    setSelectedSlot("");
    setSelectedDate(null);

    const provider = providers.find((p) => p._id === providerId);

    if (provider && provider.availableDates) {
      console.log("Raw available dates:", provider.availableDates); // Debugging
      const formattedDates = provider.availableDates.map((date) =>dayjs(date));
      console.log("Formatted available dates:", formattedDates.map(d=>d.format("YYYY-MM-DD"))); // Debugging
      setAvailableDates(formattedDates); 
    }
    else{
      console.log("No available dates found for provider:", provider); // Debugging
      setAvailableDates([]);
    }
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setSelectedSlot(""); // Reset slot selection on date change
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !selectedProvider ||
      !selectedDate ||
      !selectedSlot ||
      !clientName ||
      !clientEmail
    ) {
      setMessage("Please fill all the required fields.");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      await API.post("/bookings/book", {
        providerId: selectedProvider,
        date: selectedDate.format("YYYY-MM-DD"),
        slot: selectedSlot,
        clientName,
        clientEmail,
        description,
      });

      setMessage("Booking successful!");
      setSeverity("success");
      setOpen(true);

      setSelectedProvider("");
      setSelectedDate(null);
      setSelectedSlot("");
      setClientName("");
      setClientEmail("");
      setDescription("");
    } catch (error) {
      setMessage("Booking failed. Please try again.");
      setSeverity("error");
      setOpen(true);
      console.error("Error submitting booking:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "2rem", maxWidth: "500px", width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" align="center" gutterBottom>
            Book a Service
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Select Service Provider"
                fullWidth
                value={selectedProvider}
                onChange={handleProviderChange}
                required
              >
                {providers.map((provider) => (
                  <MenuItem key={provider._id} value={provider._id}>
                    {provider.name} - {provider.serviceType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {selectedProvider && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      shouldDisableDate={(date) => {
                        if (availableDates.length === 0) return true; // No available dates → disable all
                        console.log("Checking date:",date.format("YYYY-MM-DD")); // Debugging
                        console.log("Available dates:",availableDates.map((d) => d.format("YYYY-MM-DD")));

                        return !availableDates.some((availableDate) => dayjs(date).isSame(availableDate, "day"));
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            )}

            {selectedDate && (
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Slot"
                  fullWidth
                  value={selectedSlot}
                  onChange={handleSlotChange}
                  required
                >
                  {providers
                    .find((provider) => provider._id === selectedProvider)
                    ?.availableSlots.map((slot, index) => (
                      <MenuItem key={index} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Your Name"
                fullWidth
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Your Email"
                fullWidth
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Book Now
              </Button>
            </Grid>
          </Grid>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity={severity} variant="filled">
              {message}
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </Box>
  );
};

export default BookingForm;

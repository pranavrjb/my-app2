import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import API from "../../api";

const BookingForm = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  // Fetch service providers when the component loads
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await API.get("/service"); // Fetch all service providers from the API
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
    setSelectedSlot(""); // Reset slot selection when provider changes
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!selectedProvider || !selectedSlot || !clientName || !clientEmail) {
      setMessage("Please fill all the required fields.");
      setSeverity("error");
      setOpen(true);
      return;
    }

    try {
      // Send booking request to backend API
      const response = await API.post("/bookings/book", {
        providerId: selectedProvider,
        slot: selectedSlot,
        clientName,
        clientEmail,
        clientPhone,
      });

      setMessage("Booking successful!");
      setSeverity("success");
      setOpen(true);

      // Reset form after submission
      setSelectedProvider("");
      setSelectedSlot("");
      setClientName("");
      setClientEmail("");
      setClientPhone("");
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
        <form onSubmit={handleSubmit} className="w-full max-w-md">
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
                label="Phone (Optional)"
                fullWidth
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
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

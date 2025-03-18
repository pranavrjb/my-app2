import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  FormControl,
  Avatar,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import API from "../../api";
import { UserContext } from "../../context/UserContext";
import dayjs from "dayjs";

const ServiceProviderForm = ({ fetchServiceProviders }) => {
  const [formState, setFormState] = useState({
    name: "",
    serviceType: "",
    location: "",
    avatar: null,
  });
  const [dates, setDates] = useState({ from: null, to: null });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const { user } = useContext(UserContext);

  const generateDateRange = (start, end) => {
    const dates = [];
    let current = start.clone();
    while (current.isBefore(end)) {
      dates.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
    return dates;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setFormState({ ...formState, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true, error: null });

    if (!dates.from || !dates.to) {
      setStatus({ ...status, error: "Please select both date ranges" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("serviceType", formState.serviceType);
      formData.append("location", formState.location);
      formData.append("avatar", formState.avatar);
      
      // Generate array of dates between from and to
      const dateArray = generateDateRange(dates.from, dates.to);
      dateArray.forEach(date => formData.append("availableSlots", date));

      const response = await API.post("/service/add", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}` 
        },
      });

      if (response.status === 200) {
        setStatus({ loading: false, success: true, error: null });
        fetchServiceProviders();
        resetForm();
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || "Failed to add service provider",
      });
    }
  };

  const resetForm = () => {
    setFormState({
      name: "",
      serviceType: "",
      location: "",
      avatar: null,
    });
    setDates({ from: null, to: null });
  };

  return (
    <Container sx={{ py: 4,minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Service Provider
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            {/* Form Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Service Type"
                name="serviceType"
                value={formState.serviceType}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formState.location}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="From"
                      value={dates.from}
                      onChange={(newValue) => setDates({ ...dates, from: newValue })}
                      minDate={dayjs()}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="To"
                      value={dates.to}
                      onChange={(newValue) => {
                        if (dates.from && newValue.isBefore(dates.from, "day")) {
                          setStatus({ ...status, error: "End date cannot be before start date" });
                          return;
                        }
                        setDates({ ...dates, to: newValue });
                      }}
                      minDate={dates.from || dayjs()}
                      disabled={!dates.from}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  src={formState.avatar ? URL.createObjectURL(formState.avatar) : undefined}
                  sx={{ width: 80, height: 80 }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                    required
                  />
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={status.loading}
                >
                  {status.loading ? "Submitting..." : "Add Service Provider"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={status.success}
        autoHideDuration={6000}
        onClose={() => setStatus({ ...status, success: false })}
      >
        <Alert severity="success">
          Service provider added successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!status.error}
        autoHideDuration={6000}
        onClose={() => setStatus({ ...status, error: null })}
      >
        <Alert severity="error">{status.error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ServiceProviderForm;
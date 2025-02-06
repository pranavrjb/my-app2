import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
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

const ServiceProviderForm = ({ fetchServiceProviders }) => {
  const [serviceProvider, setServiceProvider] = useState({
    name: "",
    serviceType: "",
    specialty: "",
    availableSlots: [],
    location: "",
    experience: "",
    avatar: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    setServiceProvider({
      ...serviceProvider,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    setServiceProvider({
      ...serviceProvider,
      avatar: e.target.files[0],
    });
  };

  const handleDateChange = (date) => {
    setServiceProvider((prev) => ({
      ...prev,
      availableSlots: [...prev.availableSlots, date.format("YYYY-MM-DD")],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", serviceProvider.name);
      formData.append("serviceType", serviceProvider.serviceType);
      formData.append("specialty", serviceProvider.specialty);
      formData.append("availableSlots", serviceProvider.availableSlots);
      formData.append("location", serviceProvider.location);
      formData.append("experience", serviceProvider.experience);
      if (serviceProvider.avatar) {
        formData.append("avatar", serviceProvider.avatar);
      }

      console.log([...formData.entries()]); // Debugging the form data

      const response = await API.post("/service/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setOpenSnackbar(true);
        fetchServiceProviders();
        setServiceProvider({
          name: "",
          serviceType: "",
          specialty: "",
          availableSlots: [],
          location: "",
          experience: "",
          avatar: null,
        });
      }
    } catch (error) {
      console.error(
        "Error adding service provider",
        error.response?.data || error
      );
    }
  };

  return (
    <Container sx={{ minHeight: "100vh", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Add Service Provider
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={serviceProvider.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="serviceType-label">Service Type</InputLabel>
                <Select
                  labelId="serviceType-label"
                  label="Service Type"
                  name="serviceType"
                  value={serviceProvider.serviceType}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Doctor">Doctor</MenuItem>
                  <MenuItem value="Hairdresser">Hairdresser</MenuItem>
                  <MenuItem value="Gym Trainer">Gym Trainer</MenuItem>
                  <MenuItem value="Consultant">Consultant</MenuItem>
                  {/* Add other service types */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Specialty"
                name="specialty"
                value={serviceProvider.specialty}
                onChange={handleChange}
                variant="outlined"
                placeholder="Optional"
              />
            </Grid>

            {/* Location and Experience */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={serviceProvider.location}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience (in years)"
                name="experience"
                value={serviceProvider.experience}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 1) {
                    handleChange(e); // Valid experience
                  }
                }}
                type="number"
                variant="outlined"
                required
                helperText="Experience must be at least 1 year."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Available Slot"
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              {serviceProvider.availableSlots.length > 0 && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Available Slots: {serviceProvider.availableSlots.join(", ")}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Avatar
                  alt="Service Provider Avatar"
                  src={
                    serviceProvider.avatar
                      ? URL.createObjectURL(serviceProvider.avatar)
                      : null
                  }
                  sx={{ width: 80, height: 80 }}
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                >
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Service Provider added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ServiceProviderForm;

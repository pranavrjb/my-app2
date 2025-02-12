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

const ServiceProviderForm = ({ fetchServiceProviders }) => {
  const [serviceProvider, setServiceProvider] = useState({
    name: "",
    serviceType: "",
    // specialty: "",
    availableSlots: [],
    location: "",
    // experience: "",
    avatar: null,
  });

  const [fromDate, setFromDate] = useState(null); // State for "From" date
  const [toDate, setToDate] = useState(null); // State for "To" date
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the selected date range to availableSlots
    const dateRange =
      fromDate && toDate
        ? `${fromDate.format("YYYY-MM-DD")} - ${toDate.format("YYYY-MM-DD")}`
        : "";

    try {
      const formData = new FormData();
      formData.append("name", serviceProvider.name);
      formData.append("serviceType", serviceProvider.serviceType);
      // formData.append("specialty", serviceProvider.specialty);
      formData.append("availableSlots", dateRange); // Add the date range as availableSlots
      formData.append("location", serviceProvider.location);
      // formData.append("experience", serviceProvider.experience);
      formData.append("avatar", serviceProvider.avatar);

      const response = await API.post("/service/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setOpenSnackbar(true);
        fetchServiceProviders();
        setServiceProvider({
          name: "",
          serviceType: "",
          // specialty: "",
          availableSlots: [],
          location: "",
          // experience: "",
          avatar: null,
        });
        setFromDate(null);
        setToDate(null);
      }
    } catch (error) {
      console.error(
        "Error adding service provider",
        error.response?.data || error
      );
    }
  };

  return (
    <Container sx={{ minHeight: "100vh", mt: 4,display:"flex",justifyContent:"center",alignItems:"center" }}>
      <Paper elevation={3} sx={{ p: 4,maxWidth: 600, margin: "auto",width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Add Service Provider
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  fullWidth
                  label="Service Type"
                  name="serviceType"
                  value={serviceProvider.serviceType}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="From"
                        value={fromDate}
                        onChange={(newValue) => setFromDate(newValue)}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="To"
                        value={toDate}
                        onChange={(newValue) => setToDate(newValue)}
                        renderInput={(params) => (
                          <TextField fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>

              {fromDate && toDate && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Available Slots: {fromDate.format("MM/DD/YYYY")} -{" "}
                  {toDate.format("MM/DD/YYYY")}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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

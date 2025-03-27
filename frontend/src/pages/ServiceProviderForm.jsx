import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
  Chip,
  useTheme,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ServiceProviderForm = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [services, setServices] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    // Provider Information
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    businessHours: "",
    description: "",

    // Service Information
    serviceName: "",
    category: "",
    serviceDescription: "",
    duration: "",
    price: "",
    image: "",
  });

  const categories = [
    "Primary Care",
    "Specialist Care",
    "Dental Care",
    "Mental Health",
    "Rehabilitation",
    "Laboratory Services",
    "Imaging Services",
    "Emergency Care",
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData((prev) => ({
      ...prev,
      serviceName: "",
      category: "",
      serviceDescription: "",
      duration: "",
      price: "",
      image: "",
    }));
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleProviderSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object to handle file upload
      const providerData = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "image") {
          providerData.append(key, formData[key]);
        }
      });

      // Make API call to your backend
      const response = await fetch("/api/providers/register", {
        method: "POST",
        body: providerData,
      });

      if (!response.ok) {
        throw new Error("Failed to register provider");
      }

      const result = await response.json();

      setSnackbar({
        open: true,
        message: "Provider registration successful!",
        severity: "success",
      });

      // Clear form or redirect
      // You can add navigation here if needed
      // navigate('/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
      setSnackbar({
        open: true,
        message: "Failed to register provider. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object for service submission
      const serviceData = new FormData();

      // Add all service form fields
      serviceData.append("name", formData.serviceName);
      serviceData.append("category", formData.category);
      serviceData.append("description", formData.serviceDescription);
      serviceData.append("duration", formData.duration);
      serviceData.append("price", formData.price);

      // Add the image file
      if (selectedFile) {
        serviceData.append("image", selectedFile);
      }

      // Make API call to your backend
      const response = await fetch("/api/services/create", {
        method: "POST",
        body: serviceData,
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const result = await response.json();

      // Add the new service to the local state
      const newService = {
        id: services.length + 1,
        name: formData.serviceName,
        category: formData.category,
        description: formData.serviceDescription,
        duration: formData.duration,
        price: parseFloat(formData.price),
        image: URL.createObjectURL(selectedFile),
      };
      setServices((prev) => [...prev, newService]);

      setSnackbar({
        open: true,
        message: "Service added successfully!",
        severity: "success",
      });

      handleCloseDialog();
    } catch (error) {
      console.error("Service creation error:", error);
      setSnackbar({
        open: true,
        message: "Failed to add service. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 4,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <BusinessIcon sx={{ fontSize: 30, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                mb: 1,
              }}
            >
              Service Provider Registration
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                textAlign: "center",
                maxWidth: "600px",
                mb: 4,
              }}
            >
              Register and manage your services.
            </Typography>
          </Box>

          {/* Provider Information Form */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              mb: 6,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                mb: 4,
              }}
            >
              Provider Information
            </Typography>
            <Box component="form" onSubmit={handleProviderSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Owner Name"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Hours"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleInputChange}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TimeIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DescriptionIcon
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleProviderSubmit}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    minWidth: 200,
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register Provider"
                  )}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Services Section */}
          <Paper
            elevation={2}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              background: theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                }}
              >
                Services
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Add Service
              </Button>
            </Box>

            <Grid container spacing={3}>
              {services.map((service) => (
                <Grid item xs={12} md={4} key={service.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      background:
                        theme.palette.mode === "dark" ? "#2d2d2d" : "#ffffff",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 2px 8px rgba(0,0,0,0.3)"
                          : "0 2px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={service.image}
                      alt={service.name}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={service.category}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "white",
                          }}
                        />
                        <Box>
                          <IconButton
                            size="small"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(service.id)}
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color:
                            theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                          mb: 1,
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            theme.palette.mode === "dark"
                              ? "#b3b3b3"
                              : "#4a4a4a",
                          mb: 2,
                        }}
                      >
                        {service.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: "auto",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <TimeIcon
                            sx={{
                              fontSize: 16,
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          >
                            {service.duration}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MoneyIcon
                            sx={{
                              fontSize: 16,
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                theme.palette.mode === "dark"
                                  ? "#b3b3b3"
                                  : "#666666",
                            }}
                          >
                            ${service.price}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Add Service Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add New Service</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                onSubmit={handleServiceSubmit}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Service Name"
                      name="serviceName"
                      value={formData.serviceName}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#b3b3b3"
                                    : "#666666",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        label="Category"
                        startAdornment={
                          <InputAdornment position="start">
                            <CategoryIcon
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#b3b3b3"
                                    : "#666666",
                              }}
                            />
                          </InputAdornment>
                        }
                      >
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="serviceDescription"
                      value={formData.serviceDescription}
                      onChange={handleInputChange}
                      multiline
                      rows={3}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#b3b3b3"
                                    : "#666666",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TimeIcon
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#b3b3b3"
                                    : "#666666",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MoneyIcon
                              sx={{
                                color:
                                  theme.palette.mode === "dark"
                                    ? "#b3b3b3"
                                    : "#666666",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 200,
                          border: `2px dashed ${
                            theme.palette.mode === "dark"
                              ? "#666666"
                              : "#cccccc"
                          }`,
                          borderRadius: 2,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        {imagePreview ? (
                          <Box
                            component="img"
                            src={imagePreview}
                            alt="Preview"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                opacity: 0,
                                cursor: "pointer",
                              }}
                            />
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <AddIcon
                                sx={{
                                  fontSize: 40,
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#666666"
                                      : "#cccccc",
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#666666"
                                      : "#cccccc",
                                }}
                              >
                                Click to upload image
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#666666"
                                      : "#cccccc",
                                }}
                              >
                                or drag and drop
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                      {selectedFile && (
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#b3b3b3"
                                : "#666666",
                          }}
                        >
                          {selectedFile.name}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleServiceSubmit}
                disabled={isSubmitting || !selectedFile}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  minWidth: 120,
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add Service"
                )}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServiceProviderForm;

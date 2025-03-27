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
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import API from "../../api";
import { motion } from "framer-motion";

const BookingForm = () => {
  const theme = useTheme();
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await API.get("/service");
        setProviders(res.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
        setMessage("Failed to load service providers. Please try again.");
        setSeverity("error");
        setOpen(true);
      } finally {
        setLoading(false);
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
      const formattedDates = provider.availableDates.map((date) => dayjs(date));
      setAvailableDates(formattedDates);
    } else {
      setAvailableDates([]);
    }
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setSelectedSlot("");
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
      setLoading(true);
      await API.post("/bookings/book", {
        providerId: selectedProvider,
        date: selectedDate.format("YYYY-MM-DD"),
        slot: selectedSlot,
        clientName,
        clientEmail,
        description,
      });

      setMessage(
        "Booking successful! We'll send you a confirmation email shortly."
      );
      setSeverity("success");
      setOpen(true);

      // Reset form
      setSelectedProvider("");
      setSelectedDate(null);
      setSelectedSlot("");
      setClientName("");
      setClientEmail("");
      setDescription("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Booking failed. Please try again."
      );
      setSeverity("error");
      setOpen(true);
      console.error("Error submitting booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 4, md: 0 },
        pb: 4,
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 2,
            width: { xs: "90%", sm: "600px" },
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
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <BusinessIcon sx={{ fontSize: 25, color: "white" }} />
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
              Book a Service
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "#b3b3b3" : "#4a4a4a",
                mb: 3,
                textAlign: "center",
              }}
            >
              Schedule your appointment with our service providers
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Select Service Provider"
                  fullWidth
                  value={selectedProvider}
                  onChange={handleProviderChange}
                  required
                  disabled={loading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
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
                          if (availableDates.length === 0) return true;
                          return !availableDates.some((availableDate) =>
                            dayjs(date).isSame(availableDate, "day")
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#3d3d3d"
                                    : "#f8f9fa",
                                "& fieldset": {
                                  borderColor:
                                    theme.palette.mode === "dark"
                                      ? "#4d4d4d"
                                      : "#e0e0e0",
                                },
                                "&:hover fieldset": {
                                  borderColor: theme.palette.primary.main,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: theme.palette.primary.main,
                                },
                                "& input": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "white"
                                      : "#1a1a1a",
                                },
                                "& label": {
                                  color:
                                    theme.palette.mode === "dark"
                                      ? "#b3b3b3"
                                      : "#666666",
                                },
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarIcon
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
                    label="Select Time Slot"
                    fullWidth
                    value={selectedSlot}
                    onChange={handleSlotChange}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                        "& fieldset": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? "#4d4d4d"
                              : "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "& input": {
                          color:
                            theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                        },
                        "& label": {
                          color:
                            theme.palette.mode === "dark"
                              ? "#b3b3b3"
                              : "#666666",
                        },
                      },
                    }}
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
                  placeholder="Enter your full name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
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

              <Grid item xs={12}>
                <TextField
                  label="Your Email"
                  fullWidth
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="Enter your email address"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& input": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
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

              <Grid item xs={12}>
                <TextField
                  label="Additional Details (Optional)"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Enter any additional information or special requirements"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#3d3d3d" : "#f8f9fa",
                      "& fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#4d4d4d" : "#e0e0e0",
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& textarea": {
                        color:
                          theme.palette.mode === "dark" ? "white" : "#1a1a1a",
                      },
                      "& label": {
                        color:
                          theme.palette.mode === "dark" ? "#b3b3b3" : "#666666",
                      },
                    },
                  }}
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

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 14px rgba(0,0,0,0.3)"
                        : "0 4px 14px rgba(0,0,0,0.1)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 6px 20px rgba(0,0,0,0.4)"
                          : "0 6px 20px rgba(0,0,0,0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm;

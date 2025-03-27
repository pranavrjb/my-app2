import React from "react";
import {
  Typography,
  useTheme,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
} from "@mui/material";
import FAQsPage from "./FAQsPage";
import { motion } from "framer-motion";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Link } from "react-router-dom";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const services = [
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      title: "Medical Services",
      description: "Find qualified doctors and medical specialists",
      color: "#2196f3",
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
      title: "Fitness & Wellness",
      description: "Connect with personal trainers and wellness experts",
      color: "#4caf50",
    },
    {
      icon: <ContentCutIcon sx={{ fontSize: 40 }} />,
      title: "Beauty Services",
      description: "Book appointments with beauty professionals",
      color: "#f44336",
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: "Consulting",
      description: "Get expert advice from various consultants",
      color: "#9c27b0",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 8, md: 10 },
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 8,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)"
              : "linear-gradient(135deg, #E3F2FD 0%, #92c9f7 100%)",
          color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
          py: { xs: 4, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Container maxWidth="lg">
            <Typography
              variant={isMobile ? "h3" : "h2"}
              fontWeight="bold"
              sx={{
                mb: 2,
                textShadow:
                  theme.palette.mode === "dark"
                    ? "2px 2px 4px rgba(0,0,0,0.2)"
                    : "none",
                color: theme.palette.mode === "dark" ? "white" : "#1a1a1a",
              }}
            >
              Find & Book Service Providers Easily
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: theme.palette.mode === "dark" ? 0.9 : 0.8,
                maxWidth: "800px",
                mx: "auto",
                color: theme.palette.mode === "dark" ? "white" : "#4a4a4a",
              }}
            >
              Connect with trusted professionals for all your service needs
            </Typography>
            <Button
              component={Link}
              to="/bookings"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                textTransform: "none",
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
              Get Started
            </Button>
          </Container>
        </motion.div>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      backgroundColor: `${service.color}15`,
                    }}
                  >
                    <Box sx={{ color: service.color }}>{service.icon}</Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {service.description}
                    </Typography>
                    <Button
                      component={Link}
                      to="/bookings"
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: "20px",
                        textTransform: "none",
                        borderColor: service.color,
                        color: service.color,
                        "&:hover": {
                          borderColor: service.color,
                          backgroundColor: `${service.color}15`,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* FAQs Section */}
      {/* <Container maxWidth="lg" sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Frequently Asked Questions
          </Typography> */}
      <FAQsPage />
      {/* </motion.div>
      </Container> */}

      {/* CTA Section */}
      {/* <Box
        sx={{
          width: "100%",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers who found their perfect
              service provider
            </Typography>
            <Button
              component={Link}
              to="/bookings"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Booking Now
            </Button>
          </motion.div>
        </Container>
      </Box> */}
    </Box>
  );
};

export default HomePage;

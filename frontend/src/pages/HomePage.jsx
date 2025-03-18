import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FAQsPage from "./FAQsPage";
import SearchServiceProviders from "./Services/SearchServiceProviders";
import { motion } from "framer-motion";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 4,
          background: "linear-gradient(to right, #0F2027, #203A43, #2C5364)",
          color: "white",
          py: 6,
          borderRadius: "10px",
        }}
      >
        <motion.div
          initial={{ opacity: 1, y: 50 }}
          animate={{ opacity: 1, y: 2 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" fontWeight="bold">
            Find & Book Service Providers Easily
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Doctors, Consultants, Gym Trainers, Hairdressers & More
          </Typography>
          {/* <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Get Started
          </Button> */}
        </motion.div>
      </Box>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SearchServiceProviders />
      </motion.div>

      {/*added FAQsPage component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FAQsPage />
      </motion.div>
    </Box>
  );
};

export default HomePage;

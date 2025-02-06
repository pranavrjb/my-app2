import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FAQsPage from "./FAQsPage";
import SearchServiceProviders from "./Services/SearchServiceProviders";

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
      <Typography variant="h2" color="primary" className="mb-4 pt-2">
        MedPulse
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ color: theme.palette.text.primary, fontWeight: "bold", mt: 2 }}
      >
        Book appointments with trusted doctors in your area.
      </Typography>
      <SearchServiceProviders />
      {/*added FAQsPage component */}
      <FAQsPage />
    </Box>
  );
};

export default HomePage;

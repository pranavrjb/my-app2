import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import API from "../../api";

const SearchServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await API.get("/service");
        setServiceProviders(response.data);
        setFilteredServiceProviders(response.data);
      } catch (error) {
        console.log("Error fetching service providers:", error);
      }
    };
    fetchServiceProviders();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = serviceProviders.filter(
      (provider) =>
        provider.name.toLowerCase().includes(value) ||
        provider.serviceType.toLowerCase().includes(value) ||
        provider.location.toLowerCase().includes(value)
    );
    setFilteredServiceProviders(filtered);
  };

  function extractPath(path) {
    if (path.includes("\\")) {
      return path.substring(26);
    }
    return path;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{ display: "flex", justifyContent: "center", mb: 4, width: "90vw" }}
      >
        <TextField
          label="Search by name, service type, or location"
          variant="standard"
          style={{ width: "100%", maxWidth: "700px" }}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon style={{ cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {filteredServiceProviders.map((provider) => (
          <Grid item xs={12} sm={6} md={4} key={provider.id}>
            <Link
              to={`/bookings`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "370px",
                  height: "250px",
                  textAlign: "center",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                  },
                  mx: "auto",
                  borderRadius: "10px",
                }}
              >
                <Avatar
                  src={`/images/${extractPath(provider.avatar)}`}
                  alt={provider.name}
                  // position="relative"
                  sx={{ width: 110, height: 110}}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "backendimages";
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {provider.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Service: {provider.serviceType}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Location: {provider.location}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {filteredServiceProviders.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No service providers found matching your search.
        </Typography>
      )}

      {serviceProviders.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No service providers available at the moment.
        </Typography>
      )}
    </Box>
  );
};

export default SearchServiceProviders;

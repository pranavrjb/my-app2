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
import API from "../../api";

const SearchServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);
  const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);

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

  const handleCardClick = (provider) => {
    setSelectedServiceProvider(provider);
    setOpen(true);
  };

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
      <Grid container spacing={3}>
        {filteredServiceProviders.map((provider) => (
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            key={provider.id}
            onClick={() => handleCardClick(provider)}
            style={{ cursor: "pointer" }}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              <Avatar
                src={`/images/${provider.avatar}`}
                  alt={provider.name}
                  sx={{ width: 115, height: 115, mr: 4 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/fallback-image.png";
                  }}
              />

              <CardContent>
                <Typography variant="h6" fontWeight={"bold"}>
                  {provider.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Service: {provider.serviceType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {provider.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience: {provider.experience} years
                </Typography>
              </CardContent>
            </Card>
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

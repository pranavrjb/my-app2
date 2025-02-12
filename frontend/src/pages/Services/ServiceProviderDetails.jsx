import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import API from "../../api"; 

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const [serviceProvider, setServiceProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const response = await API.get(`/service`); 
        setServiceProvider(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service provider details", error);
        setLoading(false);
      }
    };
    fetchServiceProvider();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!serviceProvider) {
    return <Typography variant="h6">Service provider not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        {serviceProvider.name}
      </Typography>
      <Typography variant="h6">
        Service: {serviceProvider.serviceType}
      </Typography>
      <Typography>Specialty: {serviceProvider.specialty}</Typography>
      <Typography>Location: {serviceProvider.location}</Typography>
      {/* <Typography>Experience: {serviceProvider.experience} years</Typography> */}
      <Typography>Available Slots: {serviceProvider.availableSlots}</Typography>
    </Container>
  );
};

export default ServiceProviderDetails;

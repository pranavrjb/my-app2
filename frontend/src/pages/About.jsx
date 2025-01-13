import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Box sx={{ my: 4,minHeight: '100vh', }}>
        <Typography variant="h2" component="h1" textAlign={'center'} gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our booking web page where you can easily book appointments with doctors according to your needs. Our platform is designed to provide a seamless and efficient experience for users to find and schedule appointments with healthcare professionals.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to make healthcare accessible and convenient for everyone. We understand the importance of timely medical care and strive to connect patients with the right doctors quickly and easily.
        </Typography>
        <Typography variant="body1" paragraph>
          With our user-friendly interface, you can search for doctors based on specialty, location, and availability. You can also read reviews from other patients to help you make informed decisions about your healthcare.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing our platform for your healthcare needs. We are committed to providing you with the best possible service and support.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
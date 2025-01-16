import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Box sx={{ my: 4, minHeight: '100vh' }}>
        <Typography variant="h2" component="h1" textAlign={'center'} gutterBottom>
          About Us
        </Typography>
        
        {/* Introduction Section */}
        <Typography variant="body1" paragraph>
          Welcome to our booking platform, your reliable resource for finding and booking doctor appointments quickly and easily. We aim to bridge the gap between patients and healthcare professionals, making healthcare access more streamlined and hassle-free.
        </Typography>

        <Typography variant="body1" paragraph>
          Our platform allows you to book appointments based on your specific needs, whether you're looking for a specialist, a general practitioner, or even a doctor in your area. With just a few clicks, you can schedule a consultation with the right doctor for you.
        </Typography>

        {/* Mission Section */}
        <Typography variant="h4" component="h2" sx={{ my: 2 }} textAlign={'center'} fontWeight={'bold'}>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to empower patients by providing an easy and efficient way to connect with healthcare providers. We understand that medical concerns can be stressful, and we aim to ease that burden by simplifying the process of finding and booking appointments. Whether it’s for a routine check-up or an emergency consultation, our platform offers accessibility, convenience, and reliability.
        </Typography>

        {/* Features Section */}
        <Typography variant="h4" component="h2" sx={{ my: 2 }} textAlign={'center'} fontWeight={'bold'}>
          Key Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={'bold'}>Search by Specialization</Typography>
              <Typography variant="body1">
                Quickly find doctors who specialize in the area you need, from dermatologists to cardiologists and more. Our search filters help you narrow down the best professionals based on your health concerns.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={'bold'}>Instant Booking</Typography>
              <Typography variant="body1">
                Book your appointment in real-time by selecting an available slot. With just a few clicks, you can schedule a visit that fits your busy schedule without the need for long phone calls or waiting.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={'bold'}>Patient Reviews</Typography>
              <Typography variant="body1">
                Make informed decisions by reading reviews and ratings left by other patients. These reviews offer valuable insights into the doctor's approach, demeanor, and expertise.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ padding: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={'bold'}>Easy Access to Healthcare Professionals</Typography>
              <Typography variant="body1">
                No more waiting in long queues or struggling to find the right doctor. Our platform gives you the ability to connect with healthcare professionals from the comfort of your home or office.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Vision Section */}
        <Typography variant="h4" component="h2" sx={{ my: 2 }} textAlign={'center'} fontWeight={'bold'}>
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          We envision a world where healthcare is seamless, accessible, and available to everyone. With constant technological advancements and an ever-growing list of specialists, we aspire to become the leading platform for booking healthcare appointments globally, providing our users with a comprehensive and transparent healthcare experience.
        </Typography>

        {/* Call to Action Section */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" paragraph>
            Ready to find your perfect doctor? Start booking now and take the first step towards better healthcare.
          </Typography>
          <Button variant="contained" color="primary" size="large" href="/bookings">
            Start Booking
          </Button>
        </Box>

        {/* Thank You Section */}
        <Typography variant="body1" paragraph sx={{ mt: 4 }}>
          Thank you for choosing our platform for your healthcare needs. Our team is dedicated to ensuring that you receive the best service and support every step of the way. If you have any questions or need assistance, feel free to reach out to us.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

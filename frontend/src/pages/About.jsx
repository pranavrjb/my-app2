import React from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Box sx={{ my: 4, minHeight: "100vh" }}>
        <Typography
          variant="h2"
          component="h1"
          textAlign={"center"}
          sx={{ fontWeight: "bold" }}
          gutterBottom
        >
          About Us
        </Typography>

        {/* Introduction Section */}
        <Typography variant="body1" paragraph>
          Welcome to our all-in-one booking platform, your go-to resource for
          finding and scheduling appointments with the professionals you need.
          Whether you're looking for a doctor, consultant, gym trainer,
          hairdresser, personal coach, or any other service provider, we help
          connect you with the right professionals quickly and effortlessly.
        </Typography>

        <Typography variant="body1" paragraph>
          Our platform makes it easy to search, compare, and book
          appointments based on your specific needs. With just a few clicks, you
          can schedule a consultation with the perfect professional, ensuring
          convenience and efficiency at your fingertips.
        </Typography>

        {/* Mission Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ my: 2 }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to empower people by providing an easy and efficient
          way to connect with service providers in various industries. We
          understand that finding the right professional for your needs can be
          time-consuming, so we aim to simplify the process and give you access
          to a wide range of skilled professionals in one place.
        </Typography>

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ my: 2 }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Key Features
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Find the Right Professional
              </Typography>
              <Typography variant="body1">
                Whether it's a doctor for your health, a consultant for your
                business, a trainer for your fitness, or a stylist for your
                grooming needs, we help you find the best professionals in
                your area with ease.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Instant Booking
              </Typography>
              <Typography variant="body1">
                Book your appointment instantly by selecting an available
                time slot. No more waiting in line or making endless phone
                calls—just pick a time and confirm your appointment within
                seconds.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Verified Reviews
              </Typography>
              <Typography variant="body1">
                Make informed decisions with genuine reviews and ratings
                from other users. See what people have to say about
                professionals before making your booking.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 2,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Convenient and Reliable
              </Typography>
              <Typography variant="body1">
                Say goodbye to long waiting times and unreliable contacts. Our
                platform gives you instant access to skilled professionals,
                ensuring a smooth and hassle-free booking experience.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Vision Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{ my: 2 }}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Our Vision
        </Typography>
        <Typography variant="body1" paragraph>
          We envision a world where booking services is seamless and
          accessible to everyone. By constantly expanding our network of
          professionals and enhancing our technology, we aim to become the
          leading platform for **connecting individuals with the experts they
          need—anytime, anywhere**.
        </Typography>

        {/* Call to Action Section */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h5" paragraph>
            Ready to book your next appointment? Find the perfect professional
            today!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/bookings"
          >
            Start Booking
          </Button>
        </Box>

        {/* Thank You Section */}
        <Typography variant="body1" paragraph sx={{ mt: 4 }}>
          Thank you for choosing our platform to connect with professionals.
          Our team is committed to providing the best experience for you. If you
          have any questions or need assistance, feel free to reach out.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;

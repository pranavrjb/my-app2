import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter'; // Corrected to TwitterIcon
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontWeight={'bold'} gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We help patients connect with the best doctors around the country. 
              Book appointments easily and manage your health better.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontWeight={'bold'} gutterBottom>
              Support
            </Typography>
            <Link href="/" variant='body2' color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/contact" variant='body2' color="inherit" underline="hover" display="block">
              Contact Us
            </Link>
            <Link href="/about" variant='body2' color="inherit" underline="hover" display="block">
              About
            </Link>
            <Link href="/privacy" variant='body2' color="inherit" underline="hover" display="block">
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontWeight={'bold'} ml={5} gutterBottom>
              Follow Us
            </Typography>
            <IconButton href="https://facebook.com" target="_blank" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit">
              <TwitterIcon /> 
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" color="inherit">
              <LinkedInIcon />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="inherit">
              <InstagramIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontWeight={'bold'} gutterBottom>
              My-App
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailOutlinedIcon />
              <Typography variant="body2">contact@myappsupport.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnIcon />
              <Typography variant="body2">Kathmandu, Nepal</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon />
              <Typography variant="body2">(+977) 9812312345</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}> 
          <Typography variant="body1" color="text.secondary">
            &copy; {new Date().getFullYear()} My-App. All Rights Reserved. <Link href="/privacy" variant="body2" color="inherit" underline="hover">
            Privacy Policy
          </Link>
          </Typography>
          
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
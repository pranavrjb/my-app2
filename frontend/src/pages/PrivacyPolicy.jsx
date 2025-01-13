import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh',mt: 4, mb: 4 }}>
      {/* <Paper elevation={3} sx={{ p: 2 }}> */}
        {/* Title */}
        <Typography variant="h4" fontWeight={'bold'} align="center" gutterBottom>
          Privacy Policy
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to <a href="/"><strong>My-App</strong></a>. Your privacy is important to us. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our
            healthcare appointment booking platform. Please read this policy carefully. If you do
            not agree with the terms of this policy, please do not use our services.
          </Typography>
        </Box>

        
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="body1" gutterBottom>
            When you use our platform, we may collect the following types of information:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>**Personal Information**: Your name, email address, phone number, and other details provided during account registration.</li>
            <li>**Health Information**: Any medical details you voluntarily provide to schedule appointments.</li>
            <li>**Device Information**: IP address, browser type, and device details to improve user experience.</li>
            <li>**Usage Data**: Information about your interactions with our website, such as pages visited and actions taken.</li>
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            We use the information we collect for the following purposes:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>To facilitate appointment bookings and manage your interactions with healthcare providers.</li>
            <li>To send appointment confirmations, reminders, and updates.</li>
            <li>To enhance the performance and usability of our platform.</li>
            <li>To comply with legal and regulatory requirements.</li>
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Sharing Your Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            We may share your information under the following circumstances:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>With healthcare providers to fulfill your appointment requests.</li>
            <li>With third-party service providers that help us operate our platform.</li>
            <li>When required by law or to protect our legal rights.</li>
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Data Security
          </Typography>
          <Typography variant="body1" gutterBottom>
            We implement technical and organizational measures to protect your personal information. However, no system
            is completely secure, and we cannot guarantee the absolute security of your data.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Your Rights
          </Typography>
          <Typography variant="body1" gutterBottom>
            You have the following rights regarding your personal information:
          </Typography>
          <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
            <li>The right to access and update your personal information.</li>
            <li>The right to request the deletion of your data.</li>
            <li>The right to withdraw consent for non-essential data collection.</li>
            <li>The right to file a complaint with a regulatory authority.</li>
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Changes to This Policy
          </Typography>
          <Typography variant="body1" gutterBottom>
            We may update this Privacy Policy from time to time. The latest version will always be available on our website, and we will notify users of significant changes.
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={'bold'} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            If you have any questions or concerns about this Privacy Policy or your personal data, please contact us:
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Email: myappsupport@gmail.com
            <br />
            Phone: +977 9812312345
            <br />
            Address: 123 Healthcare, Kathmandu , Nepal
          </Typography>
        </Box>
      {/* </Paper> */}
    </Container>
  );
};

export default PrivacyPolicy;

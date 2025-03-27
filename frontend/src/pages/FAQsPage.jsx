// FAQsPage.js - Separate Page for FAQs
import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Container,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const FAQsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const faqs = [
    {
      question: "How does MedPulse work?",
      answer:
        "MedPulse allows you to search for various service providers such as doctors, consultants, gym trainers, hairdressers, and more. You can view their profiles, check availability, and book appointments online.",
    },
    {
      question: "Is MedPulse free to use?",
      answer:
        "Yes, MedPulse is completely free for users. You can browse service providers, view their profiles, and book appointments without any charges.",
    },
    {
      question: "How can I cancel or reschedule an appointment?",
      answer:
        "You can cancel or reschedule an appointment by logging into your account, navigating to your bookings, and selecting the relevant option for the appointment you wish to modify.",
    },
    {
      question: "Are the service providers on MedPulse verified?",
      answer:
        "Yes, all service providers listed on MedPulse are verified professionals. We ensure they have the necessary credentials and experience to offer quality services.",
    },
    {
      question: "Can I book an appointment for someone else?",
      answer:
        "Yes, you can book an appointment for a family member or friend. Just provide their details while filling out the booking form.",
    },
    {
      question: "What types of professionals can I book through MedPulse?",
      answer:
        "You can find and book a wide range of service providers, including doctors, consultants, gym trainers, hairdressers, and many more professionals offering various services.",
    },
  ];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <HelpOutlineIcon
              sx={{
                fontSize: 40,
                color: theme.palette.primary.main,
                mr: 2,
              }}
            />
            <Typography
              variant={isMobile ? "h4" : "h3"}
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, #6396c7, #23a4fa)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 4 }}
          >
            Find answers to common questions about our services
          </Typography>
        </motion.div>

        <Box sx={{ width: "100%" }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Accordion
                sx={{
                  mb: 2,
                  borderRadius: "12px !important",
                  overflow: "hidden",
                  border: `1px solid ${theme.palette.divider}`,
                  "&:before": {
                    display: "none",
                  },
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{
                        color: theme.palette.primary.main,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  }
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                    },
                    py: 1,
                    px: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <QuestionAnswerIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: 24,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        fontWeight: 600,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    bgcolor: theme.palette.background.default,
                    py: 3,
                    px: 4,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                      lineHeight: 1.6,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default FAQsPage;

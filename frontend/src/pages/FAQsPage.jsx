// FAQsPage.js - Separate Page for FAQs
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQsPage = () => {
    const theme = useTheme();
    const faqs = [
        {
            question: "How does My-App work?",
            answer: "My-App allows you to search for doctors in your area, view their profiles, and book appointments online. Simply search for a doctor by specialty or location, choose an available time slot, and confirm your appointment.",
        },
        {
            question: "Is My-App free to use?",
            answer: "Yes, My-App is completely free for patients. You can browse doctors, view their profiles, and book appointments without any charges.",
        },
        {
            question: "How can I cancel or reschedule an appointment?",
            answer: "You can cancel or reschedule an appointment by logging into your account, navigating to your bookings, and selecting the relevant option for the appointment you wish to modify.",
        },
        {
            question: "Are the doctors on My-App verified?",
            answer: "Yes, all doctors listed on My-App are verified professionals. We ensure they have the required credentials and licenses to provide medical services.",
        },
        {
            question: "Can I book an appointment for someone else?",
            answer: "Yes, you can book an appointment for a family member or friend. Just provide their details while filling out the booking form.",
        },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                minWidth: '80vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 8,
                mb:5,
                bgcolor: theme.palette.background.default,
            }}
        >
            <Typography
                variant="h3"
                color="hint"
                sx={{ mb: 4, pt: 2, textAlign: 'center', fontWeight: 'bold' }}
            >
                Frequently Asked Questions
            </Typography>
            <Box sx={{  width: '100%' }}>
                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        sx={{ borderColor: theme.palette.divider, borderRadius: '8px' }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                bgcolor: theme.palette.background.paper,
                                '&:hover': { bgcolor: theme.palette.action.hover },
                                fontSize: '1em',
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontSize: '1.25rem' }}
                            >
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: theme.palette.background.default }}>
                            <Typography sx={{ fontSize: '1.1rem' }}>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default FAQsPage;


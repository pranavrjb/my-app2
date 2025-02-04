import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    InputAdornment,
    Modal,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import API from '../api';

const SearchDoctors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    });
    // const [message,setMessage]=useState('')
    // const [severity,setSeverity]=useState('success')

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await API.get('/doctors');
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.log('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = doctors.filter((doctor) =>
            doctor.name.toLowerCase().includes(value) ||
            doctor.specialization.toLowerCase().includes(value) ||
            doctor.location.toLowerCase().includes(value)
        );
        setFilteredDoctors(filtered);
    };

    const handleCardClick = (doctor) => {
        setSelectedDoctor(doctor);
        setOpen(true);
    };

    const handleBookingChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Data:', bookingData);
        alert(`Appointment booked with Dr. ${selectedDoctor.name}`);
        setOpen(false);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, width: '90vw' }}>
                <TextField
                    label="Search by name, specialization, or location"
                    variant="standard"
                    style={{ width: '100%', maxWidth: '700px' }}
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon style={{ cursor: 'pointer' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Grid container spacing={3}>
                {filteredDoctors.map((doctor) => (
                    <Grid item xs={12} sm={4} md={4} key={doctor.id} onClick={() => handleCardClick(doctor)} style={{ cursor: 'pointer' }}>
                        <Card
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 3,
                                transition: 'transform 0.3s',
                                '&:hover': { transform: 'scale(1.15)' },
                            }}
                        >
                            <Avatar
                                src={doctor.image}
                                alt={doctor.name}
                                sx={{ width: 105, height: 115, mr: 4 }}
                            />
                            <CardContent>
                                <Typography variant="h6" fontWeight={"bold"}>Dr. {doctor.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {doctor.specialization}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Location: {doctor.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Experience: {doctor.experience} years
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {filteredDoctors.length === 0 && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4 }}
                >
                    No doctors found matching your search.
                </Typography>
            )}

            {doctors.length === 0 && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 4 }}
                >
                    No doctors available at the moment.
                </Typography>
            )}
        </Box>
    );
};

export default SearchDoctors;

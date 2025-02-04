import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Avatar,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../api';

const ManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await API.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await API.delete(`/doctors/${id}`);
                // fetchDoctors();
                setDoctors(doctors.filter((doctor) => doctor._id !== id));
                setMessage('Doctor deleted successfully');
            } catch (error) {
                console.error('Failed to delete doctor:', error);
        }
    };
    }
    return (
        <Box sx={{ minHeight: '100vh',p: 4 }}>
            <Typography variant="h3" textAlign={'center'} gutterBottom>
                Manage Doctors
            </Typography>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                   
                </Box>
            ) : (
                <TableContainer item xs={15} component={Paper} >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Avatar</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Name</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Specialization</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Location</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Experience</TableCell>
                                <TableCell sx={{fontWeight:700,fontSize:20}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map((doctor) => (
                                <TableRow key={doctor._id}>
                                    <TableCell>
                                        <Avatar src={doctor.image} alt={doctor.name} />
                                    </TableCell>
                                    <TableCell>{doctor.name}</TableCell>
                                    <TableCell>{doctor.specialization}</TableCell>
                                    <TableCell>{doctor.location}</TableCell>
                                    <TableCell>{doctor.experience}</TableCell>
                                        <TableCell sx={{ml:-5}}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDelete(doctor._id)}
                                                    >
                                                    <DeleteIcon />
                                                    </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
             )}
        </Box>
    );
};

export default ManageDoctors;

import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import API from '../../api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext); // Access the authenticated user
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // Redirect to login if not authenticated
            navigate('/login');
            return;
        }
        fetchUsers();
    }, [user, navigate]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await API.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.log('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", p: 4 }}>
            <Typography variant="h3" textAlign={'center'} gutterBottom>
                Admin Dashboard
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h5" textAlign={'center'} gutterBottom>
                                Users Detail
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Avatar</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>
                                                    <Avatar src={user.avatar} alt={user.name} />
                                                </TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default AdminDashboard;

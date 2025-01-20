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
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../api';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await API.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(`/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    const handleRoleChange = async (role) => {
        try {
            await API.put(`/admin/users/${selectedUser._id}`, { role });
            fetchUsers();
        } catch (error) {
            console.error('Failed to update role:', error);
        }
        handleMenuClose();
    };

    return (
        <Box sx={{ minHeight: '100vh',p: 4 }}>
            <Typography variant="h3" textAlign={'center'} gutterBottom>
                Manage Users
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
                                <TableCell>Avatar</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
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
                                        <TableCell sx={{ml:-5}}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleDelete(user._id)}
                                                    >
                                                    <DeleteIcon sx={{ mr: 1 }} /> Delete User 
                                                    </Button>
                                                {/* </TableCell> */}
                                        <Tooltip title="Manage User">
                                            <IconButton
                                                onClick={(e) => handleMenuOpen(e, user)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleRoleChange('user')}>Set as User</MenuItem>
                <MenuItem onClick={() => handleRoleChange('doctor')}>Set as Doctor</MenuItem>
                <MenuItem onClick={() => handleRoleChange('admin')}>Set as Admin</MenuItem>
            </Menu>
        </Box>
    );
};

export default ManageUsers;

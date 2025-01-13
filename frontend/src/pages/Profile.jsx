import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Container>
      <Box sx={{minHeight: '100vh', mt: 3, textAlign: 'center',mb:10 }}>
        <Typography variant="h3" gutterBottom>
          Welcome, {user?.name ? user.name : 'Guest'}!
        </Typography>
        {user && (
          <TableContainer component={Paper} sx={{ mt: 4, }}>
            <Table>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{user.id || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{user.email || 'N/A'}</TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>{user.role.toUpperCase() || 'N/A'}</TableCell>
                  </TableRow>
              <TableRow>
                  <TableCell>User Object</TableCell>
                  <TableCell>
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </TableCell>
                    </TableRow>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default Profile;

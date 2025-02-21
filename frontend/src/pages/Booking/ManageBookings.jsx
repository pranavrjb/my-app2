import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Snackbar,
  Alert,
  Popover,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import API from "../../api";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await API.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await API.delete(`/bookings/${id}`);
        setBookings(bookings.filter((booking) => booking._id !== id));
        setMessage("Booking deleted successfully");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Failed to delete booking:", error);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Manage Bookings
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : bookings.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Client
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Email
                </TableCell>
                {/* <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Phone
                </TableCell> */}
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Slot
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Created At
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: 20 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.clientName}</TableCell>
                  <TableCell>{booking.clientEmail}</TableCell>
                  {/* <TableCell>{booking.clientPhone || "N/A"}</TableCell> */}
                  <TableCell>{booking.slot}</TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(booking._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No bookings found.</Typography>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageBookings;

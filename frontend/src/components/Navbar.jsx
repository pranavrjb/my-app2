import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserContext } from "../context/UserContext";
import { useTheme } from "@mui/material/styles";
import Toggle from "../context/DarkMode/Toggle";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/login");
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const isAdmin = user && user.role === "ADMIN";

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          width: "100%",
        }}
      >
        {/* Mobile Menu Button */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "flex-end", 
            position: "absolute", 
            top: 10,
            right: 15, 
          }}
        >
          <IconButton color="inherit" edge="end" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            position: { xs: "absolute", md: "static" },
            left: { xs: "50%", md: "auto" },
            transform: { xs: "translateX(-50%)", md: "none" },
          }}
        >
          MedPulse
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {user ? (
            <>
              {isAdmin && (
                <>
                  <Button color="inherit" component={Link} to="/admin">
                    Admin
                  </Button>
                  <Button color="inherit" component={Link} to="/manageusers">
                    Manage User
                  </Button>
                  <Button color="inherit" component={Link} to="/form">
                    Add Company
                  </Button>
                  <Button color="inherit" component={Link} to="/service/:id">
                    Manage Bookings
                  </Button>
                  {/* <Button color="inherit" component={Link} to="/doctor">
                    Add Doctor
                  </Button> */}
                </>
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button color="inherit" component={Link} to="/bookings">
                Start Booking
                </Button>
                <Tooltip title="View User Profile" arrow>
                  <AccountCircleIcon
                    sx={{ cursor: "pointer", fontSize: 27 }}
                    onClick={handleMenuOpen}
                  />
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem>
                    <Typography>Welcome, {user.name || "User"}</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ marginRight: 1 }} />
                    Log out
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          <Toggle />
        </Box>

        {/* Placeholder for alignment */}
        <Box sx={{ display: { xs: "flex", md: "none" }, width: "48px" }} />
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Box
          sx={{ width: 230 }}
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem component={Link} to="/contact">
              <ListItemText primary="Contact Us" />
            </ListItem>
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <ListItem component={Link} to="/admin">
                      <ListItemText primary="Admin" />
                    </ListItem>
                    <ListItem component={Link} to="/manageusers">
                      <ListItemText primary="Manage User" />
                    </ListItem>
                    <ListItem component={Link} to="/managedoctors">
                      <ListItemText primary="Manage Doctor" />
                    </ListItem>
                    <ListItem component={Link} to="/doctor">
                      <ListItemText primary="Add Doctor" />
                    </ListItem>
                  </>
                )}
                <ListItem component={Link} to="/bookings">
                  <ListItemText primary="Start Booking" />
                  </ListItem>
                <ListItem component={Link} to="/profile">
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem onClick={handleLogout}>
                  <LogoutIcon sx={{ marginRight: 1 }} />
                  <ListItemText primary="Log out" />
                </ListItem>
              </>
            ) : (
              <ListItem component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            )}
            <ListItem>
              <Toggle />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

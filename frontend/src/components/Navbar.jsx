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
  useScrollTrigger,
  Slide,
  Fade,
  Avatar,
  Divider,
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
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          background:
            theme.palette.mode === "dark"
              ? "rgba(18, 18, 18, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "64px",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Mobile Menu Button */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              position: "absolute",
              right: 15,
            }}
          >
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
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
              fontWeight: 700,
              letterSpacing: "0.5px",
              position: { xs: "absolute", md: "static" },
              left: { xs: "50%", md: "auto" },
              transform: { xs: "translateX(-50%)", md: "none" },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "transform 0.2s",
              "&:hover": {
                transform: {
                  xs: "translateX(-50%) scale(1.05)",
                  md: "scale(1.05)",
                },
              },
            }}
          >
            MedPulse
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {user ? (
              <>
                {isAdmin && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/admin"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Admin
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/manageusers"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Manage User
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/form"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Add Company
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/managebookings"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      Manage Bookings
                    </Button>
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/bookings"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "20px",
                      px: 3,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      },
                    }}
                  >
                    Start Booking
                  </Button>
                  <Tooltip title="View User Profile" arrow>
                    <Avatar
                      onClick={handleMenuOpen}
                      sx={{
                        cursor: "pointer",
                        width: 35,
                        height: 35,
                        backgroundColor: theme.palette.primary.main,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      {user.name ? (
                        user.name[0].toUpperCase()
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </Avatar>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        borderRadius: 2,
                        boxShadow: theme.shadows[3],
                      },
                    }}
                  >
                    <MenuItem sx={{ py: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Welcome, {user.name || "User"}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to="/profile" sx={{ py: 1.5 }}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Log out
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "20px",
                  px: 3,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  },
                }}
              >
                Login
              </Button>
            )}
            <Toggle />
          </Box>

          {/* Placeholder for alignment */}
          <Box sx={{ display: { xs: "flex", md: "none" }, width: "48px" }} />
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: 280,
              borderRadius: "16px 0 0 16px",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List sx={{ px: 2 }}>
            <ListItem
              component={Link}
              to="/contact"
              sx={{
                borderRadius: 2,
                mb: 1,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary="Contact Us" />
            </ListItem>
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <ListItem
                      component={Link}
                      to="/admin"
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary="Admin" />
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/manageusers"
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary="Manage User" />
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/managedoctors"
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary="Manage Doctor" />
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/doctor"
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary="Add Doctor" />
                    </ListItem>
                  </>
                )}
                <ListItem
                  component={Link}
                  to="/bookings"
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText primary="Start Booking" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/profile"
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Log out" />
                </ListItem>
              </>
            ) : (
              <ListItem
                component={Link}
                to="/login"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            )}
            <ListItem>
              <Toggle />
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </Slide>
  );
};

export default Navbar;

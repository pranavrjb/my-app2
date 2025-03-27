import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import { CssBaseline } from "@mui/material";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeContextProvider } from "./context/DarkMode/ThemeContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookingForm from "./pages/Booking/BookingForm";
import ManageBookings from "./pages/Booking/ManageBookings";
import TermsOfService from "./pages/TermsOfService";
import ServiceProviderDetails from "./pages/Services/ServiceProviderDetails";
import ServiceProviderForm from "./pages/Services/ServiceProviderForm";
import SearchServiceProviders from "./pages/Services/SearchServiceProviders";
import HelpCenter from "./pages/HelpCenter";
const App = () => {
  // const isLoggedin = !!window.localStorage.getItem("userToken");

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/help"element={<HelpCenter/>}/>
        <Route path="/search" element={<SearchServiceProviders />} />
        <Route path="/bookings" element={<BookingForm />} />
        <Route path="/form" element={<ServiceProviderForm />} />
        <Route
          path="/service/:id"
          element={<ServiceProviderDetails />}
        />

        {/* Protected Routes */}
        <Route path="/profile" element={<Profile />} />
        {/* Admin-Only Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageusers"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              {" "}
              <ManageUsers />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/managebookings"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageBookings />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/managedoctors"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <ManageDoctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              {" "}
              <DoctorForm />{" "}
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </ThemeContextProvider>
  );
};

export default App;

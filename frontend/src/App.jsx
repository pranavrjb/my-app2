import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import SearchDoctors from './pages/SearchDoctors';
import Profile from './pages/Profile';
import DoctorForm from './context/DoctorForm';
import About from './pages/About';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './routes/ProtectedRoute';
import { ThemeContextProvider } from './context/DarkMode/ThemeContext';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BookingForm from './pages/BookingForm';
import ManageDoctors from './pages/ManageDoctors';

const App = () => {
  const isLoggedin = !!window.localStorage.getItem('userToken');

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
        <Route path="/search" element={<SearchDoctors />} />
         <Route path="/bookings" element={<BookingForm />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path="/patients-dashboard"
          element={<ProtectedRoute isLoggedin={isLoggedin} component={<PatientDashboard />} />}
        />
        
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
          element={<ProtectedRoute requiredRole="ADMIN"> <ManageUsers /> </ProtectedRoute> }
        />
        <Route
          path="/managedoctors"
          element={<ProtectedRoute requiredRole="ADMIN"><ManageDoctors /></ProtectedRoute> }
        />
        <Route
          path="/doctor"
          element={<ProtectedRoute requiredRole="ADMIN"> <DoctorForm /> </ProtectedRoute> }
        />

      </Routes>
      <Footer />
    </ThemeContextProvider>
  );
};

export default App;

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import PatientDashboard from './components/Dashboard/PatientDashboard'
import DoctorDashboard from './components/Dashboard/DoctorDashboard'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import SearchDoctors from './pages/SearchDoctors'
import Profile from './pages/Profile'
import DoctorForm from './context/DoctorForm'
import About from './pages/About'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManageUsers from './pages/ManageUsers'
import { CssBaseline } from '@mui/material';
import ProtectedRoute from '../routes/ProtectedRoute'
import { ThemeContextProvider } from './context/DarkMode/ThemeContext';
import PrivacyPolicy from './pages/PrivacyPolicy'
import BookingForm from './pages/BookingForm'
// import ManageBooking from '../Booking/ManageBooking'
const App = () => {

  return (
    <div>
      <ThemeContextProvider>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/Search' element={<SearchDoctors />} />
          <Route path='/Doctor' element={<DoctorForm />} />
          <Route path='/About' element={<About />} />
          <Route path='/Privacy' element={<PrivacyPolicy />} />
          <Route path="/patients-dashboard" element={<PatientDashboard />} />
          <Route path="/doctors-dashboard" element={<DoctorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/manageusers' element={<ManageUsers/>} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/bookings' element={<BookingForm/>} />
          
        </Routes>
        <Footer />
      </ThemeContextProvider>
    </div>
  )
}

export default App

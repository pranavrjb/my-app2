require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const createHttpError = require('http-errors');
const path = require('path');

const authRoutes = require('./routes/auth');
// Commenting out serviceRoutes until it's properly set up
// const serviceRoutes = require('./routes/service');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contacts');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const serviceProviderRoutes = require('./routes/serviceProvider');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));
app.use(morgan('dev'));

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.error('MongoDB Connection Failed!', err.message));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to appointment booking API!');
});

// API Routes
app.use('/api/auth', authRoutes);
// Commenting out serviceRoutes until it's properly set up
// app.use('/api/services', serviceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/service-providers', serviceProviderRoutes);

// Error handling for not found routes
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error handling middleware
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).json({
    success: false,
    message: error.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

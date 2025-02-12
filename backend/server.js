import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/service.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contacts.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';

const app = express();
const port = 3001;
const conn = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(morgan('dev'));
app.use('/images', express.static(path.join(__dirname,'../../frontend/public/images')))

// MongoDB connection
mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.error('Connection Failed!', err.message));

// Init session Routes
app.get('/', (req, res) => {
  res.send('Welcome to appointment booking API!');
});

// Auth routes
app.use('/auth', authRoutes);
app.use('/service', serviceRoutes);
app.use('/contacts', contactRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Error handling for not found routes
app.use((req, res, next) => {
  next(createHttpError.NotFound());q 
});

// Error handling middleware
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status).send(error.message || 'Internal Server Error');
});

// Listen on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

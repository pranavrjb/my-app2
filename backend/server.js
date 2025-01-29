import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import { Server } from 'socket.io';
import http from 'http'; 
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contacts.js';
import adminRoutes from './routes/admin.js';

const app = express();
const port = 3001;
const conn = process.env.MONGO_URI;

const server = http.createServer(app); 
const io = new Server(server, { cors: { origin: '*' } });

// Store connected clients
const connectedClients = {};

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Add the client to connectedClients when they connect
  socket.on('register', (userId) => {
    connectedClients[userId] = socket.id;
    console.log('User registered:', userId);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(connectedClients)) {
      if (socketId === socket.id) {
        delete connectedClients[userId];
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

// Function to notify a client
export const notifyClient = (userId, message) => {
  const socketId = connectedClients[userId];
  if (socketId) {
    console.log(`Sending notification to user ${userId} at socket ${socketId}: ${message}`);
    io.to(socketId).emit('notification', message);
  } else {
    console.log(`User not connected: ${userId}`);
  }
};

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(morgan('dev'));

mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.error('Connection Failed!', err.message));

// Init session Routes
app.get('/', (req, res, next) => {
  res.send('Welcome to appointment booking API!');
});

// Auth routes
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/contacts', contactRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
});

// Listen on the port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

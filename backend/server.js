import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError from 'http-errors';

import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contacts.js';
import adminRoutes from './routes/admin.js'

const app = express();
const port = 3001;
const conn= process.env.MONGO_URI;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));
app.use(morgan('dev'))

mongoose.connect(conn, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB is connected!'))
  .catch((err) => console.error('Connection Failed!', err.message));

//Init session Routes
app.get('/', (req, res,next) => {
  res.send('Welcome to appointment booking API!');
});


// Auth routes
app.use('/auth', authRoutes);

// Doctor routes
app.use('/doctors', doctorRoutes);

//Contact routes
app.use('/contacts', contactRoutes);

app.use('/bookings', bookingRoutes)


app.use('/admin',adminRoutes)

app.use((req,res,next)=>{
  next(createHttpError.NotFound())
})

app.use((error,req,res,next)=>{
  error.status = error.status || 500;
  res.status(error.status)
  res.send(error)
})
// Listen on the port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

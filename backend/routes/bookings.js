import express from 'express';
import Booking from '../models/Booking.js';
import protect from '../middleware/protectMiddleware.js';
import Notification from '../models/Notification.js';
import { notifyClient } from '../server.js';

const router = express.Router();

// Helper function to create notifications
const createNotification = async (userId, message) => {
    try {
        const notification = new Notification({ userId, message });
        await notification.save();
    } catch (error) {
        console.error('Failed to create notification:', error.message);
    }
};

// Create a new booking
router.post('/book', protect, async (req, res) => {
    const { doctor, symptoms, time } = req.body;

    try {
        const newBooking = new Booking({
            doctor,
            patient: req.user._id,
            symptoms,
            time,
        });
        await newBooking.save();

        // Emit notification to client
        notifyClient(req.user._id, `You have a new appointment with Dr. ${newBooking.doctor.name} on ${newBooking.time}`);

        // Create a notification entry in the database
        const message = `You have a new appointment with Dr. ${newBooking.doctor.name} on ${newBooking.time}`;
        await createNotification(req.user._id, message);

        // Send success response
        res.status(201).json({
            message: 'Appointment Booked Successfully!',
            booking: newBooking,
        });
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error while booking appointment:', error);
        res.status(500).json({ message: 'Something went wrong!', error: error.message });
    }
});


// Get bookings for a specific user
router.get('/user/:userId', protect, async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ patient: userId }).populate('doctor', 'name');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

// Update booking status
router.put('/:id/status', protect, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

        if (!booking) {
            return res.status(404).json({ message: 'Appointment not found!' });
        }

        res.status(200).json({ message: 'Appointment status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

export default router;

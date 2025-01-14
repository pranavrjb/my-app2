import express from 'express';
import Booking from '../models/Booking.js';
import protect from '../middleware/protectMiddleware.js';

const router = express.Router();

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
        res.status(201).json({
            message: 'Appointment Booked Successfully!',
            booking: newBooking,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

// Get bookings for a specific user
router.get('/user/:userId', protect, async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ patient: userId }).populate(
            'doctor',
            'name'
        );
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
        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!booking) {
            return res.status(404).json({ message: 'Appointment not found!' });
        }
        res.status(200).json({ message: 'Appointment status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

export default router;

import express from 'express';
import Booking from '../models/Booking.js';
import protect from '../middleware/protectMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

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

//get all bookings for the admin
router.get('/',protect, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('doctor', 'name specialization image').populate('patient', 'name');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

// Update booking status
router.put('/:id',protect,admin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if(!status){
            return res.status(403).json({message:"Status is required!"});
        }
        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found!' });
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Delete a booking
router.delete('/:id',protect,admin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid booking ID format' });
        }

        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete',
            error: error.message
        });
    }
});
export default router;

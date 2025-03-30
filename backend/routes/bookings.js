const express = require('express');
const Booking = require('../models/Booking.js');
const { protect, isAdmin } = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();
// Create a new booking
router.post('/book', protect, async (req, res) => {
    const { providerId, clientName, clientEmail, description, slot } = req.body;

    try {
        const newBooking = new Booking({
            providerId,
            clientName,
            clientEmail,
            description,
            slot,
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get bookings for a specific user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.find({ patient: id }).populate('clientName clientEmail description slot');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

//get all bookings for the admin
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('providerId clientName clientEmail');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!', error });
    }
});

// Update booking status
router.put('/:id', protect, isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(403).json({ message: "Status is required!" });
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
router.delete('/:id', protect, isAdmin, async (req, res) => {
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
module.exports = router;

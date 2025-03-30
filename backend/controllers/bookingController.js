const Booking = require('../models/Booking');
const ServiceProvider = require('../models/ServiceProvider');

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            providerId,
            serviceType,
            date,
            slot,
            clientName,
            clientEmail,
            clientPhone,
            location,
            description
        } = req.body;

        // Validate required fields
        if (!providerId || !serviceType || !date || !slot || !clientName || !clientEmail || !clientPhone) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Check if service provider exists
        const provider = await ServiceProvider.findById(providerId);
        if (!provider) {
            return res.status(404).json({
                message: "Service provider not found"
            });
        }

        // Check if slot is available
        const existingBooking = await Booking.findOne({
            providerId,
            date,
            slot,
            status: { $ne: 'cancelled' }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }

        // Create new booking
        const booking = new Booking({
            providerId,
            serviceType,
            date,
            slot,
            clientName,
            clientEmail,
            clientPhone,
            location,
            description
        });

        await booking.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({
            message: "Error creating booking",
            error: error.message
        });
    }
};

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('providerId', 'businessName serviceCategory')
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching bookings",
            error: error.message
        });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('providerId', 'businessName serviceCategory');

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching booking",
            error: error.message
        });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking status updated successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating booking status",
            error: error.message
        });
    }
};

// Get bookings by service provider
const getProviderBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ providerId: req.params.providerId })
            .sort({ date: 1, slot: 1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching provider bookings",
            error: error.message
        });
    }
};

// Get bookings by client email
const getClientBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ clientEmail: req.params.email })
            .populate('providerId', 'businessName serviceCategory')
            .sort({ date: 1, slot: 1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching client bookings",
            error: error.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    getProviderBookings,
    getClientBookings
}; 
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Doctor', 
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', 
        },
        time: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed','Comfirmed', 'Cancelled'],
            default: 'Pending',
        },
        symptoms: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;

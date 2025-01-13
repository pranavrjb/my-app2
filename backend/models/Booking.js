import mongoose from "mongoose";

const BookingSchema= new mongoose.Schema({
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
                enum: ['Pending', 'Completed', 'Cancelled'],
                default: 'Pending',
            },
            symptoms: {
                type: String,
                required: true,
                trim: true,
                maxlength: 500,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
)
 const Booking=mongoose.model('Booking',BookingSchema);
 export default Booking;
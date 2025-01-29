import Doctor from '../models/Doctor.js';
import mongoose from 'mongoose';

export const addDoctor = async (req, res) => {
    const { name, specialization, location, experience, image } = req.body;

    try {
        const doctor = new Doctor({ name, specialization, location, experience, image });
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Failed to add doctor', error });
    }
};

export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(404 ).json({ message: 'Failed to fetch doctors', error });
    }
};

export const deleteDoctors = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid doctor ID format' });
        }

        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete doctor',
            error: error.message
        });
    }
};

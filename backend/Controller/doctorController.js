import Doctor from '../models/Doctor.js';

export const addDoctor = async (req, res) => {
    const { name, specialization, location, experience, email, image } = req.body;

    try {
        const doctor = new Doctor({ name, specialization, location, experience, email, image });
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
        res.status(500).json({ message: 'Failed to fetch doctors', error });
    }
};

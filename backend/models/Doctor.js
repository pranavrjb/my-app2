import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    location: { type: String, required: true },
    experience: {type:Number, require:true},
    image:{type: String, required: true}
});

const Doctor=mongoose.model('Doctor', DoctorSchema);
export default Doctor;

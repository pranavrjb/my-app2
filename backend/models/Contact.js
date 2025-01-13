import mongoose from "mongoose";

const ContactSchema= new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    message:String
});
const Contact=mongoose.model('Contact',ContactSchema)
export default Contact;
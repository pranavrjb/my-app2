import mongoose from "mongoose";
import  {roles} from "../utils/constants.js";
import * as bcrypt from 'bcrypt';

const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true,lowercase: true},
    password:String,
    confirmPassword:String,
    role: { type: String, 
        enum: [roles.admin,roles.doctor,roles.patient], 
        default:roles.patient },
});
UserSchema.pre('save',async function (params) {
    try{
        if(this.email===process.env.ADMIN_EMAIL){
            this.role=roles.admin;
        }
        params();
    }
    catch(error){
        params(error)
    }
    
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User=mongoose.model('User',UserSchema);
export default User;
import mongoose from 'mongoose'

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  // specialty: {
  //   type: String,
  // },
  availableSlots: {
    type: [String],
  },
  avatar: {
    type: String,  
  },
    location: {
        type: String, 
        required: true, 
    },
    // experience: {
    //     type: Number, 
    //     required: true, 
    //     min: [1, 'Experience must be at least 1 year'], 
    // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider

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
  specialty: {
    type: String,
  },
  availableSlots: {
    type: [String],
  },
  avatar: {
    type: String,  // Store the URL of the uploaded image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
export default ServiceProvider

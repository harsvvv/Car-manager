import { mongoose, Schema } from "mongoose";

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number, 
  },
  mileage: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  parkingSensors: {
    type: Boolean,
    required: true,
  },
  imageUrls: {
    type: Array, // Array of URLs
    required: true,
  },
  userRef: {
    type: String, // User ID as a reference
    required: true,
  },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;

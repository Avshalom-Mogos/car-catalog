import mongoose from 'mongoose';
const carSchema = new mongoose.Schema({
  bodyType: String,
  brand: String,
  color: String,
  fuelType: String,
  image: String,
  model: String,
  modelDate: String,
  price: String,
  vehicleInteriorColor: String,
});
export default mongoose.model('Car', carSchema);

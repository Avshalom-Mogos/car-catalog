import mongoose from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userProviderId: String,
  authProvider: String,
});
export default mongoose.model<IUser>('User', userSchema);

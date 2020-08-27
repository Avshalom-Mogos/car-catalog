import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  providerId?: string;
  authProvider: string;
  name: string;
  email: string;
  password?: string;
  _doc?: object;
}

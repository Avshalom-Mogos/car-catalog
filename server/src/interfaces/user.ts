import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  userProviderId?: string;
  authProvider: string;
  name: string;
  email: string;
  password?: string;
  accessToken?: string;
}

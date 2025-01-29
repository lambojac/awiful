import mongoose, { Schema } from 'mongoose';
import { UserDataProps } from '../types';

export interface UserDocument extends UserDataProps {}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password:{type:String, required:true},
  gender: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  date_created: { type: String, default: new Date().toISOString() },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  role: { type: String, required: true, default:"user" },
  zoom_username: { type: String },
  skype_username: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<UserDocument>('User', UserSchema);
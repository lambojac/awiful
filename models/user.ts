import mongoose, { Schema } from 'mongoose';
import { UserDataProps } from '../types';

export interface UserDocument extends UserDataProps {}

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  password:{type:String},
  gender: { type: String},
  address: { type: String },
  country: { type: String },
  username: { type: String,
    unique: true,
    required: [true, "Username is required"],
     },
  date_created: { type: String, default: new Date().toISOString() },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin","admin", "software_developer", "content_creator", "digital_marketer", "customer"],
    default: "customer"
  },
  zoom_username: { type: String },
  skype_username: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model<UserDocument>('User', UserSchema);
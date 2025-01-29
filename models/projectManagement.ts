import mongoose, { Schema } from 'mongoose';
import { ProjectManagementDataProps } from '../types/index';

export interface ProjectManagementDocument extends ProjectManagementDataProps {}

const ProjectManagementSchema = new Schema({
  username: { type: String, required: true },
  date_created: { type: String, default: new Date().toISOString() },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  role: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<ProjectManagementDocument>('ProjectManagement', ProjectManagementSchema);
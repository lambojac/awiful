import mongoose, { Schema } from 'mongoose';
import { ProjectManagementDataProps } from '../types/index';

export interface ProjectManagementDocument extends ProjectManagementDataProps {}

const ProjectManagementSchema = new Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String},
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  business_size: { type: String, required: true },
  price: { type: Number, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  socials: { type: Schema.Types.Mixed, default: null }, 
  status: { type: String, enum: ["pending", "in_progress", "completed", "canceled"], default: "in_progress" },
  status_percentage: { type: Number, default: 10 },
  handled_by: [{ user_name: String, user_id: { type: Schema.Types.ObjectId, ref: "User" } }]
},{
    timestamps: true
  });
  
  

export default mongoose.model<ProjectManagementDocument>('ProjectManagement', ProjectManagementSchema);
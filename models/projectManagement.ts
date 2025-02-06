import mongoose, { Schema } from 'mongoose';
import { ProjectManagementDataProps } from '../types/index';

export interface ProjectManagementDocument extends ProjectManagementDataProps {}

const ProjectManagementSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    project_title: { type: String, required: true },
    service: { type: String, required: true },
    country: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    price: { type: String, required: true },
    business_size: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending payment", "in progress", "completed"],
      default: "pending payment"
    }
  }, {
    timestamps: true
  });
  

export default mongoose.model<ProjectManagementDocument>('ProjectManagement', ProjectManagementSchema);
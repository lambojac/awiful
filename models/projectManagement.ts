import mongoose, { Schema } from 'mongoose';
import { ProjectManagementDataProps } from '../types/index';

export interface ProjectManagementDocument extends ProjectManagementDataProps {}

const ProjectManagementSchema = new Schema({
  title: { type: String,  },
  userId:{type: Schema.Types.ObjectId, ref: "User", },
  email: { type: String, },
  type: { type: String, enum:["project", "marketing"],default:"project"},
  client: { type: Schema.Types.ObjectId, ref: "User", },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  business_size: { type: String, required: true },
  service:{ type: [String], required: true },
  price: { type: Number, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  socials: { type: Schema.Types.Mixed, default: null }, 
  status: { type: String, enum: ["pending", "in_progress", "completed", "canceled"], default: "in_progress" },
  status_percentage: { type: Number, default: 10 },
  handled_by: [{ user_name: String, user_id: { type: Schema.Types.ObjectId, ref: "User" } }],
  payment_status: { 
    type: String, 
    enum: ["pending", "processing", "paid", "failed"], 
    default: "pending" 
  },
  stripe_payment_intent_id: { type: String },
  stripe_client_secret: { type: String },
  // Revenue tracking fields
  revenue: {
    xAxis: {
      label: { type: String, default: "Months" },
      values: { type: [String], default: [] }
    },
    yAxis: {
      label: { type: String, default: "Revenue" },
      unit: { type: String, default: "USD" }
    },
    data: [{
      period: { type: String, required: true },
      values: { type: [Number], default: [] }
    }],
    categories: { type: [String], default: [] }
  }

},{
    timestamps: true
  });
  
  

export default mongoose.model<ProjectManagementDocument>('ProjectManagement', ProjectManagementSchema);
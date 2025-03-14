import mongoose, { Schema } from 'mongoose';
import {IEstimate} from "../types/index";


const EstimateSchema: Schema = new Schema({
  request_details: {
    title: { type: String, required: true },
    service:{ type: [String], required: true },
    proposed_start_date: { type: String, required: true },
    proposed_end_date: { type: String, required: true },
    business_size: { type: String, required: true },
    budget: { type: Number, required: true },
    country: { type: String, required: true },
    request_id: { type: String}
  },
  client: {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true }
  },
  description: { type: String, required: true },
  additional_services: { type: [String], required: true },
  status: {
    type: String,
    enum: ["in_progress","closed", "completed","pending"],
    default: "in_progress"
  },
  price:{
    type:Number
  },
  country:{
    type:String
  }
}, {
  timestamps: true
});

export default mongoose.model<IEstimate>('Estimate', EstimateSchema);

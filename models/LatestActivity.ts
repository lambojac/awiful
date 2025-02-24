import mongoose, { Schema } from "mongoose";
import { LatestActivity } from "../types/index";


const LatestActivitySchema = new Schema<LatestActivity>(
  {
    
    title: { type: String, required: true },
    created_by: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<LatestActivity>("LatestActivity", LatestActivitySchema);

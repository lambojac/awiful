
import mongoose, { Schema, Document } from 'mongoose';
import { IRevenueData } from '../types/index';
export interface IRevenueCard extends Document, IRevenueData {}

export interface IRevenueCard extends IRevenueData {}
const RevenueSchema: Schema = new Schema({
    title: { type: String, required: true },
    xAxis: {
      label: { type: String, required: true },
      values: { type: [String], required: true }
    },
    yAxis: {
      label: { type: String, required: true },
      unit: { type: String, required: true }
    },
    data: [{
      period: { type: String, required: true },
      values: { type: [Number], required: true }
    }],
    categories: { type: [String], required: true }
  });
  
  export default  mongoose.model<IRevenueCard>('Revenue', RevenueSchema);
  

import mongoose, { Schema } from 'mongoose';
import { StatCardData } from '../types/index';

export interface StatCardDataDocument extends StatCardData{}
const StatCardSchema = new Schema({
  title: { type: String, required: true },
  count: { type: Number, required: true },
  backgroundColor: { type: String, required: true },
  actionBg: { type: String, required: true },
  textColor: { type: Boolean, default: false },
});

export default  mongoose.model<StatCardDataDocument>('StatCard', StatCardSchema);

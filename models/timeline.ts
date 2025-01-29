import mongoose, { Schema, Document } from 'mongoose';
import { timelineDataProps } from '../types';

export interface TimelineDocument extends timelineDataProps, Document {}

const TimelineSchema = new Schema({
  time: { type: String, required: true },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  user: { type: String, required: true },
  description: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<TimelineDocument>('Timeline', TimelineSchema);
import mongoose from 'mongoose';
const LandingVisitSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  userAgent: String
});

const UserVisitSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  macAddress: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  area: { type: String, required: true }, // dashboard, settings, etc.
  ipAddress: String,
  userAgent: String
});

// Create models
export const LandingVisit = mongoose.model('LandingVisit', LandingVisitSchema);
export const UserVisit = mongoose.model('UserVisit', UserVisitSchema);
// const UserVisit
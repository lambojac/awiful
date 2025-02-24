import mongoose, { Schema } from 'mongoose';
import { ProjectCommentProps } from '../types/index';

export interface ProjectCommentDocument extends ProjectCommentProps, mongoose.Document {}

const ProjectCommentSchema = new Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  created_by: { type: String, required: true },
  description: { type: String, default: null },
  file: { type: String, default: null },
  project: { type: Schema.Types.ObjectId, ref: "ProjectManagement", required: true }
}, {
  timestamps: true
});

export default mongoose.model<ProjectCommentDocument>('ProjectComment', ProjectCommentSchema);

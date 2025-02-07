import mongoose, { Schema } from 'mongoose';
import { ArticleProps } from '../types/index';

export interface ArticleDocument extends ArticleProps{}

const ArticleSchema = new Schema({
    image:String,
    title: { type: String, required: true },
    descHeading: { type: String, required: true },
    desc: { type: String, required: true },
    topArticle: { type: Boolean, default: false },
    content: { type: String },
    category: { type: String },
    status: { type: String },
    keywords: { type: String },
    tags: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<ArticleDocument>('Article', ArticleSchema);
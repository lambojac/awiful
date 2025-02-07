import mongoose, { Schema } from 'mongoose';
import {MarketingDataProps } from '../types/index';


const MarketingDataSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    project_title: { type: String, required: true },
    service: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    budget: { type: String, required: true },
    business_size: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model<MarketingDataProps>('MarketingData', MarketingDataSchema);

import { Request, Response } from 'express';
import MarketingData from '../models/marketing';

export const createMarketingData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, project_title, service, start_date, end_date, budget, business_size, description } = req.body;
        const newMarketingData = new MarketingData({ user, project_title, service, start_date, end_date, budget, business_size, description });
        const savedMarketingData = await newMarketingData.save();
        res.status(201).json(savedMarketingData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMarketingData = async (_req: Request, res: Response): Promise<void> => {
    try {
        const marketingData = await MarketingData.find().populate("user", "firstName lastName email phone_number role").lean();
        res.status(200).json(marketingData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getMarketingDataById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const marketingData = await MarketingData.findById(req.params.id)
            .populate("user", "firstName lastName email phone_number role")
            .lean();

        if (!marketingData) {
            return res.status(404).json({ message: 'Marketing data not found' });
        }

        return res.status(200).json(marketingData);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};



export const updateMarketingData = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedMarketingData = await MarketingData.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("user", "firstName lastName email phone_number role").lean();
        if (!updatedMarketingData)  res.status(404).json({ message: 'Marketing data not found' });
        res.status(200).json(updatedMarketingData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const deleteMarketingData = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedMarketingData = await MarketingData.findByIdAndDelete(req.params.id);
        if (!deletedMarketingData) res.status(404).json({ message: 'Marketing data not found' });
        res.status(200).json({ message: 'Marketing data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
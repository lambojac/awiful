"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarketingData = exports.updateMarketingData = exports.getMarketingDataById = exports.getMarketingData = exports.createMarketingData = void 0;
const marketing_1 = __importDefault(require("../models/marketing"));
const createMarketingData = async (req, res) => {
    try {
        const { user, project_title, service, start_date, end_date, budget, business_size, description } = req.body;
        const newMarketingData = new marketing_1.default({ user, project_title, service, start_date, end_date, budget, business_size, description });
        const savedMarketingData = await newMarketingData.save();
        res.status(201).json(savedMarketingData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.createMarketingData = createMarketingData;
const getMarketingData = async (_req, res) => {
    try {
        const marketingData = await marketing_1.default.find().populate("user", "firstName lastName email phone_number role").lean();
        res.status(200).json(marketingData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMarketingData = getMarketingData;
const getMarketingDataById = async (req, res) => {
    try {
        const marketingData = await marketing_1.default.findById(req.params.id)
            .populate("user", "firstName lastName email phone_number role")
            .lean();
        if (!marketingData) {
            return res.status(404).json({ message: 'Marketing data not found' });
        }
        return res.status(200).json(marketingData);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMarketingDataById = getMarketingDataById;
const updateMarketingData = async (req, res) => {
    try {
        const updatedMarketingData = await marketing_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("user", "firstName lastName email phone_number role").lean();
        if (!updatedMarketingData)
            res.status(404).json({ message: 'Marketing data not found' });
        res.status(200).json(updatedMarketingData);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateMarketingData = updateMarketingData;
const deleteMarketingData = async (req, res) => {
    try {
        const deletedMarketingData = await marketing_1.default.findByIdAndDelete(req.params.id);
        if (!deletedMarketingData)
            res.status(404).json({ message: 'Marketing data not found' });
        res.status(200).json({ message: 'Marketing data deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteMarketingData = deleteMarketingData;
//# sourceMappingURL=marketing.js.map
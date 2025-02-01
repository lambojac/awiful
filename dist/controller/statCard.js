"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatById = exports.updateStatById = exports.getStatById = exports.getStatCard = exports.createStatCard = void 0;
const statCard_1 = __importDefault(require("../models/statCard"));
const createStatCard = async (req, res) => {
    try {
        const statCard = new statCard_1.default(req.body);
        await statCard.save();
        res.status(201).json(statCard);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createStatCard = createStatCard;
const getStatCard = async (_req, res) => {
    try {
        const statCards = await statCard_1.default.find();
        res.json(statCards);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStatCard = getStatCard;
const getStatById = async (req, res) => {
    try {
        const statCard = await statCard_1.default.findById(req.params.id);
        if (!statCard)
            return res.status(404).json({ message: 'Stat card not found' });
        return res.json(statCard);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getStatById = getStatById;
const updateStatById = async (req, res) => {
    try {
        const updatedStatCard = await statCard_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStatCard)
            return res.status(404).json({ message: 'Stat card not found' });
        return res.json(updatedStatCard);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
exports.updateStatById = updateStatById;
const deleteStatById = async (req, res) => {
    try {
        const deletedStatCard = await statCard_1.default.findByIdAndDelete(req.params.id);
        if (!deletedStatCard)
            return res.status(404).json({ message: 'Stat card not found' });
        return res.status(204).json("stat card deleted succesfully");
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.deleteStatById = deleteStatById;
//# sourceMappingURL=statCard.js.map
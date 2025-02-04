"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTimeline = exports.updateTimeline = exports.createTimeline = exports.getTimelineById = exports.getTimelines = void 0;
const timeline_1 = __importDefault(require("../models/timeline"));
const getTimelines = async (_req, res) => {
    try {
        const timelines = await timeline_1.default.find();
        res.status(200).json(timelines);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.getTimelines = getTimelines;
const getTimelineById = async (req, res) => {
    try {
        const timeline = await timeline_1.default.findById(req.params.id);
        if (!timeline) {
            return res.status(404).json({ message: "Timeline not found" });
        }
        return res.status(200).json(timeline);
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};
exports.getTimelineById = getTimelineById;
const createTimeline = async (req, res) => {
    try {
        const { time, icon, label, user, description } = req.body;
        const newTimeline = new timeline_1.default({ time, icon, label, user, description });
        await newTimeline.save();
        res.status(201).json(newTimeline);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.createTimeline = createTimeline;
const updateTimeline = async (req, res) => {
    try {
        const updatedTimeline = await timeline_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTimeline) {
            return res.status(404).json({ message: "Timeline not found" });
        }
        return res.status(200).json(updatedTimeline);
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};
exports.updateTimeline = updateTimeline;
const deleteTimeline = async (req, res) => {
    try {
        const deletedTimeline = await timeline_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTimeline) {
            return res.status(404).json({ message: "Timeline not found" });
        }
        return res.status(200).json({ message: "Timeline deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};
exports.deleteTimeline = deleteTimeline;
//# sourceMappingURL=timeline.js.map
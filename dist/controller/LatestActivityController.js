"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getLatestActivities = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const LatestActivity_1 = __importDefault(require("../models/LatestActivity"));
exports.getLatestActivities = (0, express_async_handler_1.default)(async (_req, res) => {
    const activities = await LatestActivity_1.default.find().sort({ createdAt: -1 });
    res.status(200).json(activities);
});
exports.createActivity = (0, express_async_handler_1.default)(async (req, res) => {
    const { time, title, created_by, description, category } = req.body;
    if (!time || !title || !created_by || !description || !category) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const newActivity = new LatestActivity_1.default({
        time,
        title,
        created_by,
        description,
        category
    });
    await newActivity.save();
    res.status(201).json(newActivity);
});
exports.updateActivity = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { time, title, created_by, description, category } = req.body;
    const activity = await LatestActivity_1.default.findById(id);
    if (!activity) {
        res.status(404);
        throw new Error("Activity not found");
    }
    activity.time = time || activity.time;
    activity.title = title || activity.title;
    activity.created_by = created_by || activity.created_by;
    activity.description = description || activity.description;
    activity.category = category || activity.category;
    const updatedActivity = await activity.save();
    res.status(200).json(updatedActivity);
});
exports.deleteActivity = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const activity = await LatestActivity_1.default.findById(id);
    if (!activity) {
        res.status(404);
        throw new Error("Activity not found");
    }
    await activity.deleteOne();
    res.status(200).json({ message: "Activity deleted successfully" });
});
//# sourceMappingURL=latestActivityController.js.map
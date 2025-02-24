"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByProject = exports.postComment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectTimeline_1 = __importDefault(require("../models/projectTimeline"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
exports.postComment = (0, express_async_handler_1.default)(async (req, res) => {
    const { time, title, created_by, description, file, project } = req.body;
    if (!time || !title || !created_by || !project) {
        res.status(400);
        throw new Error("Time, title, created_by, and project are required");
    }
    const existingProject = await projectManagement_1.default.findById(project);
    if (!existingProject) {
        res.status(404);
        throw new Error("Project not found");
    }
    const comment = await projectTimeline_1.default.create({
        time,
        title,
        created_by,
        description: description || null,
        file: file || null,
        project
    });
    res.status(201).json(comment);
});
exports.getCommentsByProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { projectId } = req.params;
    const comments = await projectTimeline_1.default.find({ project: projectId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
});
//# sourceMappingURL=projectTimeline.js.map
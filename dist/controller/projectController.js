"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.updateProjectById = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const createProject = async (req, res) => {
    try {
        const { userId, ...projectData } = req.body;
        const projectManagement = new projectManagement_1.default({
            ...projectData,
            user: userId,
        });
        await projectManagement.save();
        return res.status(201).json({ success: true, data: projectManagement });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.createProject = createProject;
const getProjects = async (_req, res) => {
    try {
        const projects = await projectManagement_1.default.find().populate("user", "firstName lastName email phone_number role").lean();
        return res.status(200).json({ success: true, data: projects });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await projectManagement_1.default.findById(req.params.id)
            .populate("user", "firstName lastName email phone_number role")
            .lean();
        if (!project)
            return res.status(404).json({ error: "Entry not found" });
        return res.status(200).json({ success: true, data: project });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.getProjectById = getProjectById;
const updateProjectById = async (req, res) => {
    try {
        const { userId, ...updateData } = req.body;
        const updatedProject = await projectManagement_1.default.findByIdAndUpdate(req.params.id, { ...updateData, user: userId }, { new: true }).populate("user", "firstName lastName email phone_number role").lean();
        if (!updatedProject)
            return res.status(404).json({ error: "Entry not found" });
        return res.status(200).json({ success: true, data: updatedProject });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updateProjectById = updateProjectById;
const deleteProjectById = async (req, res) => {
    try {
        const deletedProject = await projectManagement_1.default.findByIdAndDelete(req.params.id);
        if (!deletedProject)
            return res.status(404).json({ error: "Entry not found" });
        return res.status(200).json({ success: true, message: "Entry deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deleteProjectById = deleteProjectById;
//# sourceMappingURL=projectController.js.map
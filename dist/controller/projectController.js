"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.updateProjectById = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
exports.createProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, socials } = req.body;
    let user = await user_1.default.findOne({ email });
    if (!user) {
        user = new user_1.default({ firstName, lastName, email, phone_number, username });
        await user.save();
    }
    const project = new projectManagement_1.default({
        title,
        email,
        client: user._id,
        service,
        start_date,
        end_date,
        business_size,
        price,
        country,
        description,
        socials: socials || null,
        status: "in_progress",
        status_percentage: 10,
        handled_by: []
    });
    await project.save();
    const projectObject = project.toObject();
    res.status(201).json({
        message: 'Project created successfully',
        project: {
            ...projectObject,
            project_id: project._id
        }
    });
});
exports.getAllProjects = (0, express_async_handler_1.default)(async (_req, res) => {
    const projects = await projectManagement_1.default.find().select("title email project_id createdAt service");
    res.status(200).json({ projects });
});
exports.getProjectById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const project = await projectManagement_1.default.findById(id).populate("client", "firstName lastName phone_number email");
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    res.status(200).json({ project_details: project });
});
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
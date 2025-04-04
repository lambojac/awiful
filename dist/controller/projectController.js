"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unassignStaffFromProject = exports.getProjectsByUserId = exports.assignStaffToProject = exports.deleteProjectById = exports.updateProjectById = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
exports.createProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description } = req.body;
    const serviceArray = Array.isArray(service) ? service : [service];
    let user = await user_1.default.findOne({ email });
    if (!user) {
        user = new user_1.default({ firstName, lastName, email, phone_number, username });
        await user.save();
    }
    const project = new projectManagement_1.default({
        title,
        email,
        client: user._id,
        service: serviceArray,
        start_date,
        end_date,
        business_size,
        type: "project",
        price,
        country,
        description,
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
exports.getAllProjects = (0, express_async_handler_1.default)(async (req, res) => {
    let { type } = req.query;
    if (Array.isArray(type)) {
        type = type[0];
    }
    const query = {};
    if (type === "marketing" || type === "project") {
        query.type = type;
    }
    else {
        query.type = { $in: ["marketing", "project"] };
    }
    const projects = await projectManagement_1.default.find(query)
        .select("title email project_id createdAt service type status");
    res.status(200).json({ projects });
});
exports.getProjectById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const project = await projectManagement_1.default.findById(id)
        .populate("client", "firstName lastName phone_number email");
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    res.status(200).json({ project_details: project });
});
exports.updateProjectById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { title, email, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, type, status, status_percentage, socials } = req.body;
    const project = await projectManagement_1.default.findById(id);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    if (email || firstName || lastName || phone_number) {
        const user = await user_1.default.findById(project.client);
        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.phone_number = phone_number || user.phone_number;
            await user.save();
        }
    }
    project.title = title || project.title;
    project.service = service || project.service;
    project.start_date = start_date || project.start_date;
    project.end_date = end_date || project.end_date;
    project.business_size = business_size || project.business_size;
    project.price = price || project.price;
    project.country = country || project.country;
    project.description = description || project.description;
    project.status = status || project.status;
    project.status_percentage = status_percentage || project.status_percentage;
    if (type === "marketing") {
        project.type = "marketing";
        project.socials = socials || project.socials;
    }
    else if (type === "project") {
        project.type = "project";
        project.socials = undefined;
    }
    await project.save();
    const updatedProject = await projectManagement_1.default.findById(id)
        .populate("client", "firstName lastName phone_number email")
        .lean();
    res.status(200).json({
        message: "Project updated successfully",
        project_details: updatedProject
    });
});
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
exports.assignStaffToProject = (0, express_async_handler_1.default)(async (req, res) => {
    const { projectId, userId, userName } = req.body;
    const project = await projectManagement_1.default.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    if (project.handled_by.some((user) => user.user_id.toString() === userId)) {
        res.status(400);
        throw new Error("User is already assigned to this project");
    }
    const assignmentDate = new Date();
    project.handled_by.push({
        user_id: userId,
        user_name: userName,
        assigned_date: assignmentDate
    });
    res.status(200).json({ message: "Staff assigned successfully",
        project,
        assignment: {
            userId,
            userName,
            assignedDate: assignmentDate
        } });
});
exports.getProjectsByUserId = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId } = req.params;
    const user = await user_1.default.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    let projects;
    projects = await projectManagement_1.default.find({ client: userId }).select("title email service type status createdAt");
    ;
    const staffProjects = await projectManagement_1.default.find({ "handled_by.user_id": userId }).select("title email service type status createdAt");
    ;
    projects = [...projects, ...staffProjects];
    res.status(200).json({ projects });
});
exports.unassignStaffFromProject = (0, express_async_handler_1.default)(async (req, res) => {
    const projectId = req.params.projectId;
    const userId = req.params.userId;
    if (!projectId || !userId) {
        res.status(400);
        throw new Error("Project ID and User ID are required");
    }
    const project = await projectManagement_1.default.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }
    const staffIndex = project.handled_by.findIndex((handler) => handler.user_id.toString() === userId.toString());
    if (staffIndex === -1) {
        res.status(404);
        throw new Error("User is not assigned to this project");
    }
    project.handled_by.splice(staffIndex, 1);
    await project.save();
    res.status(200).json({
        success: true,
        message: "Staff unassigned successfully",
        project
    });
});
//# sourceMappingURL=projectController.js.map
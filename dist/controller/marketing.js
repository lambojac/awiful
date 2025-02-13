"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarketingData = exports.updateMarketingData = exports.getMarketingDataById = exports.getMarketingData = exports.createMarketingData = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
exports.createMarketingData = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, socials, type } = req.body;
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
        type,
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
        message: 'Marketing created successfully',
        project: {
            ...projectObject,
            marketing: project._id
        }
    });
});
exports.getMarketingData = (0, express_async_handler_1.default)(async (_req, res) => {
    const marketing = await projectManagement_1.default.find({ type: "marketing" })
        .select("title email project_id createdAt service type");
    res.status(200).json({ marketing });
});
exports.getMarketingDataById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const project = await projectManagement_1.default.findOne({ _id: id, type: "marketing" })
        .populate("client", "firstName lastName phone_number email");
    if (!project) {
        res.status(404);
        throw new Error("Marketing project not found");
    }
    res.status(200).json({ project_details: project });
});
exports.updateMarketingData = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { title, email, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, socials, type, status, status_percentage } = req.body;
    const project = await projectManagement_1.default.findById(id);
    if (!project) {
        res.status(404);
        throw new Error("Marketing not found");
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
    project.socials = socials || project.socials;
    project.type = type || project.type;
    project.status = status || project.status;
    project.status_percentage = status_percentage || project.status_percentage;
    await project.save();
    const updatedProject = await projectManagement_1.default.findById(id)
        .populate("client", "firstName lastName phone_number email")
        .lean();
    res.status(200).json({
        message: "Marketing updated successfully",
        marketing_details: updatedProject
    });
});
const deleteMarketingData = async (req, res) => {
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
exports.deleteMarketingData = deleteMarketingData;
//# sourceMappingURL=marketing.js.map
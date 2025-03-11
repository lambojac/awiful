"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEstimateToProject = exports.updateEstimate = exports.createEstimate = exports.getEstimateById = exports.getAllEstimates = void 0;
const customerEstimate_1 = __importDefault(require("../models/customerEstimate"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../models/user"));
exports.getAllEstimates = (0, express_async_handler_1.default)(async (_req, res) => {
    const estimates = await customerEstimate_1.default.find().select('client.email createdAt request_details.service status');
    const totalRequests = estimates.length;
    const completed = estimates.filter(e => e.status === 'completed').length;
    const closed = estimates.filter(e => e.status === 'closed').length;
    const inProgress = estimates.filter(e => e.status === 'in_progress').length;
    const pending = estimates.filter(e => e.status === 'pending').length;
    const requests = estimates.map(estimate => ({
        id: estimate._id,
        email: estimate.client.email,
        date: new Date().toLocaleDateString(),
        service_requested: estimate.request_details.service,
        status: estimate.status,
        request_id: estimate.request_details.request_id
    }));
    res.status(200).json({
        summary: {
            total_requests: totalRequests,
            completed,
            closed,
            in_progress: inProgress,
            pending
        },
        requests
    });
});
exports.getEstimateById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        const estimate = await customerEstimate_1.default.findById(id);
        if (!estimate) {
            res.status(404).json({ message: 'Estimate not found' });
            return;
        }
        res.status(200).json({
            id: estimate._id,
            request_details: estimate.request_details,
            client: estimate.client,
            description: estimate.description,
            additional_services: estimate.additional_services,
            status: estimate.status
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching estimate', error });
    }
});
exports.createEstimate = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const newEstimate = new customerEstimate_1.default(req.body);
        const savedEstimate = await newEstimate.save();
        res.status(201).json({ message: 'Estimate created successfully', estimate: savedEstimate });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating estimate', error });
    }
});
exports.updateEstimate = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        const updateData = req.body;
        const updatedEstimate = await customerEstimate_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedEstimate) {
            res.status(404).json({ message: 'Estimate not found' });
            return;
        }
        const updatedObject = updatedEstimate.toObject();
        const updatedFields = Object.keys(updateData).reduce((acc, key) => {
            if (key in updatedObject) {
                acc[key] = updatedObject[key];
            }
            return acc;
        }, {});
        res.status(200).json({ message: 'Estimate updated successfully', updatedFields });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating estimate', error });
    }
});
const convertEstimateToProject = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { id } = req.params;
    const estimate = await customerEstimate_1.default.findById(id);
    if (!estimate) {
        return res.status(404).json({ message: "Estimate not found" });
    }
    const client = await user_1.default.findOne({ email: estimate.client.email });
    if (!client) {
        return res.status(400).json({ message: "Client not found" });
    }
    const projectData = {
        title: ((_a = estimate.request_details) === null || _a === void 0 ? void 0 : _a.title) || "Untitled Project",
        client: client._id,
        service: (_b = estimate.request_details) === null || _b === void 0 ? void 0 : _b.service,
        description: estimate.description || "No description provided",
        start_date: new Date(),
        end_date: ((_c = estimate.request_details) === null || _c === void 0 ? void 0 : _c.proposed_end_date) || new Date(),
        status: "in_progress",
        additional_services: estimate.additional_services || [],
        price: (_e = (_d = estimate.request_details) === null || _d === void 0 ? void 0 : _d.price) !== null && _e !== void 0 ? _e : 0,
        country: (_g = (_f = estimate.request_details) === null || _f === void 0 ? void 0 : _f.country) !== null && _g !== void 0 ? _g : "Not specified",
        business_size: (_h = estimate.request_details) === null || _h === void 0 ? void 0 : _h.business_size,
    };
    const newProject = new projectManagement_1.default(projectData);
    const savedProject = await newProject.save();
    await customerEstimate_1.default.findByIdAndDelete(id);
    return res.status(201).json({
        message: "Estimate successfully converted to project",
        project_details: savedProject
    });
};
exports.convertEstimateToProject = convertEstimateToProject;
//# sourceMappingURL=customerEstimate.js.map
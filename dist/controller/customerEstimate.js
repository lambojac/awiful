"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEstimate = exports.getEstimateById = exports.getAllEstimates = void 0;
const customerEstimate_1 = __importDefault(require("../models/customerEstimate"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
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
//# sourceMappingURL=customerEstimate.js.map
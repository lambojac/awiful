"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectAnalytics = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const getProjectAnalytics = async (_req, res) => {
    try {
        const total = await projectManagement_1.default.countDocuments({});
        const completed = await projectManagement_1.default.countDocuments({ status: "completed" });
        const inProgress = await projectManagement_1.default.countDocuments({ status: "in_progress" });
        const pending = await projectManagement_1.default.countDocuments({ status: "pending" });
        const canceled = await projectManagement_1.default.countDocuments({ status: "canceled" });
        return res.status(200).json({
            total,
            completed,
            in_progress: inProgress,
            pending,
            canceled,
        });
    }
    catch (error) {
        console.error("Error fetching project analytics:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.getProjectAnalytics = getProjectAnalytics;
//# sourceMappingURL=projectanalytics.js.map
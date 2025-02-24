"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const article_1 = __importDefault(require("../models/article"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const user_1 = __importDefault(require("../models/user"));
const customerEstimate_1 = __importDefault(require("../models/customerEstimate"));
const revenue_1 = __importDefault(require("../models/revenue"));
const getDashboardStats = async (_req, res) => {
    try {
        const articlesCount = await article_1.default.countDocuments();
        const projectsCount = await projectManagement_1.default.countDocuments();
        const usersCount = await user_1.default.countDocuments();
        const customerEstimatesCount = await customerEstimate_1.default.countDocuments();
        const totalRevenueData = await revenue_1.default.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].total : 0;
        const dashboardData = [
            { title: "Blogs/Articles", value: articlesCount },
            { title: "Projects", value: projectsCount },
            { title: "User", value: usersCount },
            { title: "Customer Estimates", value: customerEstimatesCount },
            { title: "Total Revenue", value: totalRevenue }
        ];
        res.json(dashboardData);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching dashboard stats", error });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=dashboard.js.map
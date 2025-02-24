"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestActivities = void 0;
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const article_1 = __importDefault(require("../models/article"));
const customerEstimate_1 = __importDefault(require("../models/customerEstimate"));
const getLatestActivities = async (_req, res) => {
    try {
        const projectActivities = await projectManagement_1.default.find({}, "createdAt title email description")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        const articleActivities = await article_1.default.find({}, "createdAt title author descHeading")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        const estimateActivities = await customerEstimate_1.default.find({}, "createdAt request_details.title client.first_name client.last_name description")
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();
        const activities = [
            ...projectActivities.map((item) => ({
                title: item.title || "New Project Created",
                created_by: item.email || "Unknown",
                description: item.description || "",
                category: "project",
            })),
            ...articleActivities.map((item) => ({
                title: item.title || "New Article Published",
                created_by: "Unknown",
                description: item.descHeading || "",
                category: "article",
            })),
            ...estimateActivities.map((item) => {
                var _a, _b, _c;
                return ({
                    title: ((_a = item.request_details) === null || _a === void 0 ? void 0 : _a.title) || "New Estimate Request",
                    created_by: `${(_b = item.client) === null || _b === void 0 ? void 0 : _b.first_name} ${(_c = item.client) === null || _c === void 0 ? void 0 : _c.last_name}`.trim() || "Unknown",
                    description: item.description || "",
                    category: "estimate",
                });
            }),
        ];
        res.status(200).json(activities);
    }
    catch (error) {
        console.error("Error fetching latest activities:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getLatestActivities = getLatestActivities;
//# sourceMappingURL=latest.js.map
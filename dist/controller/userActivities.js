"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userActivities = void 0;
const LatestActivity_1 = __importDefault(require("../models/LatestActivity"));
const article_1 = __importDefault(require("../models/article"));
const customerEstimate_1 = __importDefault(require("../models/customerEstimate"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const projectTimeline_1 = __importDefault(require("../models/projectTimeline"));
const userActivities = async (req, res) => {
    try {
        const { userId } = req.params;
        const latestActivities = await LatestActivity_1.default.find({ created_by: userId });
        const articles = await article_1.default.find({ created_by: userId });
        const estimates = await customerEstimate_1.default.find({ "client.email": userId });
        const projects = await projectManagement_1.default.find({ "handled_by.user_id": userId });
        const projectComments = await projectTimeline_1.default.find({ created_by: userId });
        const formattedActivities = [
            ...latestActivities.map(activity => ({
                title: activity.title,
                description: activity.description,
                type: "latestActivity",
            })),
            ...articles.map(article => ({
                title: article.title,
                description: article.title,
                timestamp: article.timestamp,
                type: "article",
            })),
            ...estimates.map(estimate => ({
                title: estimate.request_details.title,
                description: estimate.description,
                timestamp: estimate.timestamp,
                type: "estimate",
            })),
            ...projects.map(project => ({
                title: project.title,
                description: project.description,
                timestamp: project.timestamp,
                type: "project",
            })),
            ...projectComments.map(comment => ({
                title: comment.title,
                description: comment.description,
                timestamp: comment.timestamp,
                type: "comment",
            })),
        ];
        return res.status(200).json({
            success: true,
            activities: formattedActivities,
        });
    }
    catch (error) {
        console.error("Error fetching user activities:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.userActivities = userActivities;
//# sourceMappingURL=userActivities.js.map
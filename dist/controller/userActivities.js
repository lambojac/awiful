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
        const latestActivities = LatestActivity_1.default.find({ created_by: userId });
        const articles = article_1.default.find({ created_by: userId });
        const estimates = customerEstimate_1.default.find({ "client.email": userId });
        const projects = projectManagement_1.default.find({ "handled_by.user_id": userId });
        const projectComments = projectTimeline_1.default.find({ created_by: userId });
        const [activityResults, articleResults, estimateResults, projectResults, commentResults] = await Promise.all([latestActivities, articles, estimates, projects, projectComments]);
        return res.status(200).json({
            success: true,
            activities: {
                latestActivities: activityResults,
                articles: articleResults,
                estimates: estimateResults,
                projects: projectResults,
                comments: commentResults,
            },
        });
    }
    catch (error) {
        console.error("Error fetching user activities:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.userActivities = userActivities;
//# sourceMappingURL=userActivities.js.map
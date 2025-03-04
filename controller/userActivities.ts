import LatestActivity from "../models/LatestActivity";
import Article from "../models/article";
import Estimate from "../models/customerEstimate";
import ProjectManagement from "../models/projectManagement";
import ProjectComment from "../models/projectTimeline";
import { Request, Response } from "express";

// Fetch user activities across all collections
export const userActivities = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Fetch activities where the user is the creator
    const latestActivities = await LatestActivity.find({ created_by: userId });
    const articles = await Article.find({ created_by: userId });
    const estimates = await Estimate.find({ "client.email": userId });
    const projects = await ProjectManagement.find({ "handled_by.user_id": userId });
    const projectComments = await ProjectComment.find({ created_by: userId });

    // Format response data
    const formattedActivities = [
      ...latestActivities.map(activity => ({
        title: activity.title,
        description: activity.description,  // Adjust if the field name differs
        type: "latestActivity",
      })),
      ...articles.map(article => ({
        title: article.title,
        description:article.title,
        timestamp: article.timestamp,
        type: "article",
      })),
      ...estimates.map(estimate => ({
        title: estimate.request_details.title,
        description: estimate.description, // Adjust field if needed
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
        description: comment.description, // Adjust if necessary
        timestamp: comment.timestamp,
        type: "comment",
      })),
    ];

    return res.status(200).json({
      success: true,
      activities: formattedActivities,
    });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

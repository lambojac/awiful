
import LatestActivity from "../models/LatestActivity";
import Article from "../models/article";
import Estimate from "../models/customerEstimate";
import ProjectManagement from "../models/projectManagement";
import ProjectComment from "../models/projectTimeline";
import { Request, Response } from 'express';

// Fetch user activities across all collections
export const userActivities= async (req:Request, res:Response) => {
  try {
    const { userId } = req.params;

    // Fetch activities where the user is the creator
    const latestActivities = LatestActivity.find({ created_by: userId });
    const articles = Article.find({ created_by: userId }); // If user-created articles exist
    const estimates = Estimate.find({ "client.email": userId }); // If email is used as identifier
    const projects = ProjectManagement.find({ "handled_by.user_id": userId }); // If user handled projects
    const projectComments = ProjectComment.find({ created_by: userId });

    // Execute all queries concurrently
    const [activityResults, articleResults, estimateResults, projectResults, commentResults] =
      await Promise.all([latestActivities, articles, estimates, projects, projectComments]);

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
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



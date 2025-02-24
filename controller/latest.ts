import  { Request, Response } from "express";
import Project from "../models/projectManagement";
import Article from "../models/article";
import Estimate from "../models/customerEstimate";
import {LatestActivity} from "../types";


 export const getLatestActivities=async (_req: Request, res: Response) => {
  try {
    const projectActivities = await Project.find({}, "createdAt title email description")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const articleActivities = await Article.find({}, "createdAt title author descHeading")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const estimateActivities = await Estimate.find({}, "createdAt request_details.title client.first_name client.last_name description")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Format and unify data
    const activities: LatestActivity[] = [
      ...projectActivities.map((item) => ({
       // Get only time
        title: item.title || "New Project Created",
        created_by: item.email || "Unknown",
        description: item.description || "",
        category: "project",
      })),
      ...articleActivities.map((item) => ({
        
        title: item.title || "New Article Published",
        created_by:  "Unknown",
        description: item.descHeading || "",
        category: "article",
      })),
      ...estimateActivities.map((item) => ({
       
        title: item.request_details?.title || "New Estimate Request",
        created_by: `${item.client?.first_name} ${item.client?.last_name}`.trim() || "Unknown",
        description: item.description || "",
        category: "estimate",
      })),
    ];

    // Sort all activities by time in descending order
  

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching latest activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


import { Request, Response } from "express";
import Project from "../models/projectManagement"; 

export const getProjectAnalytics = async (_req: Request, res: Response) => {
  try {
    const total = await Project.countDocuments({});
    const completed = await Project.countDocuments({ status: "completed" });
    const inProgress = await Project.countDocuments({ status: "in_progress" });
    const pending = await Project.countDocuments({ status: "pending" });
    const canceled = await Project.countDocuments({ status: "canceled" });

    return res.status(200).json({
      total,
      completed,
      in_progress: inProgress,
      pending,
      canceled,
    });
  } catch (error) {
    console.error("Error fetching project analytics:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

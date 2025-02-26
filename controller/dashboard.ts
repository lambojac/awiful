import { Request, Response } from "express";
import Article from "../models/article";
import Project from "../models/projectManagement";
import User from "../models/user";
import CustomerEstimate from "../models/customerEstimate";


/**
 * @desc Get dashboard stats
 * @route GET /dashboard
 */
export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const articlesCount = await Article.countDocuments();
    const projectsCount = await Project.countDocuments();
    const usersCount = await User.countDocuments();
    const customerEstimatesCount = await CustomerEstimate.countDocuments();
    
    const paidProjects = await Project.find({ payment_status: 'paid' });
    const totalRevenue = paidProjects.reduce((sum, project) => sum + project.price, 0);

    const dashboardData = [
      { title: "Blogs/Articles", value: articlesCount },
      { title: "Projects", value: projectsCount },
      { title: "User", value: usersCount },
      { title: "Customer Estimates", value: customerEstimatesCount },
      { title: "Total Revenue", value: totalRevenue }
    ];

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

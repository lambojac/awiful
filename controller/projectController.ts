import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';
import asyncHandler from "express-async-handler";
import User from "../models/user"

// create a new
// Create Project
export const createProject = asyncHandler(async (req: Request, res: Response) => {
    const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, socials } = req.body;
  
    // Check if user exists
    let user = await User.findOne({ email });
  
    // If user doesn't exist, create new user
    if (!user) {
      user = new User({ firstName, lastName, email, phone_number,username });
      await user.save();
    }
  
    // Create project
    const project = new ProjectManagement({
      title,
      email,
      client: user._id,
      service,
      start_date,
      end_date,
      business_size,
      price,
      country,
      description,
      socials: socials || null, // Assign socials only if provided
      status: "in_progress",
      status_percentage: 10,
      handled_by: []
    });
  
    await project.save();
    const projectObject = project.toObject();

  res.status(201).json({
    message: 'Project created successfully',
    project: {
      ...projectObject,
      project_id: project._id  // Use MongoDB's _id as project_id
    }
  });
})
  
// getallproject
export const getAllProjects = asyncHandler(async (_req: Request, res: Response) => {
    const projects = await ProjectManagement.find().select("title email project_id createdAt service");
  
    res.status(200).json({ projects });
  });
  
// getprojectbyid
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Fetch project with user details populated
    const project = await ProjectManagement.findById(id).populate("client", "firstName lastName phone_number email");
  
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
  
    res.status(200).json({ project_details: project });
  });
  
// update project byid
  export const updateProjectById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, ...updateData } = req.body;
  
      const updatedProject = await ProjectManagement.findByIdAndUpdate(
        req.params.id,
        { ...updateData, user: userId }, // Ensure user reference remains intact
        { new: true }
      ).populate("user", "firstName lastName email phone_number role").lean();
  
      if (!updatedProject) return res.status(404).json({ error: "Entry not found" });
      return res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
  
// delete project
  export const deleteProjectById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedProject = await ProjectManagement.findByIdAndDelete(req.params.id);
      if (!deletedProject) return res.status(404).json({ error: "Entry not found" });
      return res.status(200).json({ success: true, message: "Entry deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
  

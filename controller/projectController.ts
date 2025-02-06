import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';
// create a new project
export const createProject = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { userId, ...projectData } = req.body; // Extract userId separately
  
      const projectManagement = new ProjectManagement({
        ...projectData,
        user: userId, // Ensure user reference is stored
      });
  
      await projectManagement.save();
      return res.status(201).json({ success: true, data: projectManagement });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  };
  
// getallproject
export const getProjects = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await ProjectManagement.find().populate("user", "firstName lastName email phone_number role").lean();
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
// getprojectbyid
export const getProjectById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const project = await ProjectManagement.findById(req.params.id)
        .populate("user", "firstName lastName email phone_number role") // Populate user details
        .lean();
  
      if (!project) return res.status(404).json({ error: "Entry not found" });
      return res.status(200).json({ success: true, data: project });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
  
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
  

import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';

export const createProject = async (req: Request, res: Response): Promise<Response> => {
  try {
    const projectManagement = new ProjectManagement(req.body);
    await projectManagement.save();
    return res.status(201).json(projectManagement);
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const getProjects = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const projects = await ProjectManagement.find();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const project = await ProjectManagement.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Entry not found' });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const updateProjectById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedProject = await ProjectManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ error: 'Entry not found' });
    return res.status(200).json(updatedProject);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteProjectById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletedProject = await ProjectManagement.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ error: 'Entry not found' });
    return res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};

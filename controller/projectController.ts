import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectManagement.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await ProjectManagement.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

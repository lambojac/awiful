import asyncHandler from 'express-async-handler';
import ProjectComment from '../models/projectTimeline';
import ProjectManagement from '../models/projectManagement';
import { Request, Response } from 'express';

export const postComment = asyncHandler(async (req: Request, res: Response) => {
  const { time, title, created_by, description, file, project } = req.body;

  // Validate required fields
  if (!time || !title || !created_by || !project) {
    res.status(400);
    throw new Error("Time, title, created_by, and project are required");
  }

  // Validate if the project ID is valid and exists
  const existingProject = await ProjectManagement.findById(project);
  if (!existingProject) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Create the comment
  const comment = await ProjectComment.create({
    time,
    title,
    created_by,
    description: description || null,
    file: file || null,
    project
  });

  res.status(201).json(comment);
});


//get req
export const getCommentsByProject = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
  
    const comments = await ProjectComment.find({ project: projectId }).sort({ createdAt: -1 });
  
    res.status(200).json(comments);
  });
  
import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';
import asyncHandler from "express-async-handler";
import User from "../models/user"

// create a new
// Create Project
export const createProject = asyncHandler(async (req: Request, res: Response) => {
    const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description, socials,type } = req.body;
  
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
      type,
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
    const projects = await ProjectManagement.find().select("title email project_id createdAt service type");
  
    res.status(200).json({ projects });
  });
  
// getprojectbyid
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Fetch project with user details populated
    const project = await ProjectManagement.findById(id).populate("client", "firstName lastName phone_number email type");
  
    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }
  
    res.status(200).json({ project_details: project });
  });
  
// update project byid
export const updateProjectById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        title,
        email,
        firstName,
        lastName,
        phone_number,
        service,
        start_date,
        end_date,
        business_size,
        price,
        country,
        description,
        socials,
        type,
        status,
        status_percentage
    } = req.body;

    // Find the project
    const project = await ProjectManagement.findById(id);

    if (!project) {
        res.status(404);
        throw new Error("Project not found");
    }

    // Update client details if provided
    if (email || firstName || lastName || phone_number) {
        const user = await User.findById(project.client);

        if (user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.phone_number = phone_number || user.phone_number;

            await user.save();
        }
    }

    // Update project details
    project.title = title || project.title;
    project.service = service || project.service;
    project.start_date = start_date || project.start_date;
    project.end_date = end_date || project.end_date;
    project.business_size = business_size || project.business_size;
    project.price = price || project.price;
    project.country = country || project.country;
    project.description = description || project.description;
    project.socials = socials || project.socials;
    project.type = type || project.type;
    project.status = status || project.status;
    project.status_percentage = status_percentage || project.status_percentage;

    await project.save();

    // Populate client details before sending the response
    const updatedProject = await ProjectManagement.findById(id)
        .populate("client", "firstName lastName phone_number email")
        .lean();

    res.status(200).json({
        message: "Project updated successfully",
        project_details: updatedProject
    });
});

  
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
  

import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';
import asyncHandler from "express-async-handler";
import User from "../models/user"

// create a new
// Create Project
export const createMarketingData = asyncHandler(async (req: Request, res: Response) => {
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
    message: 'Marketing created successfully',
    project: {
      ...projectObject,
      marketing: project._id  // Use MongoDB's _id as project_id
    }
  });
})
  
// getallproject
// Get all marketing projects
export const getMarketingData = asyncHandler(async (_req: Request, res: Response) => {
    const marketing = await ProjectManagement.find({ type: "marketing" }) // Filter for marketing
      .select("title email project_id createdAt service type");
    
    res.status(200).json({ marketing });
  });
  
  
// getprojectbyid
// Get marketing project by ID
export const getMarketingDataById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    // Fetch project with user details populated, and ensure it's marketing
    const project = await ProjectManagement.findOne({ _id: id, type: "marketing" })
      .populate("client", "firstName lastName phone_number email");
  
    if (!project) {
      res.status(404);
      throw new Error("Marketing project not found");
    }
  
    res.status(200).json({ project_details: project });
  });
  
  
// update project byid
export const updateMarketingData = asyncHandler(async (req: Request, res: Response) => {
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
        throw new Error("Marketing not found");
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
        message: "Marketing updated successfully",
        marketing_details: updatedProject
    });
});

  
// delete project
  export const deleteMarketingData= async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedProject = await ProjectManagement.findByIdAndDelete(req.params.id);
      if (!deletedProject) return res.status(404).json({ error: "Entry not found" });
      return res.status(200).json({ success: true, message: "Entry deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  };
  

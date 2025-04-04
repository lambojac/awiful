import { Request, Response } from 'express';
import ProjectManagement from '../models/projectManagement';
import asyncHandler from "express-async-handler";
import User from "../models/user"
import { UserAssignment } from '../types/index';

// Create Project

export const createProject = asyncHandler(async (req: Request, res: Response) => {
const { title, email, username, firstName, lastName, phone_number, service, start_date, end_date, business_size, price, country, description } = req.body;
  
  // Convert service to an array if it's a string
const serviceArray = Array.isArray(service) ? service : [service];
  
  // Check if user exists
   let user = await User.findOne({ email });
  
   // If user doesn't exist, create new user
 if (!user) {
   user = new User({ firstName, lastName, email, phone_number, username });
   await user.save();
  }
  
 // Create project with default type "project"
const project = new ProjectManagement({
   title,
   email,
   client: user._id,
  service: serviceArray, // Ensure service is stored as an array
   start_date,
 end_date,
business_size,
type: "project", // Default type
 price,
 country,
description,
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
   project_id: project._id// Use MongoDB's *id as project_id*
   }
   });
  });
  

  
// getallproject and marketing
export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
    let { type } = req.query;

    // If type is an array, take the first value
    if (Array.isArray(type)) {
        type = type[0];
    }

    // Build the query object
    const query: any = {};

    // If type is provided and is either 'marketing' or 'project', filter by type
    if (type === "marketing" || type === "project") {
        query.type = type;
    } else {
        // If no type is passed, get both 'marketing' and 'project'
        query.type = { $in: ["marketing", "project"] };
    }

    // Fetch projects based on the query
    const projects = await ProjectManagement.find(query)
        .select("title email project_id createdAt service type status");

    res.status(200).json({ projects });
});


  
// getprojectbyid
export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Fetch project with user details populated
    const project = await ProjectManagement.findById(id)
      .populate("client", "firstName lastName phone_number email");

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
        type,
        status,
        status_percentage,
        socials  // Social links to be added when type is "marketing"
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
    project.status = status || project.status;
    project.status_percentage = status_percentage || project.status_percentage;

    // Update type and attach socials if it's marketing
    if (type === "marketing") {
        project.type = "marketing";
        project.socials = socials || project.socials;
    } else if (type === "project") {
        project.type = "project";
        project.socials = undefined; // Remove socials if reverted to project
    }

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
  


// Assign staff to a project
export const assignStaffToProject = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, userId, userName } = req.body;

  const project = await ProjectManagement.findById(projectId);
  if (!project) {
      res.status(404);
      throw new Error("Project not found");
  }

  // Ensure user isn't already assigned
  if (project.handled_by.some((user) => user.user_id.toString() === userId)) {
      res.status(400);
      throw new Error("User is already assigned to this project");
  }

   // Add assigned date to the user assignment data
   const assignmentDate = new Date();
  project.handled_by.push({ 
    user_id: userId, 
    user_name: userName,
    assigned_date: assignmentDate 
  } as UserAssignment);
  res.status(200).json({message: "Staff assigned successfully", 
    project,
    assignment: {
      userId,
      userName,
      assignedDate: assignmentDate
    }});
});





// Get projects by userId (as staff or customer)
export const getProjectsByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
      res.status(404);
      throw new Error("User not found");
  }

  let projects;

  // If user is a customer, get projects where they are the client
  projects = await ProjectManagement.find({ client: userId }).select("title email service type status createdAt");;

  // If user is staff, also get projects where they are assigned
  const staffProjects = await ProjectManagement.find({ "handled_by.user_id": userId }).select("title email service type status createdAt");;

  projects = [...projects, ...staffProjects];

  res.status(200).json({ projects });
});

//unasign staff
export const unassignStaffFromProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId;
  const userId = req.params.userId;
  
  // Validate parameters
  if (!projectId || !userId) {
    res.status(400);
    throw new Error("Project ID and User ID are required");
  }

  const project = await ProjectManagement.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  // Check if user is assigned to the project
  // Convert ObjectIds to strings for comparison if needed
  const staffIndex = project.handled_by.findIndex(
    (handler) => handler.user_id.toString() === userId.toString()
  );
  
  if (staffIndex === -1) {
    res.status(404);
    throw new Error("User is not assigned to this project");
  }

  // Remove the user from handled_by array
  project.handled_by.splice(staffIndex, 1);
  
  // Save the updated project
  await project.save();
  
  res.status(200).json({
    success: true,
    message: "Staff unassigned successfully",
    project
  });
});



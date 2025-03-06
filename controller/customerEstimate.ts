import { Request, Response } from 'express';
import Estimate from '../models/customerEstimate';
import ProjectManagement from '../models/projectManagement'
import asyncHandler from 'express-async-handler';
import Client from "../models/user"

// Fetch all customer estimates summary
export const getAllEstimates = asyncHandler(async (_req: Request, res: Response) => {
    const estimates = await Estimate.find().select('client.email createdAt request_details.service status');
  
    const totalRequests = estimates.length;
    const completed = estimates.filter(e => e.status === 'completed').length;
    const closed = estimates.filter(e => e.status === 'closed').length;
    const inProgress = estimates.filter(e => e.status === 'in_progress').length;
    const pending = estimates.filter(e => e.status === 'pending').length;
  
    const requests = estimates.map(estimate => ({
      id: estimate._id, // Added ID
      email: estimate.client.email,
      date: new Date().toLocaleDateString(),
      service_requested: estimate.request_details.service,
      status: estimate.status,
      request_id: estimate.request_details.request_id
    }));
  
    res.status(200).json({
      summary: {
        total_requests: totalRequests,
        completed,
        closed,
        in_progress: inProgress,
        pending
      },
      requests
    });
  });
  

// Fetch customer estimate details by ID
export const getEstimateById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const estimate = await Estimate.findById(id);
      if (!estimate) {
        res.status(404).json({ message: 'Estimate not found' });
        return;
      }
  
      res.status(200).json({
        id: estimate._id, // Added ID
        request_details: estimate.request_details,
        client: estimate.client,
        description: estimate.description,
        additional_services: estimate.additional_services,
        status: estimate.status
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching estimate', error });
    }
  });
  

// Create Estimate
export const createEstimate = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newEstimate = new Estimate(req.body);
    const savedEstimate = await newEstimate.save();
     res.status(201).json({ message: 'Estimate created successfully', estimate: savedEstimate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating estimate', error });
  }
});

// Update customer estimate by ID (Partial Update)
export const updateEstimate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
      const updateData = req.body;

      // Update only provided fields
      const updatedEstimate = await Estimate.findByIdAndUpdate(id, updateData, {
          new: true,              // Return the updated document
          runValidators: true     // Ensure schema validation
      });

      if (!updatedEstimate) {
          res.status(404).json({ message: 'Estimate not found' });
          return;
      }

      // Convert the document into a plain object to avoid index signature issues
      const updatedObject = updatedEstimate.toObject();

      // Return only the updated fields
      const updatedFields = Object.keys(updateData).reduce((acc, key) => {
          if (key in updatedObject) {
              acc[key] = updatedObject[key as keyof typeof updatedObject];
          }
          return acc;
      }, {} as Record<string, any>);

      res.status(200).json({ message: 'Estimate updated successfully', updatedFields });
  } catch (error) {
      res.status(500).json({ message: 'Error updating estimate', error });
  }
});
// convert estimate to project
export const convertEstimateToProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Find the estimate by ID
  const estimate = await Estimate.findById(id);
  if (!estimate) {
    return res.status(404).json({ message: "Estimate not found" }); // ✅ Ensure return here
  }

  // Ensure the client exists in the database
  const client = await Client.findOne({ email: estimate.client.email });
  if (!client) {
    return res.status(400).json({ message: "Client not found" }); // ✅ Ensure return here
  }

  // Construct project data
  const projectData = {
    title: estimate.request_details?.title || "Untitled Project",
    client: client._id, // 🔥 Fix: Use ObjectId instead of an object
    service: estimate.request_details?.service,
    description: estimate.description || "No description provided",
    start_date: new Date(),
    end_date: estimate.request_details?.proposed_end_date || new Date(),
    status: "in_progress",
    additional_services: estimate.additional_services || [],
    price: estimate.request_details?.price ?? 0,
    country: estimate.request_details?.country ?? "Not specified",
    business_size: estimate.request_details?.business_size,
  };

     // Create and save the new project
     const newProject = new ProjectManagement(projectData);
     const savedProject = await newProject.save();
 
     // Delete the estimate after conversion
     await Estimate.findByIdAndDelete(id);
 
    return res.status(201).json({
         message: "Estimate successfully converted to project",
         project_details: savedProject
     });
}
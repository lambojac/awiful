import { Request, Response } from 'express';
import Estimate from '../models/customerEstimate';
import asyncHandler from 'express-async-handler';

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

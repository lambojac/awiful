import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import LatestActivity from "../models/LatestActivity";

// @desc    Get all latest activities
// @route   GET /api/latest-activities
// @access  Public
export const getLatestActivities = asyncHandler(async (_req: Request, res: Response) => {
  const activities = await LatestActivity.find().sort({ createdAt: -1 });
  res.status(200).json(activities);
});

// @desc    Create a new activity
// @route   POST /api/latest-activities
// @access  Public
export const createActivity = asyncHandler(async (req: Request, res: Response) => {
  const { time, title, created_by, description, category } = req.body;

  if (!time || !title || !created_by || !description || !category) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newActivity = new LatestActivity({
    time,
    title,
    created_by,
    description,
    category
  });

  await newActivity.save();
  res.status(201).json(newActivity);
});

// @desc    Update an activity
// @route   PUT /api/latest-activities/:id
// @access  Public
export const updateActivity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { time, title, created_by, description, category } = req.body;

  const activity = await LatestActivity.findById(id);
  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  activity.time = time || activity.time;
  activity.title = title || activity.title;
  activity.created_by = created_by || activity.created_by;
  activity.description = description || activity.description;
  activity.category = category || activity.category;

  const updatedActivity = await activity.save();
  res.status(200).json(updatedActivity);
});

// @desc    Delete an activity
// @route   DELETE /api/latest-activities/:id
// @access  Public
export const deleteActivity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const activity = await LatestActivity.findById(id);
  if (!activity) {
    res.status(404);
    throw new Error("Activity not found");
  }

  await activity.deleteOne();
  res.status(200).json({ message: "Activity deleted successfully" });
});

import { Request, Response } from "express";
import Timeline from "../models/timeline";

/**
 * Get all timeline entries
 */
export const getTimelines = async (_req: Request, res: Response) => {
  try {
    const timelines = await Timeline.find();
    res.status(200).json(timelines);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * Get a single timeline entry by ID
 */
export const getTimelineById = async (req: Request, res: Response) => {
  try {
    const timeline = await Timeline.findById(req.params.id);
    if (!timeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }
    return res.status(200).json(timeline);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * Create a new timeline entry
 */
export const createTimeline = async (req: Request, res: Response) => {
  try {
    const { time, icon, label, user, description } = req.body;
    const newTimeline = new Timeline({ time, icon, label, user, description });
    await newTimeline.save();
    res.status(201).json(newTimeline);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * Update a timeline entry by ID
 */
export const updateTimeline = async (req: Request, res: Response) => {
  try {
    const updatedTimeline = await Timeline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTimeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }

   return res.status(200).json(updatedTimeline);
  } catch (error) {
   return res.status(500).json({ message: "Server Error", error });
  }
};

/**
 * Delete a timeline entry by ID
 */
export const deleteTimeline = async (req: Request, res: Response) => {
  try {
    const deletedTimeline = await Timeline.findByIdAndDelete(req.params.id);
    if (!deletedTimeline) {
      return res.status(404).json({ message: "Timeline not found" });
    }
    return res.status(200).json({ message: "Timeline deleted successfully" });
  } catch (error) {
   return  res.status(500).json({ message: "Server Error", error });
  }
};


import {  Request, Response } from 'express';
import StatCard from '../models/statcard';



 export const createStatCard=async (req: Request, res: Response) => {
  try {
    const statCard = new StatCard(req.body);
    await statCard.save();
    res.status(201).json(statCard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}


export const getStatCard=async (_req: Request, res: Response) => {
  try {
    const statCards = await StatCard.find();
    res.json(statCards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export const getStatById=async (req: Request, res: Response) => {
  try {
    const statCard = await StatCard.findById(req.params.id);
    if (!statCard) return res.status(404).json({ message: 'Stat card not found' });
    return res.json(statCard);
  } catch (error: any) {
   return  res.status(500).json({ message: error.message });
  }
}


export const updateStatById=async (req: Request, res: Response) => {
  try {
    const updatedStatCard = await StatCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStatCard) return res.status(404).json({ message: 'Stat card not found' });
    return res.json(updatedStatCard);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}


export const deleteStatById=async (req: Request, res: Response) => {
  try {
    const deletedStatCard = await StatCard.findByIdAndDelete(req.params.id);
    if (!deletedStatCard) return res.status(404).json({ message: 'Stat card not found' });
    return res.status(204).json("stat card deleted succesfully");
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};



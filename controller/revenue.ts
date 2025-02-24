import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import revenue from '../models/revenue';

export const getRevenueByYear = asyncHandler(async (req: Request, res: Response) => {
  const { year } = req.params;
  if (!year || isNaN(Number(year))) {
    res.status(400).json({ message: 'Invalid year parameter' });
    return;
  }

  const revenueData = await revenue.findOne({});
  if (!revenueData) {
    res.status(404).json({ message: 'Revenue data not found' });
    return;
  }

  res.json(revenueData);
});

// revenue.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRevenueData {
  period: string;
  values: number[];
}

export interface IRevenueCard extends Document {
  title: string;
  xAxis: {
    label: string;
    values: string[];
  };
  yAxis: {
    label: string;
    unit: string;
  };
  data: IRevenueData[];
  categories: string[];
}

const RevenueSchema: Schema = new Schema({
  title: { type: String, required: true },
  xAxis: {
    label: { type: String, required: true },
    values: { type: [String], required: true }
  },
  yAxis: {
    label: { type: String, required: true },
    unit: { type: String, required: true }
  },
  data: [{
    period: { type: String, required: true },
    values: { type: [Number], required: true }
  }],
  categories: { type: [String], required: true }
});

export const RevenueModel = mongoose.model<IRevenueCard>('Revenue', RevenueSchema);

// revenue.controller.ts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { RevenueModel } from '../models/revenue.model';

export const getRevenueByYear = asyncHandler(async (req: Request, res: Response) => {
  const { year } = req.params;
  if (!year || isNaN(Number(year))) {
    res.status(400).json({ message: 'Invalid year parameter' });
    return;
  }

  const revenueData = await RevenueModel.findOne({});
  if (!revenueData) {
    res.status(404).json({ message: 'Revenue data not found' });
    return;
  }

  res.json(revenueData);
});

// revenue.routes.ts
import express from 'express';
import { getRevenueByYear } from '../controllers/revenue.controller';

const router = express.Router();

/**
 * @swagger
 * /api/revenue/{year}:
 *   get:
 *     summary: Get revenue data for a given year
 *     description: Fetch revenue breakdown by time period and categories from MongoDB.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year for which revenue data is requested.
 *     responses:
 *       200:
 *         description: Successfully retrieved revenue data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid year parameter
 *       404:
 *         description: Revenue data not found
 */
router.get('/:year', getRevenueByYear);

export default router;

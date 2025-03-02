import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ProjectManagement from '../models/projectManagement'; // Correct model import

export const getRevenueByYear = asyncHandler(async (req: Request, res: Response) => {
  const { year } = req.params;

  if (!year || isNaN(Number(year))) {
    res.status(400).json({ message: 'Invalid year parameter' });
    return;
  }

  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  try {
    const revenueByYear = await ProjectManagement.aggregate([
      {
        $match: {
          status: "in_progress", // Only include completed projects
          payment_status: "paid", // Only count paid projects
          end_date: { $gte: startDate, $lte: endDate } // Filter by year
        }
      },
      {
        $group: {
          _id: null, // No grouping by year needed
          totalRevenue: { $sum: "$price" } // Sum prices
        }
      }
    ]);

    // If no data is found, return 0 revenue
    const totalRevenue = revenueByYear.length > 0 ? revenueByYear[0].totalRevenue : 0;

    res.json({ year, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

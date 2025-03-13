import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ProjectManagement from '../models/projectManagement';

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
          status: { $in: ["in_progress", "completed"] },
          payment_status: "paid",
          end_date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$end_date" } },
          totalRevenue: { $sum: "$price" }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    const userPayments = await ProjectManagement.aggregate([
      {
        $match: {
          status: { $in: ["in_progress", "completed"] },
          payment_status: "paid",
          end_date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { userId: "$userId", username: "$username", email: "$email" },
          numberOfProjects: { $sum: 1 },
          totalAmountGenerated: { $sum: "$price" }
        }
      },
      { 
        $project: {
          userId: "$_id.userId",
          username: "$_id.username",
          email: "$_id.email",
          numberOfProjects: 1,
          totalAmountGenerated: 1,
          _id: 0
        }
      },
      { $sort: { totalAmountGenerated: -1 } }
    ]);
    // Ensure all 12 months are covered
    const monthlyRevenue = Array(12).fill(0);
    revenueByYear.forEach(entry => {
      monthlyRevenue[entry._id.month - 1] = entry.totalRevenue;
    });

    const formattedData = {
      xAxis: {
        label: "Months",
        values: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)
      },
      yAxis: {
        label: "Revenue",
        unit: "USD"
      },
      data: [{
        period: `${year}`,
        values: monthlyRevenue
      }],
    };

    const totalRevenue = revenueByYear.reduce((sum, entry) => sum + entry.totalRevenue, 0);

    res.json({ totalRevenue, year, revenue: formattedData, users: userPayments });
  } catch (error) {
    console.error("Error fetching revenue:", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

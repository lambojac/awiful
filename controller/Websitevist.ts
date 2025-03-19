import { Request, Response } from 'express';
import { ILandingVisit } from '../types/index';
import { IUserVisit } from '../types/index';
import { LandingVisit } from '../models/websiteUserAnalytics';
import { UserVisit } from '../models/websiteUserAnalytics';
import { extractIpAddress } from '../utils/ipAdress';


// Landing page analytics endpoint
export const landingPageIp = async (req: Request, res: Response) => {
  try {
    const ipAddress = extractIpAddress(req);
    
    // Record visit
    const visit: ILandingVisit = {
      ipAddress,
      timestamp: new Date(),
      userAgent: req.headers['user-agent']
    };
    
    await new LandingVisit(visit).save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking landing page visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// User analytics endpoint
export const userAnalytics = async (req: Request, res: Response) => {
  try {
    const { userId, area } = req.body;
    const ipAddress = extractIpAddress(req);
    
    if (!userId || !area) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        missing: {
          userId: !userId,
          area: !area
        }
      });
    }
    
    // Record user visit
    const visit: IUserVisit = {
      userId,
      ipAddress,
      timestamp: new Date(),
      area,
      userAgent: req.headers['user-agent']
    };
    
    await new UserVisit(visit).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error tracking user visit:', error);
   return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get unique landing page visits by day
export const landingPageVisit = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate as string) : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate as string) : new Date();
    
    const dailyVisits = await LandingVisit.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $project: {
          ipAddress: 1,
          date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }
        }
      },
      {
        $group: {
          _id: { date: '$date', ipAddress: '$ipAddress' },
        }
      },
      {
        $group: {
          _id: '$_id.date',
          uniqueVisitors: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.status(200).json(dailyVisits);
  } catch (error) {
    console.error('Error fetching daily landing page analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get unique active users by month
export const userMontlyAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate as string) : new Date(new Date().setMonth(new Date().getMonth() - 12));
    const end = endDate ? new Date(endDate as string) : new Date();
    
    const monthlyActiveUsers = await UserVisit.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end }
        }
      },
      {
        $project: {
          userId: 1,
          ipAddress: 1,
          month: { $dateToString: { format: '%Y-%m', date: '$timestamp' } }
        }
      },
      {
        $group: {
          _id: { month: '$month', ipAddress: '$ipAddress' },
          userIds: { $addToSet: '$userId' }
        }
      },
      {
        $group: {
          _id: '$_id.month',
          uniqueVisitors: { $sum: 1 },
          uniqueUserCount: { $sum: { $size: '$userIds' } }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.status(200).json(monthlyActiveUsers);
  } catch (error) {
    console.error('Error fetching monthly user analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get detailed landing page visits (with pagination)
export const getDetailedLandingPageVisit = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const start = startDate ? new Date(startDate as string) : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate as string) : new Date();
    const skip = (Number(page) - 1) * Number(limit);
    
    const visits = await LandingVisit.find({
      timestamp: { $gte: start, $lte: end }
    })
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(Number(limit));
    
    const total = await LandingVisit.countDocuments({
      timestamp: { $gte: start, $lte: end }
    });
    
    res.status(200).json({
      visits,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching landing page visit details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get detailed user visits (with pagination)
export const getDetailedUserVisit = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, userId, area, page = 1, limit = 20 } = req.query;
    
    const start = startDate ? new Date(startDate as string) : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate as string) : new Date();
    const skip = (Number(page) - 1) * Number(limit);
    
    const query: any = {
      timestamp: { $gte: start, $lte: end }
    };
    
    if (userId) query.userId = userId;
    if (area) query.area = area;
    
    const visits = await UserVisit.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await UserVisit.countDocuments(query);
    
    res.status(200).json({
      visits,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching user visit details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
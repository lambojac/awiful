"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailedUserVisit = exports.getDetailedLandingPageVisit = exports.userMontlyAnalytics = exports.landingPageVisit = exports.userAnalytics = exports.landingPageIp = void 0;
const websiteUserAnalytics_1 = require("../models/websiteUserAnalytics");
const websiteUserAnalytics_2 = require("../models/websiteUserAnalytics");
const ipAdress_1 = require("../utils/ipAdress");
const landingPageIp = async (req, res) => {
    try {
        const ipAddress = (0, ipAdress_1.extractIpAddress)(req);
        const visit = {
            ipAddress,
            timestamp: new Date(),
            userAgent: req.headers['user-agent']
        };
        await new websiteUserAnalytics_1.LandingVisit(visit).save();
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error tracking landing page visit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.landingPageIp = landingPageIp;
const userAnalytics = async (req, res) => {
    try {
        const { userId, area } = req.body;
        const ipAddress = (0, ipAdress_1.extractIpAddress)(req);
        if (!userId || !area) {
            return res.status(400).json({
                error: 'Missing required parameters',
                missing: {
                    userId: !userId,
                    area: !area
                }
            });
        }
        const visit = {
            userId,
            ipAddress,
            timestamp: new Date(),
            area,
            userAgent: req.headers['user-agent']
        };
        await new websiteUserAnalytics_2.UserVisit(visit).save();
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error tracking user visit:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.userAnalytics = userAnalytics;
const landingPageVisit = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const end = endDate ? new Date(endDate) : new Date();
        const dailyVisits = await websiteUserAnalytics_1.LandingVisit.aggregate([
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
    }
    catch (error) {
        console.error('Error fetching daily landing page analytics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.landingPageVisit = landingPageVisit;
const userMontlyAnalytics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const start = startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 12));
        const end = endDate ? new Date(endDate) : new Date();
        const monthlyActiveUsers = await websiteUserAnalytics_2.UserVisit.aggregate([
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
    }
    catch (error) {
        console.error('Error fetching monthly user analytics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.userMontlyAnalytics = userMontlyAnalytics;
const getDetailedLandingPageVisit = async (req, res) => {
    try {
        const { startDate, endDate, page = 1, limit = 20 } = req.query;
        const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const end = endDate ? new Date(endDate) : new Date();
        const skip = (Number(page) - 1) * Number(limit);
        const visits = await websiteUserAnalytics_1.LandingVisit.find({
            timestamp: { $gte: start, $lte: end }
        })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(Number(limit));
        const total = await websiteUserAnalytics_1.LandingVisit.countDocuments({
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
    }
    catch (error) {
        console.error('Error fetching landing page visit details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDetailedLandingPageVisit = getDetailedLandingPageVisit;
const getDetailedUserVisit = async (req, res) => {
    try {
        const { startDate, endDate, userId, area, page = 1, limit = 20 } = req.query;
        const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
        const end = endDate ? new Date(endDate) : new Date();
        const skip = (Number(page) - 1) * Number(limit);
        const query = {
            timestamp: { $gte: start, $lte: end }
        };
        if (userId)
            query.userId = userId;
        if (area)
            query.area = area;
        const visits = await websiteUserAnalytics_2.UserVisit.find(query)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(Number(limit));
        const total = await websiteUserAnalytics_2.UserVisit.countDocuments(query);
        res.status(200).json({
            visits,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Error fetching user visit details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDetailedUserVisit = getDetailedUserVisit;
//# sourceMappingURL=Websitevist.js.map
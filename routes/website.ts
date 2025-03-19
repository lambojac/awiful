import { getDetailedLandingPageVisit, getDetailedUserVisit, landingPageIp, landingPageVisit, userAnalytics, userMontlyAnalytics } from '../controller/Websitevist';
import express from 'express';
const router = express.Router();
/**
 * @swagger
 * /api/track/landing:
 *   post:
 *     summary: Track landing page visit
 *     description: Records a landing page visit using the visitor's IP address
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Visit successfully recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/track/landing', landingPageIp)

/**
 * @swagger
 * /api/track/user:
 *   post:
 *     summary: Track user activity
 *     description: Records a user visit with user ID and area information
 *     tags:
 *       - Analytics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - area
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               area:
 *                 type: string
 *                 description: Area of the website being visited
 *     responses:
 *       200:
 *         description: Visit successfully recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required parameters
 *                 missing:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: boolean
 *                     area:
 *                       type: boolean
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/track/user', userAnalytics)

/**
 * @swagger
 * /api/analytics/landing/daily:
 *   get:
 *     summary: Get unique landing page visits by day
 *     description: Returns a count of unique visitors per day based on IP address
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (default - 30 days ago)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (default - current date)
 *     responses:
 *       200:
 *         description: List of unique visitors by day
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Date in YYYY-MM-DD format
 *                     example: "2025-03-01"
 *                   uniqueVisitors:
 *                     type: integer
 *                     description: Number of unique IP addresses that visited that day
 *                     example: 42
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/analytics/landing/daily', landingPageVisit)

/**
 * @swagger
 * /api/analytics/users/monthly:
 *   get:
 *     summary: Get unique active users by month
 *     description: Returns monthly counts of unique visitors and registered users
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (default - 12 months ago)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (default - current date)
 *     responses:
 *       200:
 *         description: Monthly user statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Month in YYYY-MM format
 *                     example: "2025-03"
 *                   uniqueVisitors:
 *                     type: integer
 *                     description: Number of unique IP addresses
 *                     example: 250
 *                   uniqueUserCount:
 *                     type: integer
 *                     description: Number of unique registered users
 *                     example: 120
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/analytics/users/monthly', userMontlyAnalytics)

/**
 * @swagger
 * /api/analytics/landing/details:
 *   get:
 *     summary: Get detailed landing page visits
 *     description: Returns paginated detailed landing page visit records
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (default - 30 days ago)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (default - current date)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default - 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Records per page (default - 20)
 *     responses:
 *       200:
 *         description: Detailed landing page visits with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 visits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ipAddress:
 *                         type: string
 *                         example: "192.168.1.1"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-19T12:00:00Z"
 *                       userAgent:
 *                         type: string
 *                         example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 143
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     pages:
 *                       type: integer
 *                       example: 8
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/analytics/landing/details', getDetailedLandingPageVisit)

/**
 * @swagger
 * /api/analytics/users/details:
 *   get:
 *     summary: Get detailed user visits
 *     description: Returns paginated detailed user visit records with optional filtering
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (default - 30 days ago)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (default - current date)
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by specific user ID (optional)
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *         description: Filter by specific area (optional)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default - 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Records per page (default - 20)
 *     responses:
 *       200:
 *         description: Detailed user visits with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 visits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: "user123"
 *                       ipAddress:
 *                         type: string
 *                         example: "192.168.1.1"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-19T12:00:00Z"
 *                       area:
 *                         type: string
 *                         example: "dashboard"
 *                       userAgent:
 *                         type: string
 *                         example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 143
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     pages:
 *                       type: integer
 *                       example: 8
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/analytics/users/details', getDetailedUserVisit)
export default router
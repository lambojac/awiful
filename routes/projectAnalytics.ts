import express from "express";
import { getProjectAnalytics } from "../controller/projectanalytics";
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Project Analytics
 *   description: API for fetching project analytics data
 */

/**
 * @swagger
 * /project-analytics:
 *   get:
 *     summary: Get project analytics
 *     description: Fetches statistics on total, completed, in-progress, pending, and canceled projects.
 *     tags: [Project Analytics]
 *     responses:
 *       200:
 *         description: Project analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 595
 *                 completed:
 *                   type: integer
 *                   example: 475
 *                 in_progress:
 *                   type: integer
 *                   example: 56
 *                 pending:
 *                   type: integer
 *                   example: 5
 *                 canceled:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Server error
 */


router.get("/", getProjectAnalytics);

export default router;

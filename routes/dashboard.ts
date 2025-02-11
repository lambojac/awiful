import express from "express";
import { getDashboardStats } from "../controller/dashboard";
/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics API
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Fetches aggregated data for blogs, projects, users, customer estimates, and total revenue.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Blogs/Articles"
 *                   value:
 *                     type: integer
 *                     example: 1345
 *                   title:
 *                     type: string
 *                     example: "Projects"
 *                   value:
 *                     type: integer
 *                     example: 1345
 *                   title:
 *                     type: string
 *                     example: "User"
 *                   value:
 *                     type: integer
 *                     example: 13
 *                   title:
 *                     type: string
 *                     example: "Customer Estimates"
 *                   value:
 *                     type: integer
 *                     example: 13
 *                   title:
 *                     type: string
 *                     example: "Total Revenue"
 *                   value:
 *                     type: integer
 *                     example: 13
 *       500:
 *         description: Server error
 */
const router = express.Router();

router.get("/", getDashboardStats);

export default router;

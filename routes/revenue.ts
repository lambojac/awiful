import express from 'express';
import { getRevenueByYear } from '../controller/revenue';

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
import { getMarketingData,getMarketingDataById, createMarketingData,updateMarketingData,deleteMarketingData} from '../controller/marketing';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MarketingData
 *   description: API for managing marketing data
 */

/**
 * @swagger
 * /marketing:
 *   get:
 *     summary: Get all marketing data
 *     tags: [MarketingData]
 *     responses:
 *       200:
 *         description: List of all marketing data
 */
router.get('/', getMarketingData);

/**
 * @swagger
 * /marketing/{id}:
 *   get:
 *     summary: Get marketing data by ID
 *     tags: [MarketingData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Marketing data ID
 *     responses:
 *       200:
 *         description: Marketing data details
 *       404:
 *         description: Marketing data not found
 */
router.get('/:id', getMarketingDataById);

/**
 * @swagger
 * /marketing:
 *   post:
 *     summary: Create a new marketing data entry
 *     tags: [MarketingData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               project_title:
 *                 type: string
 *               service:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *               budget:
 *                 type: string
 *               business_size:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marketing data created
 */
router.post('/', createMarketingData);

/**
 * @swagger
 * /marketing/{id}:
 *   put:
 *     summary: Update a marketing data entry
 *     tags: [MarketingData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Marketing data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Marketing data updated
 *       404:
 *         description: Marketing data not found
 */
router.put('/:id', updateMarketingData);

/**
 * @swagger
 * /marketing/{id}:
 *   delete:
 *     summary: Delete a marketing data entry
 *     tags: [MarketingData]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Marketing data ID
 *     responses:
 *       200:
 *         description: Marketing data deleted successfully
 *       404:
 *         description: Marketing data not found
 */
router.delete('/:id', deleteMarketingData);

export default router;

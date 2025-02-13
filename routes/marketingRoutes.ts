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
 *     summary: Get a project by ID
 *     tags: [marketing]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: marketing ID
 *     responses:
 *       200:
 *         description: marketing retrieved successfully
 *       404:
 *         description: marketing not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getMarketingDataById);


/**
 * @swagger
 * /marketing:
 *   post:
 *     summary: Create a new marketing
 *     tags: [marketing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: marketing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "marketingcreated successfully"
 *                 project:
 *                   $ref: '#/components/schemas/marketing'
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
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

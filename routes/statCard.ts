import { createStatCard, deleteStatById, getStatById, getStatCard, updateStatById } from '../controller/statCard';
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: StatCards
 *   description: API for managing stat cards
 */

/**
 * @swagger
 * /create-stat-cards:
 *   post:
 *     summary: Create a new stat card
 *     tags: [StatCards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatCard'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/create-stat-cards',createStatCard)
/**
 * @swagger
 * /get-stat-cards:
 *   get:
 *     summary: Get all stat cards
 *     tags: [StatCards]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/get-stat-cards', getStatCard)

/**
 * @swagger
 * /get-stat-cards/{id}:
 *   get:
 *     summary: Get a single stat card by ID
 *     tags: [StatCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 */
router.get('/get-stat-cards/:id',getStatById)

/**
 * @swagger
 * /stat-cards/{id}:
 *   put:
 *     summary: Update a stat card
 *     tags: [StatCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StatCard'
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put('/update-stat-cards/:id',updateStatById)





/**
 * @swagger
 * /delete-stat-cards/{id}:
 *   delete:
 *     summary: Delete a stat card
 *     tags: [StatCards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */

router.delete('/delete-stat-cards/:id',deleteStatById)
export default router;
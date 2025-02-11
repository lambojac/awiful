import express from "express";
import { getLatestActivities, createActivity, updateActivity, deleteActivity } from "../controller/latest";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Latest Activities
 *   description: API for managing latest activities
 */

/**
 * @swagger
 * /latest-activities:
 *   get:
 *     summary: Get all latest activities
 *     tags: [Latest Activities]
 *     responses:
 *       200:
 *         description: A list of latest activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LatestActivity'
 */
router.get("/", getLatestActivities);

/**
 * @swagger
 * /latest-activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Latest Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatestActivity'
 *     responses:
 *       201:
 *         description: Activity created successfully
 *       400:
 *         description: Bad request, missing required fields
 */
router.post("/", createActivity);

/**
 * @swagger
 * /latest-activities/{id}:
 *   put:
 *     summary: Update an existing activity
 *     tags: [Latest Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LatestActivity'
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       404:
 *         description: Activity not found
 */
router.put("/:id", updateActivity);

/**
 * @swagger
 * /latest-activities/{id}:
 *   delete:
 *     summary: Delete an activity
 *     tags: [Latest Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The activity ID
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 */
router.delete("/:id", deleteActivity);

export default router;

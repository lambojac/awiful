import express from "express";
import {
  getTimelines,
  getTimelineById,
  createTimeline,
  updateTimeline,
  deleteTimeline,
} from "../controller/timeline";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Timeline:
 *       type: object
 *       required:
 *         - time
 *         - icon
 *         - label
 *         - user
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the timeline entry
 *         time:
 *           type: string
 *           description: The timestamp of the event
 *         icon:
 *           type: string
 *           description: The icon representing the event
 *         label:
 *           type: string
 *           description: The label of the event
 *         user:
 *           type: string
 *           description: The user associated with the event
 *         description:
 *           type: string
 *           description: A detailed description of the event
 *       example:
 *         id: "60d5ec49b49c4a5f8c7d92b7"
 *         time: "2024-02-04T12:30:00Z"
 *         icon: "📅"
 *         label: "Meeting"
 *         user: "John Doe"
 *         description: "Team meeting with stakeholders."
 */

/**
 * @swagger
 * /timelines:
 *   get:
 *     summary: Get all timeline entries
 *     tags: [Timelines]
 *     responses:
 *       200:
 *         description: A list of timeline entries
 */
router.get("/", getTimelines);

/**
 * @swagger
 * /timelines/{id}:
 *   get:
 *     summary: Get a timeline entry by ID
 *     tags: [Timelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the timeline entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timeline entry found
 *       404:
 *         description: Timeline entry not found
 */
router.get("/:id", getTimelineById);

/**
 * @swagger
 * /timelines:
 *   post:
 *     summary: Create a new timeline entry
 *     tags: [Timelines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Timeline'
 *     responses:
 *       201:
 *         description: Timeline entry created successfully
 */
router.post("/", createTimeline);

/**
 * @swagger
 * /timelines/{id}:
 *   put:
 *     summary: Update a timeline entry
 *     tags: [Timelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the timeline entry
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Timeline'
 *     responses:
 *       200:
 *         description: Timeline entry updated successfully
 *       404:
 *         description: Timeline entry not found
 */
router.put("/:id", updateTimeline);

/**
 * @swagger
 * /timelines/{id}:
 *   delete:
 *     summary: Delete a timeline entry
 *     tags: [Timelines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the timeline entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Timeline entry deleted successfully
 *       404:
 *         description: Timeline entry not found
 */
router.delete("/:id", deleteTimeline);

export default router;

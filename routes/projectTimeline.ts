import express from 'express';
import { postComment, getCommentsByProject } from '../controller/projectTimeline';

const router = express.Router();
/**
 * @swagger
 * /project-timeline/comments:
 *   post:
 *     summary: Create a new project comment
 *     description: Adds a new comment to a specific project by validating the project's ID first.
 *     tags: 
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *                 example: "11:32"
 *               title:
 *                 type: string
 *                 example: "Commented on project"
 *               created_by:
 *                 type: string
 *                 example: "May Padilla"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Lorem ipsum dolor sit amet."
 *               file:
 *                 type: string
 *                 nullable: true
 *                 example: "projectfile.zip"
 *               project:
 *                 type: string
 *                 description: MongoDB ObjectId of the project
 *                 example: "64e3c1d8f25e4d6f5a8f4b92"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 time:
 *                   type: string
 *                 title:
 *                   type: string
 *                 created_by:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 file:
 *                   type: string
 *                   nullable: true
 *                 project:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error - Missing required fields
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

router.post('/comments', postComment);  
/**
 * @swagger
 * /project-timeline/comments/{projectId}:
 *   get:
 *     summary: Get all comments for a specific project
 *     description: Retrieves all comments associated with the given project ID.
 *     tags: 
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: MongoDB ObjectId of the project
 *         schema:
 *           type: string
 *           example: "64e3c1d8f25e4d6f5a8f4b92"
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   time:
 *                     type: string
 *                   title:
 *                     type: string
 *                   created_by:
 *                     type: string
 *                   description:
 *                     type: string
 *                     nullable: true
 *                   file:
 *                     type: string
 *                     nullable: true
 *                   project:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Project not found or no comments available
 *       500:
 *         description: Internal server error
 */

router.get('/comments/:projectId', getCommentsByProject);

export default router;

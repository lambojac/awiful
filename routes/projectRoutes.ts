import express from 'express';
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProjectById, 
  deleteProjectById 
} from '../controller/projectController';
import Secure from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - user
 *         - project_title
 *         - service
 *         - country
 *         - start_date
 *         - end_date
 *         - price
 *         - business_size
 *         - description
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the project
 *         user:
 *           type: string
 *           description: User ID of the project owner
 *         project_title:
 *           type: string
 *           description: Title of the project
 *         service:
 *           type: string
 *           description: The type of service provided in the project
 *         country:
 *           type: string
 *           description: Country of the project
 *         start_date:
 *           type: string
 *           format: date
 *           description: Project start date
 *         end_date:
 *           type: string
 *           format: date
 *           description: Project end date
 *         price:
 *           type: string
 *           description: Price for the project
 *         business_size:
 *           type: string
 *           description: Size of the business (e.g., Small, Medium, Large)
 *         description:
 *           type: string
 *           description: Detailed project description
 *         status:
 *           type: string
 *           description: Current project status
 *       example:
 *         _id: "67a48acf140e270c6e63a831"
 *         user: "6798fcd938efc0fde951e9e7"
 *         project_title: "Website Development"
 *         service: "Full-Stack Web Development"
 *         country: "United States"
 *         start_date: "2024-08-10"
 *         end_date: "2024-09-15"
 *         price: "5000"
 *         business_size: "Medium"
 *         description: "Developing a full-stack website with authentication, database integration, and payment gateway."
 *         status: "pending"
 */

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
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
 *         description: Project created successfully
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.post('/', Secure, createProject);

/**
 * @swagger
 * /project/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects
 *       500:
 *         description: Internal server error
 */
router.get('/projects', Secure, getProjects);

/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', Secure, getProjectById);

/**
 * @swagger
 * /project/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', Secure, updateProjectById);

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Project]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', Secure, deleteProjectById);

export default router;

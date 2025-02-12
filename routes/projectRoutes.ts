import express from 'express';
import { 
  createProject, 
  getAllProjects, 
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
 *         - title
 *         - email
 *         - service
 *         - country
 *         - start_date
 *         - end_date
 *         - price
 *         - business_size
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the project
 *         title:
 *           type: string
 *           description: Title of the project
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the project owner
 *         username:
 *           type: string
 *           description: Username of the project owner
 *         firstName:
 *           type: string
 *           description: First name of the client
 *         lastName:
 *           type: string
 *           description: Last name of the client
 *         phone_number:
 *           type: string
 *           description: Phone number of the client
 *         service:
 *           type: string
 *           description: The type of service provided in the project
 *         start_date:
 *           type: string
 *           format: date
 *           description: Project start date
 *         end_date:
 *           type: string
 *           format: date
 *           description: Project end date
 *         business_size:
 *           type: string
 *           description: Size of the business (e.g., Small, Medium, Enterprise)
 *         price:
 *           type: number
 *           description: Price for the project
 *         country:
 *           type: string
 *           description: Country of the project
 *         description:
 *           type: string
 *           description: Detailed project description
 *         socials:
 *           type: object
 *           properties:
 *             instagram:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Instagram username
 *             linkedin:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: LinkedIn username
 *         status:
 *           type: string
 *           description: Current project status
 *           default: in_progress
 *         status_percentage:
 *           type: number
 *           description: Status completion percentage
 *           default: 10
 *         handled_by:
 *           type: array
 *           items:
 *             type: string
 *           description: List of users handling the project
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *         project_id:
 *           type: string
 *           description: Project ID
 *       example:
 *         title: "E-commerce Platform Development for Fashion Brand"
 *         email: "michaelk@example.com"
 *         username: "mikehh"
 *         firstName: "Michael"
 *         lastName: "Khanlie"
 *         phone_number: "+447911123456"
 *         service: "E-commerce Development"
 *         start_date: "2025-04-10"
 *         end_date: "2025-08-15"
 *         business_size: "Enterprise"
 *         price: 45000
 *         country: "United Kingdom"
 *         description: "Developing a scalable e-commerce platform with custom features for a leading fashion brand."
 *         socials:
 *           instagram:
 *             username: "michael_fashion"
 *           linkedin:
 *             username: "michael_khan"
 *         status: "in_progress"
 *         status_percentage: 10
 *         handled_by: []
 *         _id: "67ac4a2211d1be597b4992dc"
 *         createdAt: "2025-02-12T07:13:38.135Z"
 *         updatedAt: "2025-02-12T07:13:38.135Z"
 *         project_id: "67ac4a2211d1be597b4992dc"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.post('/',Secure,  createProject);

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
router.get('/projects',  getAllProjects);

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
router.get('/:id',  getProjectById);

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

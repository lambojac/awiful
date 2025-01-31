import express from 'express';
import { createProject, getProjects,getProjectById,updateProjectById,deleteProjectById} from '../controller/projectController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectManagement:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - phone_number
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the project management entry
 *         username:
 *           type: string
 *           description: The username of the project manager
 *         email:
 *           type: string
 *           description: Email of the project manager
 *         phone_number:
 *           type: string
 *           description: Phone number of the project manager
 *         role:
 *           type: string
 *           description: Role of the project manager
 *         date_created:
 *           type: string
 *           description: The date the entry was created
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         username: johndoe
 *         email: johndoe@example.com
 *         phone_number: "+1234567890"
 *         role: "Manager"
 *         date_created: "2024-01-31T12:00:00.000Z"
 */

/**
 * @swagger
 * /project/create-project:
 *   post:
 *     summary: Create a new project management entry
 *     tags: [ProjectManagement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectManagement'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/createProject', createProject);
/**
 * @swagger
 * /project/getAllProject:
 *   get:
 *     summary: Get all project management entries
 *     tags: [ProjectManagement]
 *     responses:
 *       200:
 *         description: A list of project management entries
 */
router.get('/getAllProject', getProjects);
/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Get a single project management entry by ID
 *     tags: [ProjectManagement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project management entry found
 *       404:
 *         description: Entry not found
 */
router.get('/:id',getProjectById)
/**
 * @swagger
 * /project/{id}:
 *   put:
 *     summary: Update a project management entry by ID
 *     tags: [ProjectManagement]
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
 *             $ref: '#/components/schemas/ProjectManagement'
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put("/:id",updateProjectById)
/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete a project management entry by ID
 *     tags: [ProjectManagement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

router.delete("/:id",deleteProjectById)

export default router;
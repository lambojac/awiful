import express from 'express';
import { createUser, loginUser, logOut } from '../controller/userController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - username
 *               - phone_number
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Johnff"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "1234abc$"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               username:
 *                 type: string
 *                 example: "johndoe123"
 *               date_created:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-28T12:34:56.789Z"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 example: "user"
 *               zoom_username:
 *                 type: string
 *                 example: "johndoe.zoom"
 *               skype_username:
 *                 type: string
 *                 example: "johndoe.skype"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user and return a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "1234abc$"
 *     responses:
 *       200:
 *         description: Login successful, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You are successfully logged out"
 */
router.get('/logout', logOut);

export default router;

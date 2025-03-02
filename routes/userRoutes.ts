import express from 'express';
import { createUser, getAllUsers, getUserById, loginUser, logOut, updateUser } from '../controller/userController';
import { forgotPassword, resetPassword } from '../controller/forgotPassword';
import { userActivities } from '../controller/userActivities';

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
/**
 * @swagger
 * /users/get-all-users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with selected details.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_name:
 *                     type: string
 *                     example: "Johnff Doe"
 *                   email:
 *                     type: string
 *                     example: "johndoe@example.com"
 *                   date_created:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-28"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *                   user_role:
 *                     type: string
 *                     example: "user"
 *                   user_id:
 *                     type: string
 *                     example: "6798fcd938efc0fde951e9e7"
 *       500:
 *         description: Internal server error
 */
router.get("/get-all-users",getAllUsers)

/**
 * @swagger
 * /users/{id}/get-users-by-id:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a specific user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_name:
 *                   type: string
 *                   example: "Johnff Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 date_created:
 *                   type: string
 *                   format: date
 *                   example: "2025-01-28"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 user_role:
 *                   type: string
 *                   example: "user"
 *                 user_id:
 *                   type: string
 *                   example: "6798fcd938efc0fde951e9e7"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/get-users-by-id",getUserById)
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update specific fields of a user. Only the fields provided in the request body will be updated.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number
 *     responses:
 *       200:
 *         description: Successfully updated the user (only updated fields are returned)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 firstName: "John"
 *                 email: "john.doe@example.com"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put("/:id",updateUser)
/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Request a password reset email
 *     description: Sends an email with a password reset link to the user if the email is registered.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reset email sent"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Server error
 */


router.post('/forgot-password',forgotPassword)
/**
 * @swagger
 * /users/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Allows the user to reset their password using a valid reset token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: "f3b6c8e7d9..."
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password successfully reset"
 *       400:
 *         description: Invalid or expired token, or passwords do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Server error
 */
router.post('/reset-password',resetPassword)
/**
 * @swagger
 * /user-activities/{userId}:
 *   get:
 *     summary: Fetch user activities across all collections
 *     description: Retrieves the latest activities, articles, estimates, projects, and comments associated with a specific user.
 *     tags:
 *       - User Activities
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose activities are being fetched.
 *     responses:
 *       200:
 *         description: Successfully retrieved user activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 activities:
 *                   type: object
 *                   properties:
 *                     latestActivities:
 *                       type: array
 *                       items:
 *                         type: object
 *                     articles:
 *                       type: array
 *                       items:
 *                         type: object
 *                     estimates:
 *                       type: array
 *                       items:
 *                         type: object
 *                     projects:
 *                       type: array
 *                       items:
 *                         type: object
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *       400:
 *         description: Invalid user ID format.
 *       500:
 *         description: Server error.
 */

router.get("/user-activities/:userId", userActivities)

export default router;

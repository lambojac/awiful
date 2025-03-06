import express from 'express';
import { convertEstimateToProject, createEstimate, getAllEstimates, getEstimateById, updateEstimate } from '../controller/customerEstimate';

const router = express.Router();

/**
 * @swagger
 * /estimate/create:
 *   post:
 *     summary: Create a new estimate
 *     tags: [Estimates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               request_details:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   service:
 *                     type: string
 *                   proposed_start_date:
 *                     type: string
 *                   proposed_end_date:
 *                     type: string
 *                   business_size:
 *                     type: string
 *                   budget:
 *                     type: number
 *                   country:
 *                     type: string
 *                   request_id:
 *                     type: string
 *               client:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone_number:
 *                     type: string
 *               description:
 *                 type: string
 *               additional_services:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estimate created successfully
 *       500:
 *         description: Server error
 */
router.post('/create', createEstimate);

/**
 * @swagger
 * /estimate/{id}:
 *   get:
 *     summary: Fetch estimate details by request_id
 *     tags: [Estimates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Request ID of the estimate
 *     responses:
 *       200:
 *         description: Estimate details
 *       404:
 *         description: Estimate not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getEstimateById);
/**
 * @swagger
 * /estimate:
 *   get:
 *     summary: Get all customer estimates summary
 *     tags: [Estimates]
 *     responses:
 *       200:
 *         description: Successful retrieval of all customer estimates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     total_requests:
 *                       type: integer
 *                       example: 1345
 *                     completed:
 *                       type: integer
 *                       example: 595
 *                     closed:
 *                       type: integer
 *                       example: 21
 *                     in_progress:
 *                       type: integer
 *                       example: 1220
 *                 requests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       email:
 *                         type: string
 *                         example: "username@server.com"
 *                       date:
 *                         type: string
 *                         example: "DD/MM/YYYY"
 *                       service_requested:
 *                         type: string
 *                         example: "Web Development"
 *                       status:
 *                         type: string
 *                         example: "New"
 *                       request_id:
 *                         type: string
 *                         example: "ethan6789mnbv5432lkjh"
 */
router.get("/",getAllEstimates)
/**
 * @swagger
 * /estimate/{id}:
 *   patch:
 *     summary: Partially update a customer estimate
 *     description: Update specific fields of a customer estimate using its ID. Only the updated fields will be returned.
 *     tags:
 *       - Estimates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the estimate to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "newemail@example.com"
 *               status:
 *                 type: string
 *                 enum: [in_progress, closed, completed, pending]
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Estimate updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estimate updated successfully"
 *                 updatedFields:
 *                   type: object
 *                   example:
 *                     client:
 *                       email: "newemail@example.com"
 *                     status: "completed"
 *       404:
 *         description: Estimate not found
 *       500:
 *         description: Error updating estimate
 */
router.patch('/:id', updateEstimate);
/**
 * @swagger
 * /estimate/estimates/{id}/convert:
 *   patch:
 *     summary: Convert an estimate into a project
 *     description: Converts an existing estimate into a project and deletes the original estimate.
 *     tags:
 *       - Estimates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the estimate to convert.
 *     responses:
 *       200:
 *         description: Successfully converted estimate into a project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estimate successfully converted to project"
 *                 project_details:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b6aeb9f9d8b30d8888e4b5"
 *                     title:
 *                       type: string
 *                       example: "Website Development Project"
 *                     client:
 *                       type: string
 *                       example: "60b6aeb9f9d8b30d8888e4c7"
 *                     service:
 *                       type: string
 *                       example: "Web Development"
 *                     description:
 *                       type: string
 *                       example: "A website development project"
 *                     start_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-30T10:00:00.000Z"
 *                     end_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-30T10:00:00.000Z"
 *                     status:
 *                       type: string
 *                       example: "in_progress"
 *       404:
 *         description: Estimate not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estimate not found"
 *       400:
 *         description: Client not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client not found"
 *       500:
 *         description: Server error.
 */

router.patch('/estimates/:id/convert', convertEstimateToProject);
export default router;

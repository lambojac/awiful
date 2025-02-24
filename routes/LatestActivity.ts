import express from "express";
import { getLatestActivities} from "../controller/latest";

const router = express.Router();


/**
 * @swagger
 * /latest-activity:
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
export default router;

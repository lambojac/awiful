import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controller/article";
import upload from "../middleware/multer"
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for managing articles
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of all articles
 */
router.get("/", getArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article details
 *       404:
 *         description: Article not found
 */
router.get("/:id", getArticleById);

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               title:
 *                 type: string
 *                 example: "Article Title"
 *               descHeading:
 *                 type: string
 *                 example: "Short Description Heading"
 *               desc:
 *                 type: string
 *                 example: "Full article description here..."
 *               topArticle:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Article created
 */
router.post("/", upload.single('image'), createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     summary: Update an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coverImg:
 *                 type: string
 *               title:
 *                 type: string
 *               descHeading:
 *                 type: string
 *               desc:
 *                 type: string
 *               topArticle:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Article updated
 *       404:
 *         description: Article not found
 */
router.put("/:id", updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       404:
 *         description: Article not found
 */
router.delete("/:id", deleteArticle);

export default router;

import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controller/article";
import upload from "../middleware/multer"
import Secure from '../middleware/authMiddleware'
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
router.get("/", Secure, getArticles);

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
router.get("/:id", Secure, getArticleById);

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
 *               content:
 *                 type: string
 *                 example: "Detailed article content."
 *               category:
 *                 type: string
 *                 example: "Technology"
 *               status:
 *                 type: string
 *                 example: "Published"
 *               keywords:
 *                 type: string
 *                 example: "Tech, Innovation, AI"
 *               tags:
 *                 type: string
 *                 example: "#AI #Technology #Future"
 *     responses:
 *       201:
 *         description: Article created
 */
router.post("/", Secure, upload.single('image'), createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   patch:
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
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               descHeading:
 *                 type: string
 *               desc:
 *                 type: string
 *               topArticle:
 *                 type: boolean
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               status:
 *                 type: string
 *               keywords:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated
 *       404:
 *         description: Article not found
 */
router.patch("/:id", Secure, updateArticle);

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
router.delete("/:id", Secure, deleteArticle);

export default router;

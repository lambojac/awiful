import { Request, Response } from "express";
import Article from "../models/article";



/**
 * @desc    Get all articles
 * @route   GET /api/articles
 * @access  Public
 */
export const getArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc    Get a single article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */
export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc    Create a new article
 * @route   POST /api/articles
 * @access  Public
 */
export const createArticle = async (req: Request, res: Response) => {
    try {
      const { title, descHeading, desc, topArticle } = req.body;
  
      // Extract file and convert to Base64
      const image =req.file ? req.file.buffer.toString('base64') : null;

  
      const newArticle = new Article({
        image,
        title,
        descHeading,
        desc,
        topArticle,
      });
  
      const savedArticle = await newArticle.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
/**
 * @desc    Update an article by ID
 * @route   PUT /api/articles/:id
 * @access  Public
 */
export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json(updatedArticle);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc    Delete an article by ID
 * @route   DELETE /api/articles/:id
 * @access  Public
 */
export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

   return res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
   return res.status(500).json({ message: "Server error", error });
  }
};

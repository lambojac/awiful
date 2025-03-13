import { Request, Response } from "express";
import Article from "../models/article";
import cloudinary from "../config/cloudinary";

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
// get published articles
export const getPublishedArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await Article.find({ status: "published" }); // Filter by published status
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
      const { title, descHeading, desc, topArticle,content,category,status,keywords,tags } = req.body;
  
      // Check if file is present
    if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
  
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "articles",
        resource_type: "image",
      });
  
  
      const newArticle = new Article({
        image: result.secure_url, 
        title,
        descHeading,
        desc,
        topArticle,
        content,
        category,
        status,
        keywords,
        tags
      });
  
      const savedArticle = await newArticle.save();
     return res.status(201).json(savedArticle);
    } catch (error) {
     return res.status(500).json({ message: "Server error", error });
    }
  };
  
/**
 * @desc    Update an article by ID
 * @route   PUT /api/articles/:id
 * @access  Public
 */
export const updateArticle = async (req: Request, res: Response) => {
  try {
      const { title, descHeading, desc, topArticle, content, category, status, keywords, tags } = req.body;

      // Extract file and convert to Base64 if a new file is uploaded
      const image = req.file ? req.file.buffer.toString('base64') : undefined;

      // Find the existing article
      const existingArticle = await Article.findById(req.params.id);
      if (!existingArticle) {
          return res.status(404).json({ message: "Article not found" });
      }

      // Track the updated fields
      const updatedFields: Record<string, any> = {};

      // Update fields only if they are provided in the request
      if (image) {
          existingArticle.image = image;
          updatedFields.image = image;
      }
      if (title) {
          existingArticle.title = title;
          updatedFields.title = title;
      }
      if (descHeading) {
          existingArticle.descHeading = descHeading;
          updatedFields.descHeading = descHeading;
      }
      if (desc) {
          existingArticle.desc = desc;
          updatedFields.desc = desc;
      }
      if (topArticle !== undefined) {
          existingArticle.topArticle = topArticle;
          updatedFields.topArticle = topArticle;
      }
      if (content) {
          existingArticle.content = content;
          updatedFields.content = content;
      }
      if (category) {
          existingArticle.category = category;
          updatedFields.category = category;
      }
      if (status) {
          existingArticle.status = status;
          updatedFields.status = status;
      }
      if (keywords) {
          existingArticle.keywords = keywords;
          updatedFields.keywords = keywords;
      }
      if (tags) {
          existingArticle.tags = tags;
          updatedFields.tags = tags;
      }

      // Save the updated article
      await existingArticle.save();

      return res.status(200).json(updatedFields);
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
};

/**
* @desc    Update an article by ID (partial update)
* @route   PATCH /api/articles/:id
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

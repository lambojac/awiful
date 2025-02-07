"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticleById = exports.getArticles = void 0;
const article_1 = __importDefault(require("../models/article"));
const getArticles = async (_req, res) => {
    try {
        const articles = await article_1.default.find();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getArticles = getArticles;
const getArticleById = async (req, res) => {
    try {
        const article = await article_1.default.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json(article);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.getArticleById = getArticleById;
const createArticle = async (req, res) => {
    try {
        const { title, descHeading, desc, topArticle, content, category, status, keywords, tags } = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : null;
        const newArticle = new article_1.default({
            image,
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
        res.status(201).json(savedArticle);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createArticle = createArticle;
const updateArticle = async (req, res) => {
    try {
        const { title, descHeading, desc, topArticle, content, category, status, keywords, tags } = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : undefined;
        const existingArticle = await article_1.default.findById(req.params.id);
        if (!existingArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        if (image)
            existingArticle.image = image;
        if (title)
            existingArticle.title = title;
        if (descHeading)
            existingArticle.descHeading = descHeading;
        if (desc)
            existingArticle.desc = desc;
        if (topArticle !== undefined)
            existingArticle.topArticle = topArticle;
        if (content)
            existingArticle.content = content;
        if (category)
            existingArticle.category = category;
        if (status)
            existingArticle.status = status;
        if (keywords)
            existingArticle.keywords = keywords;
        if (tags)
            existingArticle.tags = tags;
        const updatedArticle = await existingArticle.save();
        return res.status(200).json(updatedArticle);
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await article_1.default.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json({ message: "Article deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=article.js.map
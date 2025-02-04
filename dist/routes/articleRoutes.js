"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const article_1 = require("../controller/article");
const multer_1 = __importDefault(require("../middleware/multer"));
const router = express_1.default.Router();
router.get("/", article_1.getArticles);
router.get("/:id", article_1.getArticleById);
router.post("/", multer_1.default.single('image'), article_1.createArticle);
router.put("/:id", article_1.updateArticle);
router.delete("/:id", article_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=articleRoutes.js.map
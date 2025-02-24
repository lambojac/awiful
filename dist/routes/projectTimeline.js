"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectTimeline_1 = require("../controller/projectTimeline");
const router = express_1.default.Router();
router.post('/comments', projectTimeline_1.postComment);
router.get('/comments/:projectId', projectTimeline_1.getCommentsByProject);
exports.default = router;
//# sourceMappingURL=projectTimeline.js.map
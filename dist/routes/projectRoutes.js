"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controller/projectController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/createProject', authMiddleware_1.default, projectController_1.createProject);
router.get('/getAllProject', authMiddleware_1.default, projectController_1.getProjects);
router.get('/:id', authMiddleware_1.default, projectController_1.getProjectById);
router.put("/:id", authMiddleware_1.default, projectController_1.updateProjectById);
router.delete("/:id", authMiddleware_1.default, projectController_1.deleteProjectById);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map
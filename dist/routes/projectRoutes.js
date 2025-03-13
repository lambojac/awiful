"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controller/projectController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, projectController_1.createProject);
router.get('/projects', projectController_1.getAllProjects);
router.get('/:id', projectController_1.getProjectById);
router.patch('/:id', authMiddleware_1.default, projectController_1.updateProjectById);
router.delete('/:id', authMiddleware_1.default, projectController_1.deleteProjectById);
router.post('/assign-staff', projectController_1.assignStaffToProject);
router.get('/projects/:userId', authMiddleware_1.default, projectController_1.getProjectsByUserId);
router.delete('/:projectId/staff/:userId', projectController_1.unassignStaffFromProject);
exports.default = router;
//# sourceMappingURL=projectRoutes.js.map
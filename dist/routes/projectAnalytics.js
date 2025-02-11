"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_analytics_1 = require("../controller/project-analytics");
const router = express_1.default.Router();
router.get("/", project_analytics_1.getProjectAnalytics);
exports.default = router;
//# sourceMappingURL=projectAnalytics.js.map
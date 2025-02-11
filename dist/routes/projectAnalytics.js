"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectanalytics_1 = require("../controller/projectanalytics");
const router = express_1.default.Router();
router.get("/", projectanalytics_1.getProjectAnalytics);
exports.default = router;
//# sourceMappingURL=projectAnalytics.js.map
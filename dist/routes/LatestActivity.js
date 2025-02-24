"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const latest_1 = require("../controller/latest");
const router = express_1.default.Router();
router.get("/", latest_1.getLatestActivities);
exports.default = router;
//# sourceMappingURL=LatestActivity.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeline_1 = require("../controller/timeline");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/", authMiddleware_1.default, timeline_1.getTimelines);
router.get("/:id", authMiddleware_1.default, timeline_1.getTimelineById);
router.post("/", authMiddleware_1.default, timeline_1.createTimeline);
router.put("/:id", authMiddleware_1.default, timeline_1.updateTimeline);
router.delete("/:id", authMiddleware_1.default, timeline_1.deleteTimeline);
exports.default = router;
//# sourceMappingURL=timelineRoutes.js.map
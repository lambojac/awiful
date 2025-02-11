"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const latestActivityController_1 = require("../controller/latestActivityController");
const router = express_1.default.Router();
router.get("/", latestActivityController_1.getLatestActivities);
router.post("/", latestActivityController_1.createActivity);
router.put("/:id", latestActivityController_1.updateActivity);
router.delete("/:id", latestActivityController_1.deleteActivity);
exports.default = router;
//# sourceMappingURL=LatestActivity.js.map
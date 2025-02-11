"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const revenue_1 = require("../controller/revenue");
const router = express_1.default.Router();
router.get('/:year', revenue_1.getRevenueByYear);
exports.default = router;
//# sourceMappingURL=revenue.js.map
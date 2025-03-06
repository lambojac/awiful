"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerEstimate_1 = require("../controller/customerEstimate");
const router = express_1.default.Router();
router.post('/create', customerEstimate_1.createEstimate);
router.get('/:id', customerEstimate_1.getEstimateById);
router.get("/", customerEstimate_1.getAllEstimates);
router.patch('/:id', customerEstimate_1.updateEstimate);
router.patch('/estimates/:id/convert', customerEstimate_1.convertEstimateToProject);
exports.default = router;
//# sourceMappingURL=customerEstimate.js.map
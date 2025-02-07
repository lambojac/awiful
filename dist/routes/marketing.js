"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marketing_1 = require("../controller/marketing");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', marketing_1.getMarketingData);
router.get('/:id', marketing_1.getMarketingDataById);
router.post('/', marketing_1.createMarketingData);
router.put('/:id', marketing_1.updateMarketingData);
router.delete('/:id', marketing_1.deleteMarketingData);
exports.default = router;
//# sourceMappingURL=marketing.js.map
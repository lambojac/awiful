"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statCard_1 = require("../controller/statCard");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/create-stat-cards', statCard_1.createStatCard);
router.get('/get-stat-cards', statCard_1.getStatCard);
router.get('/get-stat-cards/:id', statCard_1.getStatById);
router.put('/update-stat-cards/:id', statCard_1.updateStatById);
router.delete('/delete-stat-cards/:id', statCard_1.deleteStatById);
exports.default = router;
//# sourceMappingURL=statCard.js.map
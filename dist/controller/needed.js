"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenueByYear = exports.RevenueModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RevenueSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    xAxis: {
        label: { type: String, required: true },
        values: { type: [String], required: true }
    },
    yAxis: {
        label: { type: String, required: true },
        unit: { type: String, required: true }
    },
    data: [{
            period: { type: String, required: true },
            values: { type: [Number], required: true }
        }],
    categories: { type: [String], required: true }
});
exports.RevenueModel = mongoose_1.default.model('Revenue', RevenueSchema);
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const revenue_model_1 = require("../models/revenue.model");
exports.getRevenueByYear = (0, express_async_handler_1.default)(async (req, res) => {
    const { year } = req.params;
    if (!year || isNaN(Number(year))) {
        res.status(400).json({ message: 'Invalid year parameter' });
        return;
    }
    const revenueData = await exports.RevenueModel.findOne({});
    if (!revenueData) {
        res.status(404).json({ message: 'Revenue data not found' });
        return;
    }
    res.json(revenueData);
});
const express_1 = __importDefault(require("express"));
const revenue_controller_1 = require("../controllers/revenue.controller");
const router = express_1.default.Router();
router.get('/:year', exports.getRevenueByYear);
exports.default = router;
//# sourceMappingURL=needed.js.map
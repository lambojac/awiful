"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenueByYear = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const revenue_1 = __importDefault(require("../models/revenue"));
exports.getRevenueByYear = (0, express_async_handler_1.default)(async (req, res) => {
    const { year } = req.params;
    if (!year || isNaN(Number(year))) {
        res.status(400).json({ message: 'Invalid year parameter' });
        return;
    }
    const revenueData = await revenue_1.default.findOne({});
    if (!revenueData) {
        res.status(404).json({ message: 'Revenue data not found' });
        return;
    }
    res.json(revenueData);
});
//# sourceMappingURL=revenue.js.map
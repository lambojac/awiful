"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRevenueByYear = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
exports.getRevenueByYear = (0, express_async_handler_1.default)(async (req, res) => {
    const { year } = req.params;
    if (!year || isNaN(Number(year))) {
        res.status(400).json({ message: 'Invalid year parameter' });
        return;
    }
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    try {
        const revenueByYear = await projectManagement_1.default.aggregate([
            {
                $match: {
                    status: "in_progress",
                    payment_status: "paid",
                    end_date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$price" }
                }
            }
        ]);
        const totalRevenue = revenueByYear.length > 0 ? revenueByYear[0].totalRevenue : 0;
        res.json({ year, totalRevenue });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
//# sourceMappingURL=revenue.js.map
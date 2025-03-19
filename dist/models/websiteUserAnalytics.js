"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVisit = exports.LandingVisit = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LandingVisitSchema = new mongoose_1.default.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    userAgent: String
});
const UserVisitSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true, index: true },
    macAddress: { type: String, required: true, index: true },
    timestamp: { type: Date, default: Date.now },
    area: { type: String, required: true },
    ipAddress: String,
    userAgent: String
});
exports.LandingVisit = mongoose_1.default.model('LandingVisit', LandingVisitSchema);
exports.UserVisit = mongoose_1.default.model('UserVisit', UserVisitSchema);
//# sourceMappingURL=websiteUserAnalytics.js.map
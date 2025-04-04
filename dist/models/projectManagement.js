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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userAssignmentSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    assigned_date: {
        type: Date,
        default: Date.now
    }
});
const ProjectManagementSchema = new mongoose_1.Schema({
    title: { type: String, },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", },
    email: { type: String, },
    type: { type: String, enum: ["project", "marketing"], default: "project" },
    client: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    business_size: { type: String, required: true },
    service: { type: [String], required: true },
    price: { type: Number, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    socials: { type: mongoose_1.Schema.Types.Mixed, default: null },
    status: { type: String, enum: ["pending", "in_progress", "completed", "canceled"], default: "in_progress" },
    status_percentage: { type: Number, default: 10 },
    handled_by: [userAssignmentSchema],
    payment_status: {
        type: String,
        enum: ["pending", "processing", "paid", "failed"],
        default: "pending"
    },
    stripe_payment_intent_id: { type: String },
    stripe_client_secret: { type: String },
    revenue: {
        xAxis: {
            label: { type: String, default: "Months" },
            values: { type: [String], default: [] }
        },
        yAxis: {
            label: { type: String, default: "Revenue" },
            unit: { type: String, default: "USD" }
        },
        data: [{
                period: { type: String, required: true },
                values: { type: [Number], default: [] }
            }],
        categories: { type: [String], default: [] }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('ProjectManagement', ProjectManagementSchema);
//# sourceMappingURL=projectManagement.js.map
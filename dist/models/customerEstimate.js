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
const EstimateSchema = new mongoose_1.Schema({
    request_details: {
        title: { type: String, required: true },
        service: { type: String, required: true },
        proposed_start_date: { type: String, required: true },
        proposed_end_date: { type: String, required: true },
        business_size: { type: String, required: true },
        budget: { type: Number, required: true },
        country: { type: String, required: true },
        request_id: { type: String, required: true, unique: true }
    },
    client: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        phone_number: { type: String, required: true }
    },
    description: { type: String, required: true },
    additional_services: { type: [String], required: true },
    role: {
        type: String,
        enum: ["in_progress", "closed", "completed"],
        default: "in_progress"
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Estimate', EstimateSchema);
//# sourceMappingURL=customerEstimate.js.map
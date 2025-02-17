"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("../controller/stripe"));
const router = (0, express_1.Router)();
router.post('/create-payment-intent', stripe_1.default.createPaymentIntent);
router.post('/webhook', stripe_1.default.handleWebhook);
router.get('/payment-status/:projectId', stripe_1.default.getPaymentStatus);
exports.default = router;
//# sourceMappingURL=stripe.js.map
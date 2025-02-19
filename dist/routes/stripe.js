"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("../controller/stripe"));
const router = (0, express_1.Router)();
router.post('/checkout', stripe_1.default.createCheckoutSession);
router.get('/complete', stripe_1.default.completePayment);
router.get('/payment-status/:projectId', stripe_1.default.getPaymentStatus);
router.get('/cancel', stripe_1.default.cancelPayment);
exports.default = router;
//# sourceMappingURL=stripe.js.map
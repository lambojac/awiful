"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const stripe_1 = __importDefault(require("stripe"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
class StripeController {
    constructor() {
        this.createPaymentIntent = (0, express_async_handler_1.default)(async (req, res) => {
            const { amount, projectId, metadata } = req.body;
            try {
                const paymentIntent = await this.stripe.paymentIntents.create({
                    amount: Math.round(amount * 100),
                    currency: 'usd',
                    metadata: {
                        project_id: projectId,
                        ...metadata
                    },
                });
                await projectManagement_1.default.findByIdAndUpdate(projectId, {
                    stripe_payment_intent_id: paymentIntent.id,
                    stripe_client_secret: paymentIntent.client_secret,
                    payment_status: 'pending'
                });
                res.status(200).json({
                    clientSecret: paymentIntent.client_secret
                });
            }
            catch (error) {
                res.status(400).json({
                    error: error instanceof Error ? error.message : 'Error creating payment intent'
                });
            }
        });
        this.handleWebhook = (0, express_async_handler_1.default)(async (req, res) => {
            const sig = req.headers['stripe-signature'];
            try {
                const event = this.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
                switch (event.type) {
                    case 'payment_intent.succeeded':
                        await this.handleSuccessfulPayment(event.data.object);
                        break;
                    case 'payment_intent.payment_failed':
                        await this.handleFailedPayment(event.data.object);
                        break;
                    default:
                        console.log(`Unhandled event type ${event.type}`);
                }
                res.json({ received: true });
            }
            catch (err) {
                res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            }
        });
        this.getPaymentStatus = (0, express_async_handler_1.default)(async (req, res) => {
            const { projectId } = req.params;
            const project = await projectManagement_1.default.findById(projectId)
                .select('payment_status stripe_payment_intent_id');
            if (!project) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }
            if (project.stripe_payment_intent_id) {
                const paymentIntent = await this.stripe.paymentIntents.retrieve(project.stripe_payment_intent_id);
                res.json({
                    payment_status: project.payment_status,
                    stripe_status: paymentIntent.status
                });
            }
        });
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {});
    }
    async handleSuccessfulPayment(paymentIntent) {
        await projectManagement_1.default.findOneAndUpdate({ stripe_payment_intent_id: paymentIntent.id }, {
            payment_status: "paid",
            status: "in_progress",
            status_percentage: 10
        });
    }
    async handleFailedPayment(paymentIntent) {
        await projectManagement_1.default.findOneAndUpdate({ stripe_payment_intent_id: paymentIntent.id }, {
            payment_status: "failed",
            status: "canceled"
        });
    }
}
exports.default = new StripeController();
//# sourceMappingURL=stripe.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const stripe_1 = __importDefault(require("stripe"));
const projectManagement_1 = __importDefault(require("../models/projectManagement"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class StripeController {
    constructor() {
        this.createCheckoutSession = (0, express_async_handler_1.default)(async (req, res) => {
            const { projectId } = req.body;
            const project = await projectManagement_1.default.findById(projectId);
            if (!project) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }
            try {
                const session = await this.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: { name: project.title },
                                unit_amount: project.price * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    success_url: `https://awifulabs.vercel.app/payment-successful?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.BASE_URL}/api/stripe/cancel`,
                    metadata: { project_id: projectId },
                });
                await projectManagement_1.default.findByIdAndUpdate(projectId, {
                    stripe_payment_intent_id: session.id,
                    payment_status: 'pending',
                });
                res.json({ url: session.url });
            }
            catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error creating checkout session' });
            }
        });
        this.completePayment = (0, express_async_handler_1.default)(async (req, res) => {
            const { session_id } = req.query;
            if (!session_id) {
                res.status(400).json({ error: 'Session ID is required' });
                return;
            }
            try {
                const session = await this.stripe.checkout.sessions.retrieve(session_id);
                if (session.payment_status !== 'paid') {
                    res.status(400).json({ error: 'Payment not completed' });
                    return;
                }
                await projectManagement_1.default.findOneAndUpdate({ stripe_payment_intent_id: session.id }, {
                    payment_status: 'paid',
                    status: 'in_progress',
                    status_percentage: 10
                });
                res.send('Payment successful! Your project is now in progress.');
            }
            catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error completing payment' });
            }
        });
        this.cancelPayment = (0, express_async_handler_1.default)(async (_req, res) => {
            res.send('Payment was canceled.');
        });
        this.getPaymentStatus = (0, express_async_handler_1.default)(async (req, res) => {
            const { projectId } = req.params;
            const project = await projectManagement_1.default.findById(projectId).select('payment_status stripe_payment_intent_id');
            if (!project) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }
            let stripeStatus = null;
            if (project.stripe_payment_intent_id) {
                const session = await this.stripe.checkout.sessions.retrieve(project.stripe_payment_intent_id);
                stripeStatus = session.payment_status;
            }
            res.json({
                payment_status: project.payment_status,
                stripe_status: stripeStatus,
            });
        });
        this.sendPaymentLink = (0, express_async_handler_1.default)(async (req, res) => {
            const { projectId, email } = req.params;
            if (!projectId || !email) {
                res.status(400).json({ error: 'Project ID and email are required' });
                return;
            }
            const project = await projectManagement_1.default.findById(projectId);
            if (!project) {
                res.status(404).json({ error: 'Project not found' });
                return;
            }
            try {
                const session = await this.stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: { name: project.title },
                                unit_amount: project.price * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    success_url: `${process.env.BASE_URL}/api/stripe/complete?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.BASE_URL}/api/stripe/cancel`,
                    metadata: { project_id: projectId },
                });
                await projectManagement_1.default.findByIdAndUpdate(projectId, {
                    stripe_payment_intent_id: session.id,
                    payment_status: 'pending',
                });
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SMTP_EMAIL,
                        pass: process.env.SMTP_PASSWORD,
                    },
                });
                const mailOptions = {
                    from: process.env.SMTP_EMAIL,
                    to: email,
                    subject: 'Payment Link for Your Project',
                    html: `
        <h1>Complete Your Payment</h1>
        <p>Hello,</p>
        <p>Please click the link below to complete your payment for the project: <strong>${project.title}</strong></p>
        <a href="${session.url}" style="padding: 10px 15px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Pay Now</a>
        <p>If you have any questions, feel free to contact us.</p>
        <p>Thank you!</p>
      `,
                };
                await transporter.sendMail(mailOptions);
                res.json({ message: 'Payment link sent successfully', url: session.url });
            }
            catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error sending payment link' });
            }
        });
        this.calculateTotalRevenue = (0, express_async_handler_1.default)(async (_req, res) => {
            try {
                const paidProjects = await projectManagement_1.default.find({ payment_status: 'paid' });
                const totalRevenue = paidProjects.reduce((sum, project) => sum + project.price, 0);
                res.json({ totalRevenue });
            }
            catch (error) {
                res.status(500).json({ error: error instanceof Error ? error.message : 'Error calculating total revenue' });
            }
        });
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {});
    }
}
exports.default = new StripeController();
//# sourceMappingURL=stripe.js.map
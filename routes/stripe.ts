// src/routes/stripeRoutes.ts
import { Router } from 'express';
import StripeController from '../controller/stripe';

const router = Router();

/**
 * @swagger
 * /stripe/checkout:
 *   post:
 *     summary: Create a new Stripe Checkout session
 *     description: Creates a Stripe Checkout session for processing a payment for the specified project.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: The ID of the project to be paid for.
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: The URL to redirect the user to the Stripe Checkout page.
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error creating checkout session
 */

router.post('/checkout', StripeController.createCheckoutSession);

/**
 * @swagger
 * /stripe/complete:
 *   get:
 *     summary: Handle successful Stripe payment
 *     description: Confirms a successful Stripe payment using the session ID.
 *     parameters:
 *       - name: session_id
 *         in: query
 *         required: true
 *         description: The Stripe checkout session ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment completed successfully
 *       400:
 *         description: Invalid session ID
 *       404:
 *         description: Session not found
 */
router.get('/complete', StripeController.completePayment);

/**
 * @swagger
 * /stripe/payment-status/{projectId}:
 *   get:
 *     summary: Get payment status from Stripe
 *     description: Fetches the latest payment status of a project from Stripe.
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns payment status and Stripe session status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payment_status:
 *                   type: string
 *                   description: The stored payment status of the project.
 *                 stripe_status:
 *                   type: string
 *                   description: The latest payment status retrieved from Stripe.
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error retrieving payment status
 */
router.get('/payment-status/:projectId', StripeController.getPaymentStatus);
/**
 * @swagger
 * /stripe/cancel:
 *   get:
 *     summary: Handle payment cancellation
 *     description: Redirects users when they cancel a Stripe checkout session before completion.
 *     responses:
 *       200:
 *         description: Payment cancellation acknowledged
 */

router.get('/cancel', StripeController.cancelPayment);
/**
 * @swagger
 * /stripe/send-payment-link/{projectId}/{email}:
 *   get:
 *     summary: Send a payment link to the user's email.
 *     description: Generates a Stripe checkout session for a project and emails the payment link using Gmail SMTP.
 *     tags: 
 *       - Stripe
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The ID of the project to be paid for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email address where the payment link will be sent.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Payment link sent successfully
 *                 url:
 *                   type: string
 *                   example: https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6
 *       400:
 *         description: Missing or invalid parameters.
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/send-payment-link/:projectId/:email', StripeController.sendPaymentLink);

export default router;

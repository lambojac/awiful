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

export default router;

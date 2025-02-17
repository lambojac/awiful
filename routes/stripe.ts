// src/routes/stripeRoutes.ts
import { Router } from 'express';
import StripeController from '../controller/stripe';

const router = Router();

/**
 * @swagger
 * /stripe/create-payment-intent:
 *   post:
 *     summary: Create a new Stripe payment intent
 *     description: Creates a payment intent for the specified project.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to be charged in USD.
 *               projectId:
 *                 type: string
 *                 description: ID of the project for which the payment is being made.
 *               metadata:
 *                 type: object
 *                 additionalProperties: true
 *                 description: Additional metadata for the payment.
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: The client secret to be used on the frontend for completing payment.
 *       400:
 *         description: Error creating payment intent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/create-payment-intent', StripeController.createPaymentIntent);

/**
 * @swagger
 * /stripe/webhook:
 *   post:
 *     summary: Handle Stripe webhook events
 *     description: Processes incoming Stripe webhook events such as payment intent success or failure.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The webhook payload from Stripe.
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Error processing webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/webhook', StripeController.handleWebhook);

/**
 * @swagger
 * /stripe/payment-status/{projectId}:
 *   get:
 *     summary: Get the payment status of a project
 *     description: Fetches the current payment status and Stripe status of the given project.
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The ID of the project.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns payment status and Stripe payment intent status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payment_status:
 *                   type: string
 *                   description: Current payment status of the project.
 *                 stripe_status:
 *                   type: string
 *                   description: The Stripe payment status.
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.get('/payment-status/:projectId', StripeController.getPaymentStatus);

export default router;

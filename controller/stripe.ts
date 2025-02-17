
import { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import Stripe from 'stripe';
import ProjectManagement from '../models/projectManagement';

class StripeController {
  private stripe: Stripe;
 
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    });
  }

  createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
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

      await ProjectManagement.findByIdAndUpdate(projectId, {
        stripe_payment_intent_id: paymentIntent.id,
        stripe_client_secret: paymentIntent.client_secret,
        payment_status: 'pending'
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Error creating payment intent'
      });
    }
  });

  handleWebhook = asyncHandler(async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handleSuccessfulPayment(event.data.object as Stripe.PaymentIntent);
          break;
          
        case 'payment_intent.payment_failed':
          await this.handleFailedPayment(event.data.object as Stripe.PaymentIntent);
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  });

  getPaymentStatus = asyncHandler(async (req: Request, res: Response) : Promise<void> => {
    const { projectId } = req.params;

    const project = await ProjectManagement.findById(projectId)
      .select('payment_status stripe_payment_intent_id');

    if (!project) {
       res.status(404).json({ error: 'Project not found' });
       return;
    }

    if (project.stripe_payment_intent_id) {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        project.stripe_payment_intent_id
      );

      res.json({
        payment_status: project.payment_status,
        stripe_status: paymentIntent.status
      });
    }

    // res.json({
    //   payment_status: project.payment_status,
    //   stripe_status: null
    // });
  });

  private async handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
    await ProjectManagement.findOneAndUpdate(
      { stripe_payment_intent_id: paymentIntent.id },
      { 
        payment_status: "paid",
        status: "in_progress",
        status_percentage: 10
      }
    );
  }

  private async handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
    await ProjectManagement.findOneAndUpdate(
      { stripe_payment_intent_id: paymentIntent.id },
      { 
        payment_status: "failed",
        status: "canceled"
      }
    );
  }
}

export default new StripeController();
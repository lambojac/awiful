import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import ProjectManagement from '../models/projectManagement';


class StripeController {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      
    });
  }

  // Create a Checkout Session
  createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.body;

    const project = await ProjectManagement.findById(projectId);
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

      // Store session ID in the database
      await ProjectManagement.findByIdAndUpdate(projectId, {
        stripe_payment_intent_id: session.id,
        payment_status: 'pending',
      });

      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Error creating checkout session' });
    }
  });

  // Complete Payment (Handle after successful checkout)
  completePayment = asyncHandler(async (req: Request, res: Response) => {
    const { session_id } = req.query;
    
    if (!session_id) {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }

    try {
      const session = await this.stripe.checkout.sessions.retrieve(session_id as string);

      if (session.payment_status !== 'paid') {
        res.status(400).json({ error: 'Payment not completed' });
        return;
      }

      await ProjectManagement.findOneAndUpdate(
        { stripe_payment_intent_id: session.id },
        { 
          payment_status: 'paid',
          status: 'in_progress',
          status_percentage: 10
        }
      );

      res.send('Payment successful! Your project is now in progress.');
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Error completing payment' });
    }
  });

  // Handle Payment Cancellation
  cancelPayment = asyncHandler(async (_req: Request, res: Response) => {
    res.send('Payment was canceled.');
  });



  // Get Payment Status
  getPaymentStatus = asyncHandler(async (req: Request, res: Response) => {
    const { projectId } = req.params;
    
    const project = await ProjectManagement.findById(projectId).select('payment_status stripe_payment_intent_id');
    
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
}
//   

export default new StripeController();

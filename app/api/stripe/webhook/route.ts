import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const requestHeaders = new Headers(request.headers);
  const signature = request.headers.get("Stripe-Signature") as string;

  if (!body) {
    return new Response("Stripe Webhook event not found", { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return new Response("Stripe Webhook secret not set", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe Webhook error", error);
    return new Response("Stripe Webhook error", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed", session);
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent succeeded", paymentIntent);
        break;
      case "payment_intent.processing":
        const paymentIntentProcessing = event.data
          .object as Stripe.PaymentIntent;
        console.log("Payment intent processing", paymentIntentProcessing);
        break;
      case "payment_intent.requires_action":
        const paymentIntentRequiresAction = event.data
          .object as Stripe.PaymentIntent;
        console.log(
          "Payment intent requires action",
          paymentIntentRequiresAction
        );
        break;
      case "payment_intent.canceled":
        const paymentIntentCanceled = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent canceled", paymentIntentCanceled);
        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent created", paymentIntentCreated);
        break;
      case "payment_intent.amount_capturable_updated":
        const paymentIntentAmountCapturableUpdated = event.data
          .object as Stripe.PaymentIntent;
        console.log(
          "Payment intent amount capturable updated",
          paymentIntentAmountCapturableUpdated
        );
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.log("Payment intent failed", paymentIntentFailed);
        break;
      case "customer.created":
        const customerCreated = event.data.object as Stripe.Customer;
        console.log("Customer created", customerCreated);
        break;
      case "customer.updated":
        const customerUpdated = event.data.object as Stripe.Customer;
        console.log("Customer updated", customerUpdated);
        break;
      case "customer.deleted":
        const customerDeleted = event.data.object as Stripe.Customer;
        console.log("Customer deleted", customerDeleted);
        break;
      case "invoice.created":
        const invoiceCreated = event.data.object as Stripe.Invoice;
        console.log("Invoice created", invoiceCreated);
        break;
      case "invoice.updated":
        const invoiceUpdated = event.data.object as Stripe.Invoice;
        console.log("Invoice updated", invoiceUpdated);
        break;
      case "invoice.payment_succeeded":
        const invoicePaymentSucceeded = event.data.object as Stripe.Invoice;
        console.log("Invoice payment succeeded", invoicePaymentSucceeded);
        break;
      case "invoice.payment_failed":
        const invoicePaymentFailed = event.data.object as Stripe.Invoice;
        console.log("Invoice payment failed", invoicePaymentFailed);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Stripe Webhook event error", error);
    return new Response("Stripe Webhook event error", { status: 400 });
  }

  return new Response("Stripe Webhook is active", { status: 200 });
}

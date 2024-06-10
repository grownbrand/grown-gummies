import Stripe from "stripe";
import { NextRequest } from "next/server";

import { handleProductCreated, handleProductUpdated } from "@/db/products";

export async function POST(request: NextRequest) {
  const body = await request.text();
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
        console.log("[WEBHOOK] :: Checkout session completed", session);
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("[WEBHOOK] :: Payment intent succeeded", paymentIntent);
        break;
      case "payment_intent.processing":
        const paymentIntentProcessing = event.data
          .object as Stripe.PaymentIntent;
        console.log(
          "[WEBHOOK] :: Payment intent processing",
          paymentIntentProcessing
        );
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
        console.log(
          "[WEBHOOK] :: Payment intent canceled",
          paymentIntentCanceled
        );
        break;
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object as Stripe.PaymentIntent;
        console.log(
          "[WEBHOOK] :: Payment intent created",
          paymentIntentCreated
        );
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
        console.log("[WEBHOOK] :: Payment intent failed", paymentIntentFailed);
        break;
      case "customer.created":
        const customerCreated = event.data.object as Stripe.Customer;
        console.log("[WEBHOOK] :: Customer created", customerCreated);
        break;
      case "customer.updated":
        const customerUpdated = event.data.object as Stripe.Customer;
        console.log("[WEBHOOK] :: Customer updated", customerUpdated);
        break;
      case "customer.deleted":
        const customerDeleted = event.data.object as Stripe.Customer;
        console.log("[WEBHOOK] :: Customer deleted", customerDeleted);
        break;
      case "product.created":
        const productCreated = event.data.object as Stripe.Product;
        console.log("[WEBHOOK] :: Product created", productCreated);
        handleProductCreated(productCreated);
        break;
      case "product.updated":
        const productUpdated = event.data.object as Stripe.Product;
        console.log("[WEBHOOK] :: Product updated", productUpdated);
        handleProductUpdated(productUpdated);
        break;
      case "product.deleted":
        const productDeleted = event.data.object as Stripe.Product;
        console.log("[WEBHOOK] :: Product deleted", productDeleted);
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

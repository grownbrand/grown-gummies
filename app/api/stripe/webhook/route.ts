import Stripe from "stripe";
import { NextRequest } from "next/server";

import {
  handleProductCreated,
  handleProductDeleted,
  handleProductUpdated,
} from "@/db/products";
import { stripe } from "@/utils/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  if (!body) {
    return new Response("Stripe Webhook event not found", { status: 400 });
  }

  if (!webhookSecret) {
    return new Response("Stripe Webhook secret not set", { status: 400 });
  }

  if (!signature) {
    return new Response("Stripe Webhook signature not found", { status: 400 });
  }

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
    );
  } catch (error: any) {
    console.error(`Error :: `, error);
    return new Response(`Stripe Webhook error :: ${error.message}`, {
      status: 400,
    });
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
        await handleProductCreated(productCreated);
        console.log("[WEBHOOK] :: Product created", productCreated);
        break;
      case "product.updated":
        const productUpdated = event.data.object as Stripe.Product;
        await handleProductUpdated(productUpdated);
        console.log("[WEBHOOK] :: Product updated", productUpdated);
        break;
      case "product.deleted":
        const productDeleted = event.data.object as Stripe.Product;
        await handleProductDeleted(productDeleted);
        console.log("[WEBHOOK] :: Product deleted", productDeleted);
        break;
      case "price.created":
        const priceCreated = event.data.object as Stripe.Price;
        console.log("[WEBHOOK] :: Price created", priceCreated);
        break;
      case "price.updated":
        const priceUpdated = event.data.object as Stripe.Price;
        console.log("[WEBHOOK] :: Price updated", priceUpdated);
        break;
      case "price.deleted":
        const priceDeleted = event.data.object as Stripe.Price;
        console.log("[WEBHOOK] :: Price deleted", priceDeleted);
        break;
      default:
        console.log(`Unhandled event type :: ${event.type}`);
    }
  } catch (error) {
    console.error("Stripe Webhook event error", error);
    return new Response("Stripe Webhook event error", { status: 400 });
  }

  return new Response("Stripe Webhook is active", { status: 200 });
}

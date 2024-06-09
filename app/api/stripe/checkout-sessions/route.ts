import { streamToJson } from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  const body = await streamToJson(req.body as ReadableStream);
  const { cartItems, hasSubscription } = body;

  if (!cartItems)
    return NextResponse.json(
      { error: "Cart items not found" },
      { status: 400 }
    );

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: cartItems,
      mode: hasSubscription ? "subscription" : "payment",
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      customer_creation: "always",
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json(
      { clientSecret: session.client_secret },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Stripe Subscription Error:", err);
    return NextResponse.json(
      { error: err, message: err.raw.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  try {
    // get search params
    const rawSessionId = req.url.split("?")[1];
    const sessionId = rawSessionId.split("=")[1];

    // check if session ID exists
    if (!sessionId) {
      return Response.json({ error: "Session ID not found" }, { status: 400 });
    }

    // retrieve session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // return session status and customer email
    return Response.json(
      { status: session.status, customer: session.customer_details },
      { status: 200 }
    );
  } catch (err: any) {
    // handle error
    return Response.json(
      { error: err, message: err.raw.message },
      { status: 500 }
    );
  }
}

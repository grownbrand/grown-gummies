"use client";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Page() {
  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    return await fetch("/api/stripe/checkout-sessions", {
      method: "POST",
      body: JSON.stringify({
        cartItems: [
          {
            price: "price_1PP8RUB1dRDO2Cm9pOhM3qQS",
            quantity: 1,
          },
        ],
        hasSubscription: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.clientSecret;
      })
      .catch((err) => {
        console.error(err);
        return err.message;
      });
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

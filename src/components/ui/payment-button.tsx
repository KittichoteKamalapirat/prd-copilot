"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function PaymentButton({ amount }: { amount: number }) {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe failed to load");

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: amount,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const { sessionId } = await response.json();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return <Button onClick={handlePayment}>Pay ${amount}</Button>;
}

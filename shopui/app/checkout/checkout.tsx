"use client";

import { Button } from "@mui/material";
import checkoutAction from "./actions/checkout";

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  const handleCheckout = async () => {
    try {
      const session = await checkoutAction(productId);
      console.log("Session response:", session);
      if (session.error) {
        console.error("Checkout error:", session.error);
        alert("Failed to create checkout session: " + session.error);
        return;
      }
      if (session.data?.url) {
        window.location.href = session.data.url;
      } else {
        console.error("No URL in session:", session);
        alert("Failed to get checkout URL");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("An error occurred during checkout");
    }
  };

  return (
    <Button variant="contained" className="max-w-[25%]" onClick={handleCheckout}>
      Buy Now
    </Button>
  );
}

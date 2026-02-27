"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import BoltIcon from "@mui/icons-material/Bolt";
import { useCart, toCartItem } from "@/app/cart/cart-context";
import checkoutAction from "@/app/checkout/actions/checkout";
import type { Product } from "../interfaces/product.interface";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { add, remove, isInCart, openDrawer } = useCart();
  const inCart = isInCart(product.id);
  const [buyLoading, setBuyLoading] = useState(false);
  const [buyError, setBuyError] = useState("");

  if (product.sold) {
    return (
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: "text.disabled",
          fontStyle: "italic",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 1,
          px: 2,
          py: 1.5,
          display: "inline-block",
        }}
      >
        This item has been sold
      </Typography>
    );
  }

  const handleCartToggle = () => {
    if (inCart) {
      remove(product.id);
    } else {
      add(toCartItem(product));
    }
  };

  const handleBuyNow = async () => {
    setBuyLoading(true);
    setBuyError("");
    try {
      const session = await checkoutAction([product.id]);
      if (session.error) {
        setBuyError(session.error);
        return;
      }
      if (session.data?.url) {
        window.location.href = session.data.url;
      } else {
        setBuyError("Could not start checkout. Please try again.");
      }
    } catch {
      setBuyError("Checkout failed. Please try again.");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <Stack spacing={1.5} sx={{ mt: 2 }}>
      <Stack direction="row" spacing={1.5}>
        <Button
          variant={inCart ? "outlined" : "contained"}
          size="large"
          startIcon={
            inCart ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />
          }
          onClick={handleCartToggle}
          sx={{ flex: 1 }}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>

        {inCart && (
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={openDrawer}
            sx={{ flex: 1 }}
          >
            View Cart
          </Button>
        )}
      </Stack>

      <Button
        variant="outlined"
        size="large"
        startIcon={
          buyLoading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <BoltIcon />
          )
        }
        onClick={handleBuyNow}
        disabled={buyLoading}
        fullWidth
        color="inherit"
        sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.12)" }}
      >
        {buyLoading ? "Redirecting…" : "Buy Now"}
      </Button>

      {buyError && (
        <Typography variant="body2" color="error">
          {buyError}
        </Typography>
      )}
    </Stack>
  );
}

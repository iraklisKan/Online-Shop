"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useState } from "react";
import { useCart } from "./cart-context";
import checkoutAction from "../checkout/actions/checkout";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, total, remove, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!items.length) return;
    setLoading(true);
    setError("");
    try {
      const session = await checkoutAction(items.map((i) => i.id));
      if (session.error) {
        setError(session.error);
        return;
      }
      if (session.data?.url) {
        clear();
        window.location.href = session.data.url;
      } else {
        setError("Could not get checkout URL. Please try again.");
      }
    } catch {
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: { xs: "100vw", sm: 400 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.paper",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Cart{items.length > 0 ? ` (${items.length})` : ""}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {items.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
                color: "text.secondary",
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 56, opacity: 0.25 }} />
              <Typography variant="body1">Your cart is empty</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {items.map((item, idx) => (
                <Box key={item.id}>
                  <ListItem
                    sx={{ px: 3, py: 2 }}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => remove(item.id)}
                        sx={{ color: "text.secondary" }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <Stack spacing={0.5} sx={{ pr: 4, flex: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.light", fontWeight: 700 }}
                      >
                        €{item.price.toFixed(2)}
                      </Typography>
                    </Stack>
                  </ListItem>
                  {idx < items.length - 1 && (
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.04)" }} />
                  )}
                </Box>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box
            sx={{
              px: 3,
              py: 3,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                €{total.toFixed(2)}
              </Typography>
            </Box>

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCheckout}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
                ) : undefined
              }
            >
              {loading ? "Redirecting…" : `Checkout · €${total.toFixed(2)}`}
            </Button>

            <Button
              variant="text"
              size="small"
              color="inherit"
              onClick={clear}
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              Clear cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

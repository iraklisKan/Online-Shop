"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { Product as IProduct } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect } from "react";
import { API_URL } from "../common/constants/api";
import { io } from "socket.io-client";
import revalidateProducts from "./actions/revalidate-products";

interface ProductsGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  useEffect(() => {
    const socket = io(API_URL!);
    socket.on("productUpdated", () => {
      revalidateProducts();
    });
    return () => {
      socket?.disconnect();
    };
  }, []);
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          {products.length} {products.length === 1 ? "item" : "items"} available
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

"use server";

import { Suspense } from "react";
import getProducts from "./actions/get-products";
import ProductsGrid from "./products-grid";
import type { Category } from "./interfaces/product.interface";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface ProductsProps {
  search?: string;
  categoryId?: number;
  categories: Category[];
}

export default async function Products({ search, categoryId, categories }: ProductsProps) {
  const products = await getProducts(search, categoryId);
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      }
    >
      <ProductsGrid products={products ?? []} categories={categories} />
    </Suspense>
  );
}

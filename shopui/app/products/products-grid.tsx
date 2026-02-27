"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import type { Product as IProduct, Category } from "./interfaces/product.interface";
import Product from "./product";
import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "../common/constants/api";
import { io, Socket } from "socket.io-client";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authentication";

interface ProductsGridProps {
  products: IProduct[];
  categories: Category[] | undefined;
}

export default function ProductsGrid({ products, categories }: ProductsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const currentCategoryId = searchParams.get("categoryId") ?? "";

  useEffect(() => {
    let socket: Socket;
    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });
      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  const updateParams = useCallback(
    (search: string, categoryId: string) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (categoryId) params.set("categoryId", categoryId);
      router.push(`/?${params.toString()}`);
    },
    [router],
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Products
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          {products.length} {products.length === 1 ? "item" : "items"} available
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        placeholder="Search products…"
        size="small"
        defaultValue={currentSearch}
        onChange={(e) => updateParams(e.target.value, currentCategoryId)}
        sx={{ mb: 2, width: { xs: "100%", sm: 320 } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Category filter */}
      {!!categories?.length && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          <Chip
            label="All"
            onClick={() => updateParams(currentSearch, "")}
            variant={!currentCategoryId ? "filled" : "outlined"}
            color={!currentCategoryId ? "primary" : "default"}
          />
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.name}
              onClick={() =>
                updateParams(
                  currentSearch,
                  currentCategoryId === cat.id.toString() ? "" : cat.id.toString(),
                )
              }
              variant={currentCategoryId === cat.id.toString() ? "filled" : "outlined"}
              color={currentCategoryId === cat.id.toString() ? "primary" : "default"}
            />
          ))}
        </Box>
      )}

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

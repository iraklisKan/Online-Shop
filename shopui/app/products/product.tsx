"use client"

import { Card, CardActionArea, Box, Typography, Chip } from "@mui/material";
import { Product as Iproduct } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./product-image";
import { useRouter } from "next/navigation";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

interface ProductProps {
  product: Iproduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          borderColor: "rgba(124, 77, 255, 0.3)",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <CardActionArea
        onClick={() => router.push(`/products/${product.id}`)}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/* Image container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            overflow: "hidden",
          }}
        >
          {product.imageExists ? (
            <Image
              src={getProductImage(product.id)}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
              loading="eager"
              unoptimized
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "text.secondary",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 48, opacity: 0.3 }} />
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexGrow: 1,
            }}
          >
            {product.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "primary.light",
              mt: 0.5,
            }}
          >
            ${product.price}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

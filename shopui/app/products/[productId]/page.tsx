import getProduct from "./get-product";
import { Grid, Stack, Typography, Box, Chip, Divider, Button } from "@mui/material";
import Image from "next/image";
import { getProductImage } from "../product-image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Checkout from "@/app/checkout/checkout";

interface SingleProductProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = await params;
  const product = await getProduct(+productId);
  return (
    <Box>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 4,
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          Back to Products
        </Button>
      </Link>

      <Grid container spacing={6} alignItems="flex-start">
        {/* Image section - only show if image exists */}
        {product.imageExists && (
          <Grid size={{ md: 6, xs: 12 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <Image
                src={getProductImage(product.id)}
                alt={product.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
                unoptimized
              />
            </Box>
          </Grid>
        )}

        {/* Product info */}
        <Grid size={{ md: product.imageExists ? 6 : 12, xs: 12 }}>
          <Stack gap={3}>
            <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {product.name}
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "primary.light" }}
            >
              ${product.price}
            </Typography>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)" }} />

            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: 1.5, mb: 1, display: "block" }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {product.description}
              </Typography>
              <Checkout productId={product.id}></Checkout>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

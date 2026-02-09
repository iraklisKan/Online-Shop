import getProduct from "./get-product";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { getProductImage } from "../product-image";

interface SingleProductProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const { productId } = await params;
  const product = await getProduct(+productId);
  return (
    <Grid container marginBottom="2rem" rowGap={3}>
      {product.imageExists && (
        <Grid size={{ md: 6, xs: 12 }}>
          <Image
            src={getProductImage(product.id)}
            alt="Picture of the product"
            width={0}
            height={0}
            className="w-full sm:w-3/4 h-auto"
            sizes="100vw"
            unoptimized
          />
        </Grid>
      )}
      <Grid size={{ md: 6, xs: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

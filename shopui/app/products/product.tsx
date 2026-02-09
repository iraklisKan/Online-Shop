"use client"

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as Iproduct } from "./interfaces/product.interface";
import Image from "next/image";
import { getProductImage } from "./product-image";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: Iproduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  return (
    <CardActionArea onClick={()=> router.push(`/products/${product.id}`)}>
    <Card className="p-4">
      <Stack gap={3}>
        <Typography variant="h4">{product.name}</Typography>
        {product.imageExists && (
          <Image
            src={getProductImage(product.id)}
            alt="Picture of the product"
            width={400}
            height={300}
            className="w-full h-auto"
            unoptimized
          />
        )}
        <Typography>{product.description}</Typography>
        <Typography>${product.price}</Typography>
      </Stack>
    </Card>
    </CardActionArea>
  );
}

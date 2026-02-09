
import { get } from "http";
import CreateProductFab from "./products/create-product/create-product-fab";
import getProducts from "./products/actions/get-products";
import Products from "./products/products";

export default async function Home() {
  const products= await getProducts();
  return (
    <>
      <Products/>
      <CreateProductFab/>
      </>
  );
}

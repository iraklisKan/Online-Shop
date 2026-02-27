"use server";

import { get } from "../../common/util/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts(search?: string, categoryId?: number) {
  const params = new URLSearchParams({ status: "available" });
  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", categoryId.toString());
  return get<Product[]>("products", ["products"], params);
}

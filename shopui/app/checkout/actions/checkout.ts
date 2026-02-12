
"use server";
import { postJson } from "@/app/common/util/fetch";

export default async function checkout(productId: number) {
  return postJson("checkout/session", { productId });
}

"use server";
import { postJson } from "@/app/common/util/fetch";

export default async function checkoutAction(productIds: number[]) {
  return postJson("checkout/session", { productIds });
}

"use server";

import { getHeaders, postJson } from "../../common/util/fetch";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import { revalidatePath } from "next/cache";
import { API_URL } from "@/app/common/constants/api";


export default async function createProduct(
  formData: FormData,
): Promise<FormResponse> {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
  };
  
  const response = await postJson("products", data);

  // Upload product image if provided and product was created successfully
  const productImage = formData.get("image");
  if (productImage instanceof File && !response.error && response.data?.id) {
    await uploadProductImage(response.data.id, productImage);
  }

  // Revalidate the home page to show the new product
  if (!response.error) {
    revalidatePath("/");
  }

  return response;
}

async function uploadProductImage(productId: number, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/products/${productId}/image`, {
    method: "POST",
    body: formData,
    headers: await getHeaders(),
  });
}

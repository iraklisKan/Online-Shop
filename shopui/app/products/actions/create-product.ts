"use server";

import { postJson } from "../../common/util/fetch";
import { FormResponse } from "../../common/interfaces/form-response.interface";

export default async function createProduct(formData: FormData): Promise<FormResponse> {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
  };
  return postJson("products", data);
}
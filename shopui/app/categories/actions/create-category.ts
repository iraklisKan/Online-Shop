"use server";

import { postJson } from "../../common/util/fetch";
import { revalidatePath } from "next/cache";

export default async function createCategory(name: string) {
  const response = await postJson("categories", { name });
  if (!response.error) {
    revalidatePath("/categories");
  }
  return response;
}

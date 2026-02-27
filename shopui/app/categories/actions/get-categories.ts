"use server";

import { get } from "../../common/util/fetch";
import { Category } from "../../products/interfaces/product.interface";

export default async function getCategories() {
  return get<Category[]>("categories", ["categories"]);
}

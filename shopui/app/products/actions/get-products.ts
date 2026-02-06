"use server"

import { get } from "../../common/util/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts() {
    return get<Product[]>("products");
}
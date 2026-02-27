"use server";

import { get } from "../../common/util/fetch";

interface Order {
  id: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
  };
}

export default async function getMyOrders() {
  return get<Order[]>("orders/my", ["orders"]);
}

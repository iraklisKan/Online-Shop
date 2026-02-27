"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from "react";
import type { Product } from "../products/interfaces/product.interface";

// Minimal cart item — only what we need to display and check out
export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageExists?: boolean;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (item: CartItem) => void;
  remove: (id: number) => void;
  clear: () => void;
  isInCart: (id: number) => boolean;
}

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD":
      if (state.some((i) => i.id === action.item.id)) return state;
      return [...state, action.item];
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    case "HYDRATE":
      return action.items;
    default:
      return state;
  }
}

const CART_STORAGE_KEY = "shoppy_cart_v1";

export const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  total: 0,
  drawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  add: () => {},
  remove: () => {},
  clear: () => {},
  isInCart: () => false,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hydrate from localStorage on first render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        dispatch({ type: "HYDRATE", items: JSON.parse(stored) });
      }
    } catch {
      // corrupted storage — start fresh
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback(
    (item: CartItem) => dispatch({ type: "ADD", item }),
    [],
  );
  const remove = useCallback(
    (id: number) => dispatch({ type: "REMOVE", id }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const isInCart = useCallback(
    (id: number) => items.some((i) => i.id === id),
    [items],
  );
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartContext.Provider
      value={{ items, count: items.length, total, add, remove, clear, isInCart, drawerOpen, openDrawer, closeDrawer }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

/** Convenience helper to build a CartItem from a full Product */
export const toCartItem = (product: Product): CartItem => ({
  id: product.id,
  name: product.name,
  price: product.price,
  imageExists: product.imageExists,
});

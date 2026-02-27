export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sold?: boolean;
  imageExists?: boolean;
  categoryId?: number | null;
  category?: Category | null;
}

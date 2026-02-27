import CreateProductFab from "./products/create-product/create-product-fab";
import Products from "./products/products";
import getCategories from "./categories/actions/get-categories";

interface HomePageProps {
  searchParams?: Promise<{ search?: string; categoryId?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const categories = await getCategories();
  return (
    <>
      <Products
        search={params?.search}
        categoryId={params?.categoryId ? Number(params.categoryId) : undefined}
        categories={categories ?? []}
      />
      <CreateProductFab categories={categories ?? []} />
    </>
  );
}

import getCategories from "./actions/get-categories";
import CategoriesPageWrapper from "./categories-content";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoriesPageWrapper categories={categories ?? []} />;
}

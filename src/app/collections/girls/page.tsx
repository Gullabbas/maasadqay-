import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Girls Collection (2–14 Years) | Co-ord Sets, Pajamas & Bottoms",
  description:
    "Delightful floral co-ord sets, lawn pajama suits, and breezy summer bottoms for girls aged 2 to 14. Cash on Delivery across Pakistan.",
};

export default async function GirlsCollectionPage() {
  const products = await productRepository.getProductsByCategory("girls");
  const category = CATEGORIES.find((c) => c.slug === "girls");

  return (
    <CollectionPageLayout
      title="Girls Collection"
      description="Charming floral prints, breathable cotton lawns, and playful silhouettes designed for every little princess. Sizes 2 to 14 Years."
      categorySlug="girls"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Boys Collection (2–14 Years) | Eastern Wear, Co-ords & Shirts",
  description:
    "Explore our distinguished boys collection: Eastern kurta pajamas, embroidered waistcoats, prince coats, and breathable co-ord sets. Nationwide Cash on Delivery.",
};

export default async function BoysCollectionPage() {
  const products = await productRepository.getProductsByCategory("boys");
  const category = CATEGORIES.find((c) => c.slug === "boys");

  return (
    <CollectionPageLayout
      title="Boys Collection"
      description="From royal Eastern festive wear for weddings and Eid to soft daily co-ords designed for boundless adventure. Sizes 2 to 14 Years."
      categorySlug="boys"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Women Essentials | Thermal Gloves, Cozy Socks & Accessories",
  description:
    "Comfort essentials thoughtfully curated for mothers on the go. Touchscreen gloves, thermal socks, and winter warmth.",
};

export default async function WomenCollectionPage() {
  const products = await productRepository.getProductsByCategory("women");
  const category = CATEGORIES.find((c) => c.slug === "women");

  return (
    <CollectionPageLayout
      title="Women Essentials"
      description="Cozy winter gloves and soft everyday essentials created for the wonderful mothers who care for everything."
      categorySlug="women"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

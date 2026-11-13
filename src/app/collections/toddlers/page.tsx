import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Toddlers Range (6–24 Months) | Gentle Organic Cotton Baby Suits",
  description:
    "Ultra-soft organic cotton rompers, flat-lock seam pajama suits, and tender daily basics for babies and toddlers aged 6 to 24 months. Lahore, Pakistan.",
};

export default async function ToddlersCollectionPage() {
  const products = await productRepository.getProductsByCategory("toddlers");
  const category = CATEGORIES.find((c) => c.slug === "toddlers");

  return (
    <CollectionPageLayout
      title="Toddlers Range (6–24 Months)"
      description="Created especially for sensitive newborn and toddler skin. Tag-less necklines, nickel-free snap buttons, and organic stretch fabrics that move with your baby."
      categorySlug="toddlers"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Kids Accessories | Shawls, Socks, Caps & Bow Ties",
  description:
    "Complete the look with ceremonial boys shawls, non-slip cotton socks, cozy beanies, and festive bow ties. Maa Sadqay Lahore.",
};

export default async function AccessoriesCollectionPage() {
  const products = await productRepository.getProductsByCategory("accessories");
  const category = CATEGORIES.find((c) => c.slug === "accessories");

  return (
    <CollectionPageLayout
      title="Kids Accessories"
      description="The final charming details: festive embroidered shawls for kurtas, organic anti-slip socks, caps, and suspenders for little gentlemen and ladies."
      categorySlug="accessories"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Clearance Sale | Up to 60% Off Kids Clothing Under Rs 999",
  description:
    "Massive clearance bargains on premium kids clothes! Shop tees, co-ord sets, rompers and accessories under Rs. 999, 799, and 599.",
};

export default async function SaleCollectionPage() {
  const products = await productRepository.getSaleProducts();
  const category = CATEGORIES.find((c) => c.slug === "sale");

  return (
    <CollectionPageLayout
      title="Clearance Sale"
      description="Incredible savings on last-chance pieces! Up to 60% off select Eastern wear, co-ords, and accessories with nationwide Cash on Delivery."
      categorySlug="sale"
      subCollections={category?.subCollections}
      products={products}
    />
  );
}

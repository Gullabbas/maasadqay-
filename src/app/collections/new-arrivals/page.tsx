import { Metadata } from "next";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository } from "@/data/catalog";

export const metadata: Metadata = {
  title: "New Arrivals 2027 | Latest Kids Eastern & Co-ord Outfits",
  description:
    "Discover the freshest drops at Maa Sadqay: newly designed kurta pajamas, prince coats, and airy summer sets. Delivered nationwide.",
};

export default async function NewArrivalsPage() {
  const products = await productRepository.getNewArrivals();

  return (
    <CollectionPageLayout
      title="New Arrivals"
      description="The newest expressions of motherly love. Handcrafted in Lahore with pure breathable lawn and cotton for the current season."
      categorySlug="new-arrivals"
      products={products}
    />
  );
}

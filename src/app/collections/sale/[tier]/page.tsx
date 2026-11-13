import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

type Props = {
  params: Promise<{ tier: string }>;
};

export function generateStaticParams() {
  const category = CATEGORIES.find((c) => c.slug === "sale");
  return category?.subCollections.map((s) => ({ tier: s.slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tier } = await params;
  const label = tier.replace("under-", "Under Rs. ");
  return {
    title: `Clearance Deals ${label} | Maa Sadqay Sale`,
    description: `Shop genuine clearance kids clothing ${label}. Limited sizes available with nationwide Cash on Delivery.`,
  };
}

export default async function SaleTierPage({ params }: Props) {
  const { tier } = await params;
  const category = CATEGORIES.find((c) => c.slug === "sale");
  const subCat = category?.subCollections.find((s) => s.slug === tier);

  if (!subCat) {
    notFound();
  }

  const products = await productRepository.getSaleProducts(tier);

  return (
    <CollectionPageLayout
      title={`Clearance: ${subCat.name}`}
      description={`Special budget-friendly clearance items priced ${subCat.name}. Grab yours before remaining sizes sell out!`}
      categorySlug="sale"
      subCollections={category?.subCollections}
      activeSubCollection={tier}
      products={products}
    />
  );
}

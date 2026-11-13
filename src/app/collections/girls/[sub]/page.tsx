import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

type Props = {
  params: Promise<{ sub: string }>;
};

export function generateStaticParams() {
  const category = CATEGORIES.find((c) => c.slug === "girls");
  return category?.subCollections.map((s) => ({ sub: s.slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "girls");
  const subCat = category?.subCollections.find((s) => s.slug === sub);
  const name = subCat ? subCat.name : sub.replace("-", " ");

  return {
    title: `Girls ${name} | Maa Sadqay Kids Wear`,
    description: `Shop charming girls ${name}. 100% breathable fabrics, comfortable fit, nationwide Cash on Delivery.`,
  };
}

export default async function GirlsSubCollectionPage({ params }: Props) {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "girls");
  const subCat = category?.subCollections.find((s) => s.slug === sub);

  if (!subCat) {
    notFound();
  }

  const products = await productRepository.getProductsByCategory("girls", sub);

  return (
    <CollectionPageLayout
      title={`Girls ${subCat.name}`}
      description={`Pretty and comfortable ${subCat.name} made with motherly love. Flat Rs. 250 shipping nationwide.`}
      categorySlug="girls"
      subCollections={category?.subCollections}
      activeSubCollection={sub}
      products={products}
    />
  );
}

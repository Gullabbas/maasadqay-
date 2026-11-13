import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

type Props = {
  params: Promise<{ sub: string }>;
};

export function generateStaticParams() {
  const category = CATEGORIES.find((c) => c.slug === "accessories");
  return category?.subCollections.map((s) => ({ sub: s.slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const name = sub.replace("-", " ");
  return {
    title: `Kids ${name} | Maa Sadqay`,
    description: `Shop kids ${name}. Handcrafted accessories with Cash on Delivery nationwide.`,
  };
}

export default async function AccessoriesSubCollectionPage({ params }: Props) {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "accessories");
  const subCat = category?.subCollections.find((s) => s.slug === sub);

  if (!subCat) {
    notFound();
  }

  const products = await productRepository.getProductsByCategory("accessories", sub);

  return (
    <CollectionPageLayout
      title={`Kids ${subCat.name}`}
      description={`Finishing touches crafted with love. Fast 3-5 days delivery nationwide.`}
      categorySlug="accessories"
      subCollections={category?.subCollections}
      activeSubCollection={sub}
      products={products}
    />
  );
}

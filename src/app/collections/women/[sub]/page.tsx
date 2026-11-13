import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

type Props = {
  params: Promise<{ sub: string }>;
};

export function generateStaticParams() {
  const category = CATEGORIES.find((c) => c.slug === "women");
  return category?.subCollections.map((s) => ({ sub: s.slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const name = sub.replace("-", " ");
  return {
    title: `Women's ${name} | Maa Sadqay`,
    description: `Shop women's ${name}. Premium comfort accessories delivered across Pakistan.`,
  };
}

export default async function WomenSubCollectionPage({ params }: Props) {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "women");
  const subCat = category?.subCollections.find((s) => s.slug === sub);

  if (!subCat) {
    notFound();
  }

  const products = await productRepository.getProductsByCategory("women", sub);

  return (
    <CollectionPageLayout
      title={`Women's ${subCat.name}`}
      description={`Everyday warmth and comfort essentials for mothers across Pakistan.`}
      categorySlug="women"
      subCollections={category?.subCollections}
      activeSubCollection={sub}
      products={products}
    />
  );
}

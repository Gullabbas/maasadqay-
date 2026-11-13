import { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionPageLayout from "@/components/ecommerce/CollectionPageLayout";
import { productRepository, CATEGORIES } from "@/data/catalog";

type Props = {
  params: Promise<{ sub: string }>;
};

export function generateStaticParams() {
  const category = CATEGORIES.find((c) => c.slug === "boys");
  return category?.subCollections.map((s) => ({ sub: s.slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "boys");
  const subCat = category?.subCollections.find((s) => s.slug === sub);
  const name = subCat ? subCat.name : sub.replace("-", " ");

  return {
    title: `Boys ${name} | Maa Sadqay Kids Wear`,
    description: `Shop authentic Pakistani boys ${name}. Premium tailoring, softest breathable fabrics, Cash on Delivery nationwide.`,
  };
}

export default async function BoysSubCollectionPage({ params }: Props) {
  const { sub } = await params;
  const category = CATEGORIES.find((c) => c.slug === "boys");
  const subCat = category?.subCollections.find((s) => s.slug === sub);

  if (!subCat) {
    notFound();
  }

  const products = await productRepository.getProductsByCategory("boys", sub);

  return (
    <CollectionPageLayout
      title={`Boys ${subCat.name}`}
      description={`Premium handcrafted ${subCat.name} made with motherly love. High quality tailoring with flat Rs. 250 shipping nationwide.`}
      categorySlug="boys"
      subCollections={category?.subCollections}
      activeSubCollection={sub}
      products={products}
    />
  );
}

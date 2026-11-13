import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productRepository, PRODUCTS } from "@/data/catalog";
import ProductDetailClient from "@/components/ecommerce/ProductDetailClient";
import TrendingShelf from "@/components/home/TrendingShelf";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await productRepository.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Maa Sadqay",
    };
  }

  return {
    title: `${product.name} (${product.sku}) | Maa Sadqay Kids Wear`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Maa Sadqay`,
      description: product.description,
      images: [
        {
          url: product.images[0] || "/images/boys.webp",
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await productRepository.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await productRepository.getAllProducts();
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isTrending)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Maa Sadqay",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <div className="border-t border-brand-100 bg-surface-pure">
        <TrendingShelf products={relatedProducts} />
      </div>
    </>
  );
}

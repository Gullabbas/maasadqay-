"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import ProductCard from "@/components/ecommerce/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="py-10 sm:py-16 bg-surface-warm min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Catalog Search
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-ink-primary tracking-tight">
            Search Results for &ldquo;{query}&rdquo;
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Found <strong>{results.length}</strong> matching products in Maa Sadqay collection.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-surface-pure rounded-3xl p-12 text-center border border-brand-100 shadow-soft max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-400">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-lg text-ink-primary">
              No matching products found
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Try searching with a broader term such as &ldquo;kurta&rdquo;, &ldquo;co-ord&rdquo;, or &ldquo;boys&rdquo;.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/boys"
                className="px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors"
              >
                Browse All Boys Wear
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}

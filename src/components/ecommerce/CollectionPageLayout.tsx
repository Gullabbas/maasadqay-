"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Filter, ArrowUpDown, Sparkles } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ecommerce/ProductCard";
import QuickViewModal from "@/components/ecommerce/QuickViewModal";

interface CollectionPageLayoutProps {
  title: string;
  description: string;
  categorySlug: string;
  subCollections?: { slug: string; name: string }[];
  activeSubCollection?: string;
  products: Product[];
}

export default function CollectionPageLayout({
  title,
  description,
  categorySlug,
  subCollections,
  activeSubCollection,
  products,
}: CollectionPageLayoutProps) {
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Extract available sizes across these products
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    if (selectedSize !== "all") {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    if (selectedSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "discount") {
      result.sort((a, b) => b.discountPercent - a.discountPercent);
    }

    return result;
  }, [products, inStockOnly, selectedSize, selectedSort]);

  return (
    <div className="py-8 sm:py-12 bg-surface-warm min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-tertiary mb-6">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/collections/${categorySlug}`} className="hover:text-brand-600 capitalize">
            {categorySlug.replace("-", " ")}
          </Link>
          {activeSubCollection && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-semibold text-ink-primary capitalize">
                {activeSubCollection.replace("-", " ")}
              </span>
            </>
          )}
        </nav>

        {/* Collection Hero Header */}
        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Maa Sadqay Storefront
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight mt-3">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary max-w-2xl mt-2">
            {description}
          </p>

          {/* Sub-Collection Pills */}
          {subCollections && subCollections.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-brand-100">
              <Link
                href={`/collections/${categorySlug}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  !activeSubCollection
                    ? "bg-brand-500 text-white shadow-soft"
                    : "bg-surface-warm text-ink-secondary hover:text-brand-600 hover:bg-brand-50 border border-brand-200"
                }`}
              >
                All {title}
              </Link>
              {subCollections.map((sub) => {
                const isActive = activeSubCollection === sub.slug;
                return (
                  <Link
                    key={sub.slug}
                    href={`/collections/${categorySlug}/${sub.slug}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-brand-500 text-white shadow-soft"
                        : "bg-surface-warm text-ink-secondary hover:text-brand-600 hover:bg-brand-50 border border-brand-200"
                    }`}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-surface-pure rounded-2xl p-4 border border-brand-100 shadow-sm mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Size Selector */}
            {allSizes.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-secondary font-medium">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-surface-warm border border-brand-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-ink-primary outline-none focus:border-brand-500"
                >
                  <option value="all">All Sizes</option>
                  {allSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* In Stock Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-ink-primary select-none pl-2 border-l border-brand-100">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-500 focus:ring-brand-400"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <span className="text-xs text-ink-tertiary">
              Showing <strong>{filteredProducts.length}</strong> Products
            </span>

            {/* Sort Options */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-ink-tertiary" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-surface-warm border border-brand-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-ink-primary outline-none focus:border-brand-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-surface-pure rounded-3xl p-12 text-center border border-brand-100 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-ink-primary">
              No products found with these filters
            </h3>
            <p className="text-sm text-ink-secondary max-w-sm mx-auto">
              Try adjusting your size selection or view our complete catalog.
            </p>
            <button
              onClick={() => {
                setSelectedSize("all");
                setInStockOnly(false);
              }}
              className="px-6 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs hover:bg-brand-600 transition-colors shadow-soft"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

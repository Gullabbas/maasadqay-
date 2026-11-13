"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useSearchStore } from "@/lib/store";
import { PRODUCTS } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

const POPULAR_SEARCHES = [
  "Kurta",
  "Co-ord",
  "Waistcoat",
  "Prince Coat",
  "Toddler",
  "BCSRC20",
  "Sale",
];

export default function SearchModal() {
  const { isOpen, closeSearch, query, setQuery } = useSearchStore();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/70 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-surface-pure rounded-3xl shadow-modal overflow-hidden z-10 border border-brand-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-brand-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Eastern wear, co-ords, SKUs (e.g. BCSRC20)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-ink-primary text-base sm:text-lg placeholder:text-ink-tertiary"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-ink-tertiary hover:text-ink-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-xs font-semibold text-ink-secondary bg-surface-muted hover:bg-brand-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-5 py-3 bg-surface-muted/40 border-b border-brand-50 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-ink-tertiary uppercase flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-ochre-500" />
            Trending:
          </span>
          {POPULAR_SEARCHES.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 text-xs rounded-full bg-white border border-brand-100 text-ink-secondary hover:text-brand-600 hover:border-brand-300 transition-colors flex-shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Live Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 no-scrollbar">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-ink-secondary space-y-2">
              <p className="text-sm">Type any keyword, category, or product SKU above to find instant matches.</p>
              <div className="pt-2 flex justify-center gap-2">
                <Link
                  href="/collections/boys"
                  onClick={closeSearch}
                  className="text-xs text-brand-600 underline font-medium"
                >
                  Explore Boys
                </Link>
                <span className="text-ink-tertiary">•</span>
                <Link
                  href="/collections/sale"
                  onClick={closeSearch}
                  className="text-xs text-brand-600 underline font-medium"
                >
                  Clearance Sale
                </Link>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-ink-secondary">
              <p className="text-sm">No products found matching &ldquo;<strong>{query}</strong>&rdquo;.</p>
              <p className="text-xs text-ink-tertiary mt-1">
                Try searching for &ldquo;kurta&rdquo;, &ldquo;co-ord&rdquo;, or &ldquo;toddler&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-ink-tertiary uppercase px-1">
                Found {results.length} Products
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={closeSearch}
                    className="flex gap-3 p-2.5 rounded-2xl border border-brand-100 hover:border-brand-300 hover:bg-brand-50/40 transition-all group"
                  >
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                      <Image
                        src={product.images[0] || "/images/boys.webp"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-500">
                        {product.sku}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-ink-primary line-clamp-1 group-hover:text-brand-600 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-brand-600">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-ink-tertiary line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-brand-100 flex justify-end">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={closeSearch}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  View all results for &ldquo;{query}&rdquo; <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

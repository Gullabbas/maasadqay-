"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { PRODUCTS } from "@/data/catalog";
import ProductCard from "@/components/ecommerce/ProductCard";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="py-10 sm:py-16 bg-surface-warm min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-primary tracking-tight">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Keep track of your favorite outfits and size picks.
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-surface-pure rounded-3xl p-12 text-center border border-brand-100 shadow-soft space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-400">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-display font-bold text-lg text-ink-primary">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-xs mx-auto">
              Tap the heart icon on any product to save it here for later.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/boys"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-soft transition-all"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

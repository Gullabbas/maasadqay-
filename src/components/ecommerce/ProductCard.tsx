"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye, Star, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Standard");
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes.length > 1 && !showSizePicker) {
      setShowSizePicker(true);
      return;
    }
    addItem(product, selectedSize, product.colors[0]?.name || "Standard", 1);
    setAddedAnimation(true);
    setShowSizePicker(false);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleSelectSizeAndAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addItem(product, size, product.colors[0]?.name || "Standard", 1);
    setAddedAnimation(true);
    setShowSizePicker(false);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="group relative bg-surface-pure rounded-3xl overflow-hidden border border-brand-100 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-50">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0] || "/images/boys.webp"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase shadow-md">
              -{product.discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Wishlist & Quick View Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Save to Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isInWishlist
                ? "bg-red-50 text-red-600 scale-110"
                : "bg-white/80 text-ink-primary hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="p-2 rounded-full bg-white/80 backdrop-blur-md text-ink-primary hover:bg-white hover:text-brand-600 transition-all opacity-0 group-hover:opacity-100 hidden sm:flex shadow-md"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Size Selection Popover when Quick Adding */}
        {showSizePicker && (
          <div
            className="absolute inset-x-3 bottom-3 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-200 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] font-bold text-ink-primary mb-2 flex justify-between items-center">
              <span>Select Age / Size:</span>
              <button
                onClick={() => setShowSizePicker(false)}
                className="text-ink-tertiary hover:text-ink-primary text-xs"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSelectSizeAndAdd(size, e)}
                  className="py-1 px-2 text-[11px] font-bold rounded-lg border border-brand-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Add Button Bar (Visible on desktop hover, always accessible) */}
        {!showSizePicker && (
          <div className="absolute inset-x-3 bottom-3 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`w-full py-2.5 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                addedAnimation
                  ? "bg-emerald-600 text-white"
                  : "bg-brand-500 hover:bg-brand-600 text-white"
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add to Bag</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Meta */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-ink-tertiary mb-1">
            <span className="font-semibold text-brand-600 uppercase tracking-wider">
              {product.sku}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-ink-primary font-bold">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="font-display font-bold text-sm sm:text-base text-ink-primary hover:text-brand-600 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-brand-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-base sm:text-lg text-brand-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-ink-tertiary line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Available Sizes preview */}
          <span className="text-[10px] text-ink-secondary bg-surface-muted px-2 py-0.5 rounded-md font-medium">
            {product.sizes[0]} - {product.sizes[product.sizes.length - 1]}
          </span>
        </div>
      </div>
    </div>
  );
}

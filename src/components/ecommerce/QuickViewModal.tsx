"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Truck, ShieldCheck, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => (product ? s.isInWishlist(product.id) : false));

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0] || "Standard";

  const handleAddToCart = () => {
    addItem(product, currentSize, product.colors[0]?.name || "Standard", quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-surface-pure rounded-3xl shadow-modal overflow-hidden z-10 border border-brand-100 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 text-ink-secondary hover:text-ink-primary hover:bg-white shadow-md z-20 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Gallery */}
          <div className="relative aspect-[3/4] bg-brand-50 w-full">
            <Image
              src={product.images[0] || "/images/boys.webp"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase shadow-md">
                -{product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-600 uppercase tracking-wider">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-ink-primary">{product.rating}</span>
                  <span className="text-ink-tertiary">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink-primary">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-2xl text-brand-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-ink-tertiary line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="pt-2">
                <label className="text-xs font-bold text-ink-primary uppercase tracking-wider mb-2 block">
                  Select Age / Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        currentSize === size
                          ? "border-brand-500 bg-brand-500 text-white shadow-sm"
                          : "border-brand-200 text-ink-primary hover:border-brand-400 bg-surface-warm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-brand-100">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle Wishlist"
                  className={`p-3 rounded-full border transition-colors ${
                    isInWishlist
                      ? "border-red-200 bg-red-50 text-red-600"
                      : "border-brand-200 hover:bg-brand-50 text-ink-primary"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-ink-tertiary pt-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-500" />
                  <span>3-5 Days Delivery</span>
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="text-brand-600 font-semibold hover:underline flex items-center gap-1"
                >
                  Full Product Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

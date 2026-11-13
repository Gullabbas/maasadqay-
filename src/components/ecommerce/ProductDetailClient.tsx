"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Phone,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { SITE_CONFIG } from "@/lib/config";
import SizeChartModal from "./SizeChartModal";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "Standard");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2500);
  };

  // Direct WhatsApp query link
  const productWhatsAppUrl = `https://wa.me/923154245424?text=${encodeURIComponent(
    `Assalam o Alaikum! I am interested in ${product.name} (${product.sku}), Size: ${selectedSize}. Is it currently in stock for delivery to my city?`
  )}`;

  return (
    <div className="py-8 sm:py-12 bg-surface-warm min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-ink-tertiary mb-6">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/collections/${product.category}`} className="hover:text-brand-600 capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-ink-primary line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft">
          {/* Left Column: Gallery with Thumbnails */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-brand-50 border border-brand-100 group shadow-inner">
              <Image
                src={product.images[selectedImage] || "/images/boys.webp"}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-zoom-in"
              />

              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-red-600 text-white font-bold text-xs uppercase shadow-md">
                    -{product.discountPercent}% OFF
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to Wishlist"
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
                  isInWishlist
                    ? "bg-red-50 text-red-600 scale-110"
                    : "bg-white/80 text-ink-primary hover:bg-white hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === idx
                        ? "border-brand-500 shadow-sm"
                        : "border-brand-100 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Controls */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Brand SKU & Review Meta */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  SKU: {product.sku}
                </span>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-ink-primary text-sm">{product.rating}</span>
                  <span className="text-ink-tertiary">({product.reviewCount} Verified Reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-primary tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="p-4 bg-brand-50/70 rounded-2xl border border-brand-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-extrabold text-3xl text-brand-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm sm:text-base text-ink-tertiary line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-ink-tertiary">Prices include all sales taxes</span>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Select Age / Size:
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeChartOpen(true)}
                    className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide (Inches)</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSize === size
                          ? "border-brand-500 bg-brand-500 text-white shadow-soft"
                          : "border-brand-200 text-ink-primary hover:border-brand-400 bg-surface-warm"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="pt-2 flex items-center gap-4">
                <span className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-brand-200 rounded-xl overflow-hidden bg-surface-warm">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-ink-primary hover:bg-brand-50 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-ink-primary">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-ink-primary hover:bg-brand-50 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions & WhatsApp */}
            <div className="space-y-3 pt-6 border-t border-brand-100">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-full font-bold text-sm sm:text-base shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2 ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : "bg-brand-500 hover:bg-brand-600 text-white"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Shopping Bag • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <a
                href={productWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Instant Order via WhatsApp (0315-4245424)</span>
              </a>

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-surface-muted/60 border border-brand-100 space-y-2 text-xs text-ink-secondary">
                <div className="flex items-center gap-2 text-ink-primary font-semibold">
                  <Truck className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>Flat Rs. 250 Nationwide Shipping • Free above Rs. 10,000</span>
                </div>
                <div className="flex items-center gap-2 text-ink-primary font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Cash on Delivery across all cities in Pakistan</span>
                </div>
                <div className="flex items-center gap-2 text-ink-primary font-semibold">
                  <RotateCcw className="w-4 h-4 text-ochre-600 flex-shrink-0" />
                  <span>7-Day Easy Size Exchange Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details & Fabric Specs */}
        <div className="mt-12 bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft">
          <h3 className="font-display font-extrabold text-xl text-ink-primary mb-4">
            Fabric & Tailoring Specifications
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-ink-secondary">
            {product.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-brand-200 lg:hidden z-30 shadow-lg flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-ink-secondary">Total:</div>
          <div className="font-display font-bold text-base text-brand-600">
            {formatPrice(product.price * quantity)}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 px-5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-soft"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag ({selectedSize})</span>
        </button>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        category={product.category}
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ArrowRight, Truck, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingFee,
    getTotal,
    getFreeShippingProgress,
    getAmountForFreeShipping,
  } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const progress = getFreeShippingProgress();
  const neededForFree = getAmountForFreeShipping();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-surface-warm h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-brand-100 flex items-center justify-between bg-surface-pure">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <h2 className="font-display font-bold text-lg text-ink-primary">
              Your Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-ink-secondary hover:bg-brand-50 hover:text-brand-600 transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-brand-50/70 p-4 border-b border-brand-100">
          <div className="flex items-center justify-between text-xs font-medium text-ink-primary mb-2">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-brand-600" />
              {neededForFree > 0 ? (
                <span>
                  Add <strong className="text-brand-600">{formatPrice(neededForFree)}</strong> more for <strong>FREE Shipping</strong>!
                </span>
              ) : (
                <span className="text-emerald-700 font-bold">
                  🎉 Hooray! You unlocked FREE Nationwide Shipping!
                </span>
              )}
            </span>
            <span className="font-bold text-brand-600">{progress}%</span>
          </div>
          <div className="w-full bg-brand-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center text-brand-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-ink-primary">
                  Your bag is currently empty
                </h3>
                <p className="text-sm text-ink-secondary mt-1 max-w-xs">
                  Discover our charming collection of Eastern wear and comfortable co-ord sets.
                </p>
              </div>
              <Link
                href="/collections/new-arrivals"
                onClick={closeCart}
                className="px-6 py-2.5 rounded-full bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors shadow-soft"
              >
                Shop New Arrivals
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-surface-pure rounded-2xl border border-brand-100/80 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                  <Image
                    src={item.product.images[0] || "/images/boys.webp"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-xs sm:text-sm text-ink-primary line-clamp-1 hover:text-brand-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-ink-tertiary hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-ink-secondary">
                      <span className="bg-surface-muted px-2 py-0.5 rounded-md font-semibold text-ink-primary">
                        Size: {item.size}
                      </span>
                      {item.color && (
                        <span className="text-ink-tertiary">
                          Color: {item.color}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-brand-200 rounded-lg overflow-hidden bg-surface-warm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-ink-secondary hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-ink-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-ink-secondary hover:bg-brand-50 hover:text-brand-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-brand-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-surface-pure border-t border-brand-100 space-y-3 pb-safe">
            <div className="space-y-1.5 text-xs text-ink-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-ink-primary">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-ink-primary">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-ink-primary pt-2 border-t border-brand-100">
                <span>Total Amount</span>
                <span className="text-brand-600">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft hover:shadow-hover transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-ink-tertiary pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cash on Delivery & Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

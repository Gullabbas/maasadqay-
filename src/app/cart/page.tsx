"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ArrowRight, Truck, ShoppingBag, ShieldCheck, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
    getShippingFee,
    getTotal,
    getFreeShippingProgress,
    getAmountForFreeShipping,
  } = useCartStore();

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const total = getTotal();
  const progress = getFreeShippingProgress();
  const neededForFree = getAmountForFreeShipping();

  return (
    <div className="py-10 sm:py-16 bg-surface-warm min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight mb-8">
          Shopping Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
        </h1>

        {items.length === 0 ? (
          <div className="bg-surface-pure rounded-3xl p-12 text-center border border-brand-100 shadow-soft space-y-4">
            <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mx-auto text-brand-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-display font-bold text-xl text-ink-primary">
              Your Shopping Bag is Currently Empty
            </h2>
            <p className="text-sm text-ink-secondary max-w-sm mx-auto">
              Explore our charming collection of Eastern kurta pajamas and breathable summer sets.
            </p>
            <div className="pt-2">
              <Link
                href="/collections/new-arrivals"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft transition-all"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Free Shipping Alert */}
              <div className="bg-brand-50 rounded-2xl p-4 border border-brand-200">
                <div className="flex items-center justify-between text-xs font-bold text-ink-primary mb-2">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-600" />
                    {neededForFree > 0 ? (
                      <span>
                        Add <strong className="text-brand-600">{formatPrice(neededForFree)}</strong> more for <strong>FREE Nationwide Delivery</strong>!
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold">
                        🎉 You unlocked FREE Nationwide Delivery!
                      </span>
                    )}
                  </span>
                  <span className="text-brand-600">{progress}%</span>
                </div>
                <div className="w-full bg-brand-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-surface-pure rounded-3xl border border-brand-100 shadow-soft"
                  >
                    <div className="relative w-24 h-28 rounded-2xl overflow-hidden bg-brand-50 flex-shrink-0">
                      <Image
                        src={item.product.images[0] || "/images/boys.webp"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-display font-bold text-sm sm:text-base text-ink-primary hover:text-brand-600 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-ink-tertiary hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-ink-secondary">
                          <span className="bg-surface-muted px-2.5 py-0.5 rounded-lg font-bold text-ink-primary">
                            Size: {item.size}
                          </span>
                          <span className="text-ink-tertiary">
                            SKU: {item.product.sku}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center border border-brand-200 rounded-xl overflow-hidden bg-surface-warm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-ink-primary hover:bg-brand-50 font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1 text-xs font-bold text-ink-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-ink-primary hover:bg-brand-50 font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-display font-extrabold text-base text-brand-600">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-5 bg-surface-pure rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6">
              <h3 className="font-display font-bold text-lg text-ink-primary border-b border-brand-100 pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-ink-secondary">
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
                <div className="flex justify-between text-base sm:text-lg font-bold text-ink-primary pt-3 border-t border-brand-100">
                  <span>Total Amount</span>
                  <span className="text-brand-600">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft hover:shadow-hover transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-ink-tertiary">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery & Easy 7-Day Exchange</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

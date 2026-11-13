"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Truck,
  CheckCircle,
  Phone,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/lib/store";
import { formatPrice, isValidPakistaniPhone } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config";

const MAJOR_CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Gujranwala",
  "Sialkot",
  "Quetta",
];

export default function CheckoutPage() {
  const { items, getSubtotal, getShippingFee, getTotal, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    city: "Lahore",
    address: "",
    email: "",
    paymentMethod: "COD" as "COD" | "Card" | "BankTransfer",
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const total = getTotal();

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name";
    }

    if (!isValidPakistaniPhone(formData.phoneNumber)) {
      errs.phoneNumber = "Please enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03154245424)";
    }

    if (!formData.city.trim()) {
      errs.city = "Please specify your city";
    }

    if (!formData.address.trim() || formData.address.trim().length < 6) {
      errs.address = "Please provide your complete street address (house #, street, area)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    if (items.length === 0) {
      alert("Your bag is empty! Please add products before checking out.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: formData,
        }),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        clearCart();
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
          });
        } catch (e) {}
      } else {
        alert(data.error || "Order placement failed. Please verify your details.");
      }
    } catch (err) {
      setIsSubmitting(false);
      alert("Network error. Please try again or place order directly on WhatsApp: 0315-4245424.");
    }
  };

  // Order Confirmed Screen
  if (confirmedOrder) {
    return (
      <div className="py-12 sm:py-20 bg-surface-warm min-h-[85vh] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-surface-pure rounded-3xl p-8 sm:p-12 shadow-modal border border-brand-100 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed (Cash on Delivery)
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-primary">
              Shukriya, {confirmedOrder.customer.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto">
              Your parcel is being lovingly assembled in Lahore. You will receive an SMS and WhatsApp confirmation prior to courier dispatch.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-surface-warm rounded-2xl p-5 border border-brand-100 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-brand-200">
              <span className="font-bold text-ink-tertiary">Order Reference:</span>
              <span className="font-mono font-bold text-base text-brand-600">
                {confirmedOrder.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">Delivery City:</span>
              <span className="font-semibold text-ink-primary">{confirmedOrder.customer.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">Phone Number:</span>
              <span className="font-semibold text-ink-primary">
                {confirmedOrder.customer.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-secondary">Payment Mode:</span>
              <span className="font-semibold text-emerald-700">Cash on Delivery</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-brand-600 pt-2 border-t border-brand-200">
              <span>Total Payable:</span>
              <span>{formatPrice(confirmedOrder.total)}</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="space-y-3 pt-2">
            <a
              href={confirmedOrder.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Confirm with Customer Care on WhatsApp</span>
            </a>

            <a
              href={SITE_CONFIG.orderTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-full bg-surface-warm hover:bg-brand-50 text-ink-primary font-bold text-xs sm:text-sm border border-brand-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Truck className="w-4 h-4 text-brand-600" />
              <span>Track Live Order Status</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-tertiary ml-1" />
            </a>

            <Link
              href="/"
              className="inline-block text-xs font-bold text-brand-600 hover:underline pt-2"
            >
              Return to Storefront Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-surface-warm min-h-[85vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight mb-8">
          Express Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            {/* Delivery Details Card */}
            <div className="bg-surface-pure rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-4">
              <h2 className="font-display font-bold text-lg text-ink-primary border-b border-brand-100 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-600" />
                <span>Delivery Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-surface-warm border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 transition-colors ${
                      errors.fullName ? "border-red-500" : "border-brand-200"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Pakistani Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567 or 03154245424"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`w-full bg-surface-warm border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 transition-colors ${
                      errors.phoneNumber ? "border-red-500" : "border-brand-200"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                    </span>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 font-semibold"
                  >
                    {MAJOR_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Other">Other City / District</option>
                  </select>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="for invoice & dispatch receipt"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                {/* Complete Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Apartment #, Street #, Sector / Area, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full bg-surface-warm border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink-primary outline-none focus:border-brand-500 transition-colors resize-none ${
                      errors.address ? "border-red-500" : "border-brand-200"
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" /> {errors.address}
                    </span>
                  )}
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, ring side bell"
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    className="w-full bg-surface-warm border border-brand-200 rounded-xl px-4 py-2 text-xs text-ink-primary outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-surface-pure rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-4">
              <h2 className="font-display font-bold text-lg text-ink-primary border-b border-brand-100 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                <span>Select Payment Mode</span>
              </h2>

              <div className="space-y-3">
                {SITE_CONFIG.paymentMethods.map((method) => {
                  const isSelected = formData.paymentMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-brand-500 bg-brand-50/50"
                          : "border-brand-100 hover:border-brand-300 bg-surface-warm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={isSelected}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              paymentMethod: method.id as any,
                            })
                          }
                          className="w-4 h-4 text-brand-500 focus:ring-brand-400"
                        />
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-ink-primary">
                            {method.name}
                          </div>
                          <div className="text-[11px] text-ink-secondary">
                            {method.id === "COD"
                              ? "Pay cash directly to the courier agent when your parcel arrives."
                              : "Verified securely via our financial gateway."}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-brand-200 text-brand-600">
                        {method.badge}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-4 px-8 rounded-full bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-soft hover:shadow-hover transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Placing Your Order...</span>
              ) : (
                <>
                  <span>Place Order ({formatPrice(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-surface-pure rounded-3xl p-6 sm:p-8 border border-brand-100 shadow-soft space-y-6">
            <h3 className="font-display font-bold text-lg text-ink-primary border-b border-brand-100 pb-3">
              Order Review ({items.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Items List */}
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || "/images/boys.webp"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink-primary line-clamp-1">
                      {item.product.name}
                    </div>
                    <div className="text-ink-tertiary text-[11px] mt-0.5">
                      Size: {item.size} • Qty: {item.quantity}
                    </div>
                    <div className="font-bold text-brand-600 mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-brand-100 text-xs sm:text-sm text-ink-secondary">
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
              <div className="flex justify-between text-base font-bold text-ink-primary pt-3 border-t border-brand-100">
                <span>Total Payable (COD)</span>
                <span className="text-brand-600">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-4 bg-brand-50 rounded-2xl text-[11px] text-ink-secondary space-y-1">
              <div className="font-bold text-ink-primary">🚚 Estimated Delivery Window:</div>
              <div>3–5 Business Days to your doorstep anywhere in Pakistan.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

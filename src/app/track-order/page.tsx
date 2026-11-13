"use client";

import { useState } from "react";
import { Truck, ExternalLink, Phone, ShieldCheck, Search, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    window.open(`${SITE_CONFIG.orderTrackingUrl}?order=${encodeURIComponent(orderNumber.trim())}`, "_blank");
  };

  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            Nationwide Dispatch
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight">
            Track Your Parcel
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary max-w-lg mx-auto">
            Enter your Maa Sadqay Order ID (e.g. <code className="bg-brand-50 px-2 py-0.5 rounded text-brand-600 font-mono font-bold">MS-261114-XXXX</code>) to check live courier status.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div className="bg-surface-pure rounded-3xl p-6 sm:p-10 border border-brand-100 shadow-soft max-w-2xl mx-auto">
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                Order Tracking ID:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. MS-261114-8921"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1 bg-surface-warm border border-brand-200 rounded-2xl px-4 py-3 text-sm text-ink-primary outline-none focus:border-brand-500 font-mono font-bold uppercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-soft transition-all"
                >
                  <Search className="w-4 h-4" />
                  <span>Track</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-ink-tertiary pt-2">
              <span>Delivery Partner: TCS / Trax Courier</span>
              <a
                href={SITE_CONFIG.orderTrackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 font-bold hover:underline flex items-center gap-1"
              >
                <span>Direct Tracker Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </form>
        </div>

        {/* Delivery Timelines & FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-surface-pure rounded-2xl p-6 border border-brand-100 shadow-sm space-y-2">
            <Clock className="w-6 h-6 text-brand-500" />
            <h4 className="font-bold text-sm text-ink-primary">Delivery Window</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Parcels are delivered within <strong>3 to 5 business days</strong> across all major cities and districts of Pakistan.
            </p>
          </div>

          <div className="bg-surface-pure rounded-2xl p-6 border border-brand-100 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h4 className="font-bold text-sm text-ink-primary">Cash on Delivery</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Have the exact cash amount ready for the rider. You will receive an SMS alert on delivery morning.
            </p>
          </div>

          <div className="bg-surface-pure rounded-2xl p-6 border border-brand-100 shadow-sm space-y-2">
            <Phone className="w-6 h-6 text-emerald-500" />
            <h4 className="font-bold text-sm text-ink-primary">Immediate Support</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Questions regarding rider dispatch? Chat directly on WhatsApp at{" "}
              <a href={SITE_CONFIG.contact.whatsappUrl} className="font-bold text-emerald-600 underline">
                0315-4245424
              </a>
              .
            </p>
          </div>
        </div>

        {/* Embedded Portal Preview */}
        <div className="rounded-3xl overflow-hidden border border-brand-200 shadow-soft bg-surface-pure">
          <div className="p-4 bg-brand-900 text-white flex items-center justify-between text-xs">
            <span className="font-semibold">Maa Sadqay Live Tracking System</span>
            <a
              href={SITE_CONFIG.orderTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ochre-300 hover:text-white flex items-center gap-1 font-bold"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="aspect-[16/9] w-full bg-surface-warm relative">
            <iframe
              src={SITE_CONFIG.orderTrackingUrl}
              title="Maa Sadqay Order Tracker"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

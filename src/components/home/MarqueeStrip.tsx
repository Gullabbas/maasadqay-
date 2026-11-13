"use client";

import { Sparkles, Truck, Star, ShieldCheck, Heart } from "lucide-react";

const MARQUEE_ITEMS = [
  { icon: Truck, text: "Free Nationwide Shipping Above Rs. 10,000" },
  { icon: Star, text: "4.84★ Rated by 185+ Happy Parents" },
  { icon: ShieldCheck, text: "Flat Rs. 250 Shipping Nationwide" },
  { icon: Heart, text: "Designed With Love in Lahore, Pakistan" },
  { icon: Sparkles, text: "Delivery in 3–5 Business Days" },
  { icon: ShieldCheck, text: "Cash on Delivery Available Nationwide" },
];

export default function MarqueeStrip() {
  return (
    <div className="bg-brand-500 text-white py-3 sm:py-3.5 overflow-hidden whitespace-nowrap border-y border-brand-600/50 shadow-inner select-none relative z-20">
      <div className="flex animate-marquee items-center gap-10">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide">
              <Icon className="w-4 h-4 text-ochre-300 flex-shrink-0" />
              <span>{item.text}</span>
              <span className="text-brand-300 opacity-60 ml-6">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

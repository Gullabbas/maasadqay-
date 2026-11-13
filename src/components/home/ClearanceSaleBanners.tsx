"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

export default function ClearanceSaleBanners() {
  const tiers = [
    {
      title: "Under Rs. 999",
      subtitle: "Casual Shirts, Tees & Bottoms",
      discount: "UP TO 60% OFF",
      href: "/collections/sale/under-999",
      bgGradient: "from-brand-700 via-brand-800 to-brand-900",
      accentBadge: "Best Value",
      neonConic: "conic-gradient(from 0deg, transparent 0deg 270deg, rgba(253, 224, 71, 0.3) 310deg, #fde047 345deg, #ffffff 360deg)",
      glowColor: "rgba(253, 224, 71, 0.4)",
    },
    {
      title: "Under Rs. 799",
      subtitle: "Floral Co-ords & Summer Shorts",
      discount: "UP TO 55% OFF",
      href: "/collections/sale/under-799",
      bgGradient: "from-amber-700 via-amber-800 to-amber-950",
      accentBadge: "Fast Selling",
      neonConic: "conic-gradient(from 0deg, transparent 0deg 270deg, rgba(56, 189, 248, 0.3) 310deg, #38bdf8 345deg, #ffffff 360deg)",
      glowColor: "rgba(56, 189, 248, 0.4)",
    },
    {
      title: "Under Rs. 599",
      subtitle: "Organic Socks, Caps & Basics",
      discount: "UP TO 50% OFF",
      href: "/collections/sale/under-599",
      bgGradient: "from-red-700 via-red-800 to-rose-950",
      accentBadge: "Steal Deal",
      neonConic: "conic-gradient(from 0deg, transparent 0deg 270deg, rgba(244, 63, 94, 0.3) 310deg, #f43f5e 345deg, #ffffff 360deg)",
      glowColor: "rgba(244, 63, 94, 0.4)",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface-pure relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current text-red-600" />
            Limited Clearance Stock • Up to 60% Off
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
            Clearance Deals by Budget
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary">
            Grab premium quality pieces at honest clearance prices before remaining sizes run out.
          </p>
          <div className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full w-fit mx-auto border border-emerald-200">
            <span>🎉 Cash on Delivery Available Across All Pakistan Cities</span>
          </div>
        </div>

        {/* 3 Price-Tier Cards with Animated Neon Light on Edges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <Link
              key={idx}
              href={tier.href}
              className="group relative rounded-3xl p-[2.5px] overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
              style={{
                boxShadow: `0 10px 30px -10px ${tier.glowColor}`,
              }}
            >
              {/* Scrolling Neon Light Beam traveling along the card edge - PAUSES ON HOVER */}
              <div
                className="absolute aspect-square w-[300%] -top-[100%] -left-[100%] animate-border-beam pointer-events-none group-hover:[animation-play-state:paused]"
                style={{
                  background: tier.neonConic,
                  willChange: "transform",
                }}
              />

              {/* Inner Card Content */}
              <div
                className={`relative w-full h-full rounded-[22px] p-8 bg-gradient-to-br ${tier.bgGradient} text-white overflow-hidden flex flex-col justify-between min-h-[260px]`}
              >
                {/* Subtle background circular glow */}
                <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      {tier.accentBadge}
                    </span>
                    <span className="text-xs font-bold text-amber-300 bg-black/30 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                      {tier.discount}
                    </span>
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Price Tier
                  </div>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">
                    {tier.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 mt-2">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 flex items-center justify-between text-xs font-bold">
                  <span className="group-hover:underline">Browse Tier Products</span>
                  <div className="w-8 h-8 rounded-full bg-white text-ink-primary flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, ShieldCheck, Truck } from "lucide-react";
import ShoppingDoodleBackground from "./ShoppingDoodleBackground";
import { SITE_CONFIG } from "@/lib/config";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden py-12 lg:py-20">
      {/* Shopping Doodle Interactive Canvas */}
      <ShoppingDoodleBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-brand-200/80 shadow-soft backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Lahore&apos;s Cherished Kids Label
              </span>
              <span className="text-brand-300">•</span>
              <span className="text-xs font-urdu text-brand-700 font-semibold">ماں صدقے</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink-primary tracking-tight leading-[1.12]">
              Designed with Love for{" "}
              <span className="relative inline-block text-brand-500">
                Pakistan&apos;s
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-ochre-400 opacity-60"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>{" "}
              Little Stars
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-ink-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Dignified Eastern wear, festive prince coats, and butter-soft co-ord sets tailored for joyous memories. Honest pricing with Cash on Delivery nationwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/collections/new-arrivals"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm sm:text-base shadow-hover transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/collections/sale"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white text-ink-primary font-bold text-sm sm:text-base border border-brand-200 shadow-soft hover:shadow-hover transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-red-500" />
                <span>Clearance Deals</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold ml-1">
                  Up to 60% Off
                </span>
              </Link>
            </div>

            {/* Quick Age Finder Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
              <span className="text-ink-tertiary font-bold uppercase tracking-wider text-[10px]">
                Quick Shop:
              </span>
              <Link
                href="/collections/toddlers"
                className="px-3 py-1 rounded-full bg-brand-50/80 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition-colors"
              >
                👶 Toddlers (6–24M)
              </Link>
              <Link
                href="/collections/boys"
                className="px-3 py-1 rounded-full bg-brand-50/80 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition-colors"
              >
                👦 Boys (2–14Y)
              </Link>
              <Link
                href="/collections/girls"
                className="px-3 py-1 rounded-full bg-brand-50/80 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition-colors"
              >
                👧 Girls (2–14Y)
              </Link>
              <Link
                href="/collections/accessories"
                className="px-3 py-1 rounded-full bg-brand-50/80 hover:bg-brand-100 text-brand-700 font-semibold border border-brand-200 transition-colors"
              >
                🎀 Accessories
              </Link>
            </div>

            {/* Social Proof & Guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 border-t border-brand-100/80">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-ink-primary ml-1">4.84</span>
                </div>
                <span className="text-[11px] text-ink-tertiary mt-0.5">185+ Happy Moms</span>
              </div>

              <div className="flex flex-col items-center lg:items-start border-l border-brand-100 pl-3 sm:pl-4">
                <div className="flex items-center gap-1 text-ink-primary font-bold text-xs">
                  <Truck className="w-3.5 h-3.5 text-brand-600" />
                  <span>3–5 Days</span>
                </div>
                <span className="text-[11px] text-ink-tertiary mt-0.5">Delivery Nationwide</span>
              </div>

              <div className="flex flex-col items-center lg:items-start border-l border-brand-100 pl-3 sm:pl-4">
                <div className="flex items-center gap-1 text-ink-primary font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>COD</span>
                </div>
                <span className="text-[11px] text-ink-tertiary mt-0.5">Cash On Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Visual */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background aura */}
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-300/40 via-ochre-300/30 to-sage-200/40 rounded-3xl blur-2xl -z-10" />

              {/* Main Banner Visual Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-surface-pure transform transition-all duration-500 hover:scale-[1.01]">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full">
                  <Image
                    src="/images/slider.webp"
                    alt="Maa Sadqay New Arrivals Banner"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Subtle gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/70 via-transparent to-black/10" />

                  {/* Overlay Banner Text */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-500/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                      New Season 2027
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl drop-shadow-md">
                      Festive Elegance & Daily Joy
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-100/90 drop-shadow mt-1">
                      Pure comfort fabrics crafted for precious smiles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-brand-100 flex items-center gap-3 animate-float max-w-[220px]">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  Rs. 250
                </div>
                <div>
                  <div className="text-xs font-bold text-ink-primary">Nationwide Flat Rate</div>
                  <div className="text-[10px] text-ink-secondary">Free above Rs. 10k</div>
                </div>
              </div>

              {/* Floating Urdu Badge */}
              <div className="absolute -top-4 -right-4 bg-brand-900 text-ochre-300 px-4 py-2 rounded-2xl shadow-lg border border-brand-700/60 font-urdu text-sm hidden sm:block">
                خالص محبت کے ساتھ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

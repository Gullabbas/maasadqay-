"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, ShieldCheck, Smile } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function BrandWelcomeSection() {
  return (
    <section className="py-20 sm:py-28 bg-surface-warm relative overflow-hidden">
      {/* Decorative vector background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#B36648_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        {/* Heart Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 shadow-soft">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-600">
            A Mother&apos;s Promise
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight">
            Welcome to <span className="text-brand-500">Maa Sadqay</span>
          </h2>
          <div className="font-urdu text-xl sm:text-2xl text-brand-700 font-semibold pt-1">
            ماں صدقے — جہاں ہر دھاگے میں ممتا کا احساس بستا ہے
          </div>
        </div>

        {/* Brand Narrative addressed to Amazing Moms */}
        <div className="bg-surface-pure rounded-3xl p-8 sm:p-12 shadow-soft border border-brand-100/80 max-w-3xl mx-auto text-left sm:text-center space-y-6">
          <h3 className="font-display font-bold text-lg sm:text-xl text-ink-primary text-center">
            To All Our Amazing Moms Across Pakistan:
          </h3>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            As mothers ourselves, we know you want nothing less than the purest comfort and finest elegance for your children. But too often, formal festive clothing in Pakistan is stiff, itchy, and overpriced.
          </p>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
            That is why <strong>Maa Sadqay</strong> was born in Lahore. We craft children&apos;s garments with the tenderness of a mother&apos;s touch. Every prince coat is lined with featherlight lawn. Every kurta pajama is pre-softened. Every co-ord set is stitched for carefree running and tumbling.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-brand-100 text-center">
            <div className="p-3">
              <Smile className="w-6 h-6 text-brand-500 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-ink-primary">Kids First Design</div>
              <div className="text-[11px] text-ink-tertiary">Zero-itch tagless comfort</div>
            </div>

            <div className="p-3">
              <ShieldCheck className="w-6 h-6 text-sage-600 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-ink-primary">Honest Pricing</div>
              <div className="text-[11px] text-ink-tertiary">Direct from master artisans</div>
            </div>

            <div className="p-3">
              <Sparkles className="w-6 h-6 text-ochre-500 mx-auto mb-1.5" />
              <div className="font-bold text-xs text-ink-primary">Lahore Heritage</div>
              <div className="text-[11px] text-ink-tertiary">Karim Block flagship studio</div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/about"
            className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 underline"
          >
            Read Our Full Brand Story & Studio Heritage →
          </Link>
        </div>
      </div>
    </section>
  );
}

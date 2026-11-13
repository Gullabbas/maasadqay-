"use client";

import { useState, useEffect } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote, Heart, CheckCircle2 } from "lucide-react";
import { REVIEWS } from "@/data/catalog";

export default function HappyParentsReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalReviews = REVIEWS?.length || 1;

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
  };

  // Auto rotate reviews every 7s unless hovered
  useEffect(() => {
    if (isPaused || totalReviews <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalReviews - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, totalReviews]);

  const current = (REVIEWS && REVIEWS[currentIndex]) ? REVIEWS[currentIndex] : (REVIEWS?.[0] || {
    id: "rev-default",
    author: "Zainab Fatima",
    city: "Lahore, DHA",
    rating: 5,
    date: "2 days ago",
    title: "Best Eastern wear for boys!",
    comment: "Ordered the royal blue kurta pajama for my 4-year-old son. The fabric is super soft, didn't bleed color, and tailoring is exquisite.",
    verified: true,
    productName: "Boys Royal Cobalt Festive Kurta Pajama",
  });

  const starCount = Math.min(5, Math.max(1, Math.round(Number(current.rating) || 5)));

  return (
    <section className="py-16 sm:py-24 bg-surface-warm relative overflow-hidden border-t border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current text-brand-500" />
            Verified Customer Love
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight">
            What Mother&apos;s Saying
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary">
            Authentic experiences from mothers across Lahore, Karachi, Islamabad, and nationwide who choose Maa Sadqay for pure comfort and festive elegance.
          </p>
        </div>

        {/* 2-Block Layout: Left Rating Block & Right Customer Feedback Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block: Rating & Trust Metrics */}
          <div className="lg:col-span-5 bg-surface-pure rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-100/90 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-500 flex items-center justify-center font-display font-extrabold text-3xl flex-shrink-0 shadow-inner px-3 py-2">
                  4.84
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink-primary leading-tight">
                    4.84 Stars Across 185+ Verified Parents
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Verified reviews collected directly from moms in Karachi, Lahore, Islamabad, Faisalabad, Multan, and across all of Pakistan.
              </p>

              {/* Trust Checkpoints */}
              <div className="mt-6 pt-6 border-t border-brand-100 space-y-3 text-xs text-ink-primary">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">100% Verified Buyer Orders</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">Zero Placket Itch & Hypoallergenic Inks</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-semibold">60+ Washes Tested — Zero Color Fade</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-100 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Verified Buyer Feedback</span>
              </div>
              <div className="text-[11px] text-ink-tertiary font-medium">
                Lahore, Pakistan
              </div>
            </div>
          </div>

          {/* Right Block: Customer Feedback Showcase */}
          <div
            className="lg:col-span-7 bg-surface-pure rounded-3xl p-6 sm:p-10 shadow-hover border border-brand-100/90 flex flex-col justify-between transition-all duration-300"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-10 h-10 text-brand-300" />
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(starCount)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-4 min-h-[160px]">
                <h4 className="font-display font-bold text-xl sm:text-2xl text-ink-primary">
                  &ldquo;{current.title}&rdquo;
                </h4>

                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed italic">
                  {current.comment}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-ink-primary flex items-center gap-2">
                  <span>{current.author}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified Mom
                  </span>
                </div>
                <div className="text-xs text-ink-tertiary mt-0.5">
                  {current.city} • Purchased {current.productName}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={prevReview}
                  className="p-2.5 rounded-full bg-surface-warm border border-brand-200 text-ink-primary hover:bg-brand-50 hover:border-brand-400 transition-colors shadow-xs active:scale-95"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-ink-secondary min-w-[50px] text-center">
                  {currentIndex + 1} of {totalReviews}
                </span>

                <button
                  type="button"
                  onClick={nextReview}
                  className="p-2.5 rounded-full bg-surface-warm border border-brand-200 text-ink-primary hover:bg-brand-50 hover:border-brand-400 transition-colors shadow-xs active:scale-95"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

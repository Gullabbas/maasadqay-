"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Flame, Pause, Play } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ecommerce/ProductCard";
import QuickViewModal from "@/components/ecommerce/QuickViewModal";

interface TrendingShelfProps {
  products: Product[];
}

export default function TrendingShelf({ products }: TrendingShelfProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.querySelector<HTMLElement>(".trending-card-item")?.offsetWidth || 320;
      const gap = 24;
      const offset = (cardWidth + gap) * (direction === "left" ? -1 : 1);

      // Check if we reached the right end and need to loop
      if (direction === "right" && container.scrollLeft + container.clientWidth >= container.scrollWidth - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: offset, behavior: "smooth" });
      }
    }
  }, []);

  // Pause auto-scroll briefly when user manually clicks arrows
  const handleManualNav = (direction: "left" | "right") => {
    setIsInteracting(true);
    scroll(direction);

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 6000);
  };

  // Auto-scroll every 5 seconds (5000ms delay) unless user is interacting
  useEffect(() => {
    if (isInteracting || quickViewProduct) return;

    const interval = setInterval(() => {
      scroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [isInteracting, quickViewProduct, scroll]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-surface-pure relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
                <Flame className="w-3.5 h-3.5 text-red-500 fill-current" />
                Loved by Moms This Week
              </span>

              {/* Status Indicator */}
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-tertiary font-medium bg-surface-warm px-2.5 py-1 rounded-full border border-brand-100">
                {isInteracting ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-500" />
                    <span>Paused on interaction</span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Auto-scrolling every 5s</span>
                  </>
                )}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
              Trending Favorites
            </h2>
            <p className="text-sm text-ink-secondary">
              Hand-picked Eastern wear sets and breathable daily co-ords in high demand.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleManualNav("left")}
                aria-label="Scroll left"
                className="p-3 rounded-full border border-brand-200 bg-surface-warm text-ink-primary hover:bg-brand-50 hover:border-brand-400 transition-colors shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleManualNav("right")}
                aria-label="Scroll right"
                className="p-3 rounded-full border border-brand-200 bg-surface-warm text-ink-primary hover:bg-brand-50 hover:border-brand-400 transition-colors shadow-sm active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/collections/new-arrivals"
              className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5 group ml-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scrollable Products Container with Auto-Scroll & Pause on Hover/Touch */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => {
            if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = setTimeout(() => {
              setIsInteracting(false);
            }, 4000);
          }}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="trending-card-item w-[280px] sm:w-[310px] flex-shrink-0 snap-start transition-transform duration-300"
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}

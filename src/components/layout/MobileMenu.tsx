"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, ChevronDown, Phone, MapPin, Truck, Sparkles, Heart } from "lucide-react";
import { CATEGORIES } from "@/data/catalog";
import { SITE_CONFIG } from "@/lib/config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>("boys");

  if (!isOpen) return null;

  const toggleCat = (slug: string) => {
    setExpandedCat(expandedCat === slug ? null : slug);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-surface-warm h-full flex flex-col shadow-2xl z-10 overflow-y-auto no-scrollbar animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-brand-100 flex items-center justify-between bg-surface-pure">
          <Link href="/" onClick={onClose} className="block">
            <Image
              src="/images/logo.png"
              alt="Maa Sadqay"
              width={130}
              height={48}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-ink-secondary hover:bg-brand-50 hover:text-brand-600 transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Accordion */}
        <div className="flex-1 py-4 px-4 space-y-1">
          <Link
            href="/collections/new-arrivals"
            onClick={onClose}
            className="flex items-center justify-between py-3 px-3 rounded-xl font-semibold text-brand-600 bg-brand-50/70 hover:bg-brand-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ochre-500" />
              New Arrivals 2027
            </span>
            <ChevronRight className="w-4 h-4 text-brand-500" />
          </Link>

          {CATEGORIES.map((cat) => {
            const isExpanded = expandedCat === cat.slug;
            return (
              <div key={cat.slug} className="border-b border-brand-50/80 pb-1">
                <button
                  type="button"
                  onClick={() => toggleCat(cat.slug)}
                  className="w-full flex items-center justify-between py-3 px-3 rounded-xl font-medium text-ink-primary hover:bg-brand-50/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-ink-secondary bg-surface-muted px-2 py-0.5 rounded-full">
                      {cat.ageRange}
                    </span>
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-brand-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-ink-tertiary" />
                  )}
                </button>

                {isExpanded && (
                  <div className="pl-4 pr-2 pb-2 pt-1 space-y-1 bg-surface-muted/40 rounded-xl my-1">
                    <Link
                      href={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="block py-1.5 px-3 text-xs font-bold text-brand-600 hover:underline"
                    >
                      View All {cat.name} →
                    </Link>
                    {cat.subCollections.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/collections/${cat.slug}/${sub.slug}`}
                        onClick={onClose}
                        className="block py-1.5 px-3 text-xs text-ink-secondary hover:text-brand-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/collections/sale"
            onClick={onClose}
            className="flex items-center justify-between py-3 px-3 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors mt-2"
          >
            <span>Clearance Sale (Up to 60% Off)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Utility Links */}
        <div className="p-4 bg-surface-pure border-t border-brand-100 space-y-3 text-xs pb-safe">
          <Link
            href="/track-order"
            onClick={onClose}
            className="flex items-center gap-2.5 text-ink-secondary hover:text-brand-600 transition-colors"
          >
            <Truck className="w-4 h-4 text-brand-500" />
            <span>Track My Order (Vercel Tracker)</span>
          </Link>

          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2.5 text-ink-secondary hover:text-brand-600 transition-colors"
          >
            <Heart className="w-4 h-4 text-brand-500" />
            <span>My Wishlist</span>
          </Link>

          <a
            href={SITE_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-emerald-700 font-medium"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp: 0315-4245424</span>
          </a>

          <div className="pt-2 border-t border-brand-100 flex items-center justify-between text-[11px] text-ink-tertiary">
            <Link href="/about" onClick={onClose} className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" onClick={onClose} className="hover:underline">
              Contact
            </Link>
            <Link href="/policies/privacy-policy" onClick={onClose} className="hover:underline">
              Policies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Sparkles, Truck, Phone, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-900 text-brand-50 text-xs py-2 px-4 relative z-50 overflow-hidden border-b border-brand-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Store promise highlight */}
        <div className="hidden md:flex items-center gap-2 font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-ochre-300" />
          <span>Free Nationwide Delivery above Rs. 10,000 | Flat Rs. 250</span>
        </div>

        {/* Center: Running highlight on mobile / central banner */}
        <div className="flex-1 text-center md:flex-initial flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-800 text-ochre-300 text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            New Season
          </span>
          <span className="hidden sm:inline">Eastern Wear & Summer Co-ords are Live!</span>
          <Link
            href="/collections/sale"
            className="text-ochre-300 hover:text-white underline font-semibold flex items-center gap-1 ml-1"
          >
            Clearance Sale <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Quick actions */}
        <div className="hidden lg:flex items-center gap-4 text-[11px]">
          <Link
            href="/track-order"
            className="hover:text-ochre-300 transition-colors"
          >
            Track Order
          </Link>
          <span className="text-brand-700">|</span>
          <a
            href={SITE_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ochre-300 flex items-center gap-1 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>0315-4245424</span>
          </a>
        </div>
      </div>
    </div>
  );
}

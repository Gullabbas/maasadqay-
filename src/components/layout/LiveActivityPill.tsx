"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";

const LIVE_EVENTS = [
  { name: "Fatima from Lahore", item: "Royal Cobalt Kurta Pajama", time: "2 mins ago", img: "/images/FB_IMG_1773012760173.webp" },
  { name: "Zainab from Karachi", item: "Toddler Ribbed Romper Suit", time: "4 mins ago", img: "/images/toddler 2.webp" },
  { name: "Ayesha from Islamabad", item: "Festive Embroidered Waistcoat", time: "7 mins ago", img: "/images/FB_IMG_1773012846730.jpg" },
  { name: "Hira from Faisalabad", item: "Kids Beanie Cap & Mittens", time: "11 mins ago", img: "/images/Accessories 1.webp" },
];

export default function LiveActivityPill() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show first toast after 6 seconds
    const initialTimer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 6000);

    // Rotate every 16 seconds
    const interval = setInterval(() => {
      if (!dismissed) {
        setVisible(false);
        setTimeout(() => {
          setCurrentIdx((prev) => (prev + 1) % LIVE_EVENTS.length);
          setVisible(true);
        }, 1000);
      }
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const current = LIVE_EVENTS[currentIdx];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-xs bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl shadow-xl border border-brand-200/90 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-brand-50 flex-shrink-0 border border-brand-100">
        <Image src={current.img} alt={current.item} fill className="object-cover" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1 text-[10px] font-bold text-brand-600 uppercase tracking-wider">
          <Sparkles className="w-2.5 h-2.5 text-ochre-500" />
          <span>Just Ordered</span>
        </div>
        <div className="text-xs font-bold text-ink-primary truncate">
          {current.item}
        </div>
        <div className="text-[10px] text-ink-tertiary">
          {current.name} • {current.time}
        </div>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-ink-tertiary hover:text-ink-primary p-1 text-xs"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

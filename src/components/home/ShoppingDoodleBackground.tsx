"use client";

import { useEffect, useState } from "react";

// Micro-illustration doodle icons for luxury e-commerce & kids wear
const DOODLES = [
  // Shopping bag
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  // Clothes hanger
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2a3 3 0 0 0-3 3c0 1.3.8 2.4 2 2.8V9L2.5 16A2 2 0 0 0 4 19h16a2 2 0 0 0 1.5-3L13 9V7.8c1.2-.4 2-1.5 2-2.8a3 3 0 0 0-3-3Z"/>
    </svg>
  ),
  // Baby Romper / Shirt
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
    </svg>
  ),
  // Star
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z"/>
    </svg>
  ),
  // Heart
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  // Gift Box
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </svg>
  ),
  // Tag
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
    </svg>
  ),
  // Sparkle / Diamond
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>
    </svg>
  ),
  // Crown
  (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>
    </svg>
  ),
];

interface FloatingItem {
  id: number;
  doodleIdx: number;
  top: number; // percentage
  left: number; // percentage
  size: number; // pixels
  color: string;
  opacity: number;
  duration: number; // seconds
  delay: number; // seconds
  rotate: number;
}

export default function ShoppingDoodleBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate scattered WhatsApp-style doodle items
    const generated: FloatingItem[] = [
      { id: 1, doodleIdx: 0, top: 12, left: 8, size: 28, color: "#B36648", opacity: 0.18, duration: 8, delay: 0, rotate: -12 },
      { id: 2, doodleIdx: 1, top: 18, left: 24, size: 30, color: "#698070", opacity: 0.20, duration: 9, delay: 1, rotate: 15 },
      { id: 3, doodleIdx: 2, top: 28, left: 5, size: 32, color: "#D4A373", opacity: 0.16, duration: 11, delay: 2, rotate: -8 },
      { id: 4, doodleIdx: 3, top: 8, left: 45, size: 22, color: "#B36648", opacity: 0.22, duration: 7, delay: 0.5, rotate: 20 },
      { id: 5, doodleIdx: 4, top: 38, left: 40, size: 20, color: "#E29578", opacity: 0.20, duration: 10, delay: 1.5, rotate: -15 },
      { id: 6, doodleIdx: 5, top: 14, left: 88, size: 30, color: "#698070", opacity: 0.18, duration: 9, delay: 0.8, rotate: 12 },
      { id: 7, doodleIdx: 6, top: 35, left: 92, size: 26, color: "#B36648", opacity: 0.22, duration: 8.5, delay: 2.2, rotate: -10 },
      { id: 8, doodleIdx: 7, top: 60, left: 12, size: 24, color: "#D4A373", opacity: 0.25, duration: 12, delay: 1.2, rotate: 25 },
      { id: 9, doodleIdx: 8, top: 75, left: 6, size: 34, color: "#B36648", opacity: 0.15, duration: 10, delay: 0.2, rotate: -18 },
      { id: 10, doodleIdx: 0, top: 82, left: 35, size: 28, color: "#698070", opacity: 0.20, duration: 9.5, delay: 2.5, rotate: 8 },
      { id: 11, doodleIdx: 2, top: 70, left: 60, size: 30, color: "#E29578", opacity: 0.16, duration: 11, delay: 3, rotate: 14 },
      { id: 12, doodleIdx: 5, top: 85, left: 85, size: 32, color: "#D4A373", opacity: 0.18, duration: 10.5, delay: 1.8, rotate: -12 },
      { id: 13, doodleIdx: 3, top: 55, left: 88, size: 20, color: "#B36648", opacity: 0.22, duration: 7.5, delay: 0.7, rotate: 30 },
      { id: 14, doodleIdx: 7, top: 4, left: 70, size: 22, color: "#698070", opacity: 0.24, duration: 8.8, delay: 2, rotate: -5 },
    ];
    setItems(generated);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft warm radial glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-surface-warm/40 to-surface-warm" />

      {/* Subtle organic light auras */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-brand-200/25 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-sage-200/25 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />

      {/* Floating E-commerce / Shopping Doodle Icons */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        {items.map((item) => {
          const Icon = DOODLES[item.doodleIdx % DOODLES.length];
          return (
            <div
              key={item.id}
              className="absolute animate-float"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                color: item.color,
                opacity: item.opacity,
                transform: `rotate(${item.rotate}deg)`,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <Icon className="w-full h-full drop-shadow-sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

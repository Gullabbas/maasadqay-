"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const FloatingShapesScene = dynamic(
  () => import("./FloatingShapesScene"),
  { ssr: false }
);

export default function Hero3DCanvas() {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft warm brand ambient gradient always in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/60 via-surface-warm/40 to-surface-warm" />

      {mounted && !reducedMotion && inView && (
        <div className="absolute inset-0 opacity-80 transition-opacity duration-700">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <FloatingShapesScene />
          </Canvas>
        </div>
      )}

      {/* Subtle organic light orbs for fallback / depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-sage-200/30 blur-3xl" />
    </div>
  );
}

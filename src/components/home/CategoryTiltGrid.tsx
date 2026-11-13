"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  title: string;
  age: string;
  description: string;
  image: string;
  href: string;
  badge: string;
  accentColor: string;
}

function TiltCard({ title, age, description, image, href, badge, accentColor }: CategoryCardProps) {
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <Link
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className="group relative block rounded-3xl overflow-hidden bg-surface-pure border border-brand-100 shadow-soft hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Category Image with Zoom */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-brand-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Soft gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/80 via-ink-primary/20 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-ink-primary text-xs font-bold shadow-sm">
            <Sparkles className="w-3 h-3 text-ochre-500" />
            {badge}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-ochre-300">
            {age}
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-brand-100/90 line-clamp-2">
            {description}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white group-hover:text-ochre-300 transition-colors">
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryTiltGrid() {
  const categories: CategoryCardProps[] = [
    {
      title: "Toddlers Range",
      age: "6 to 24 Months",
      description: "Super-soft organic cottons, flat-lock seams, and comfort rompers crafted with motherly care.",
      image: "/images/toddler 2.webp",
      href: "/collections/toddlers",
      badge: "Gentle Skin Care",
      accentColor: "#E7C9BC",
    },
    {
      title: "Boys Collection",
      age: "2 to 14 Years",
      description: "Royal Eastern kurta pajamas, embroidered waistcoats, prince coats, and breezy casual sets.",
      image: "/images/boys.webp",
      href: "/collections/boys",
      badge: "Festive & Casual",
      accentColor: "#98AAD8",
    },
    {
      title: "Girls Collection",
      age: "2 to 14 Years",
      description: "Delightful floral co-ord sets, lawn pajama suits, and breezy summer bottoms.",
      image: "/images/girls.webp",
      href: "/collections/girls",
      badge: "Playful Co-ords",
      accentColor: "#A58E95",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-surface-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            Curated For Every Age
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary">
            Thoughtfully engineered silhouettes that allow kids to run, play, and celebrate in ultimate comfort.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <TiltCard key={idx} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

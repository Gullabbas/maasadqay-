"use client";

import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const UGC_POSTS = [
  {
    image: "/images/FB_IMG_1773012760173.webp",
    caption: "Royal cobalt festive kurta on little Ahad for his cousin's Barat.",
    handle: "@maa.sadqay",
    likes: "428",
  },
  {
    image: "/images/FB_IMG_1773012773317.webp",
    caption: "Subtle eucalyptus sage kurta for Friday Jummah prayers.",
    handle: "@maa.sadqay",
    likes: "389",
  },
  {
    image: "/images/FB_IMG_1773012846730.jpg",
    caption: "Embroidered rust waistcoat and kurta pajama ready for Eid morning.",
    handle: "@maa.sadqay",
    likes: "612",
  },
  {
    image: "/images/FB_IMG_1773012947306.jpg",
    caption: "Little Prince in honey mustard crest prince coat looking dashing.",
    handle: "@maa.sadqay",
    likes: "554",
  },
];

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function UgcInstagramWall() {
  return (
    <section className="py-16 sm:py-24 bg-surface-pure relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-200">
              <InstagramIcon className="w-3.5 h-3.5" />
              Community Moments
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-primary tracking-tight">
              Seen on Little Stars
            </h2>
            <p className="text-sm text-ink-secondary">
              Real children across Pakistan celebrating in Maa Sadqay. Tag <strong>{SITE_CONFIG.socials.instagramHandle}</strong> to be featured!
            </p>
          </div>

          <a
            href={SITE_CONFIG.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 group"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {UGC_POSTS.map((post, idx) => (
            <a
              key={idx}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-50 shadow-soft hover:shadow-xl transition-all duration-300 block"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-ink-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 text-white">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold">{post.handle}</span>
                  <div className="flex items-center gap-1 text-pink-400">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-brand-100 line-clamp-3">
                    {post.caption}
                  </p>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-ochre-300 mt-2 block">
                    View on Instagram →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

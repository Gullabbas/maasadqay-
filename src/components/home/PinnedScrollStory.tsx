"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Feather, ShieldCheck } from "lucide-react";

export default function PinnedScrollStory() {
  return (
    <section className="py-20 sm:py-28 bg-brand-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {/* Story 1: Designed with Love (Eastern Wear) - Image comes smoothly from the LEFT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Column - Slides in from LEFT */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-surface-pure group">
                <Image
                  src="/images/Eastern_03.webp"
                  alt="Designed with Love - Eastern Festive Wear"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-ochre-300">
                    Heritage Collection
                  </span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">
                    Festive Eastern Splendor
                  </h4>
                  <p className="text-xs text-brand-100/90 mt-1">
                    Kurta Pajama, embroidered waistcoats, and royal prince coats.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-5 -left-5 bg-white p-4 rounded-2xl shadow-xl border border-brand-100 max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-2 text-brand-600 mb-1">
                  <Sparkles className="w-4 h-4 text-ochre-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">Lahore Craft</span>
                </div>
                <div className="font-urdu text-base text-ink-primary font-semibold">
                  ماں کا پیار، روایتی وقار
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-current text-brand-500" />
              Story I: Designed with Love
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight leading-[1.15]">
              Tradition Reimagined for Gentle Joy
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Every Pakistani celebration is complete when our little ones dress up in authentic Eastern grace. We carefully select non-itching raw silk weaves, breathable lawn linings, and featherlight jacquards so children remain playful and joyous all day long.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-sm text-ink-primary">Zero-Itch Plackets & Collars</h5>
                  <p className="text-xs text-ink-secondary">Specially lined band necks that never irritate tender skin.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h5 className="font-bold text-sm text-ink-primary">Pre-Shrunk Festive Lawn</h5>
                  <p className="text-xs text-ink-secondary">Retains vibrant colors and crisp shape through festive gatherings.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/collections/boys/eastern-wear"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft hover:shadow-hover transition-all"
              >
                <span>Explore Eastern Wear Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Story 2: Comfort for Every Day (Basics & Co-ords) - Image comes smoothly from the RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-wider">
              <Feather className="w-3.5 h-3.5 text-sage-700" />
              Story II: Comfort for Every Day
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight leading-[1.15]">
              Breathable Fabrics for Boundless Play
            </h2>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Childhood is about climbing trees, painting outside the lines, and sweet afternoon naps. Our everyday co-ord sets and daily staples use 100% combed cotton with natural elasticated waistbands for effortless all-day movement.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-brand-100 shadow-sm">
                <div className="text-2xl font-extrabold font-display text-brand-600">100%</div>
                <div className="text-xs font-semibold text-ink-primary mt-1">Combed Cotton</div>
                <div className="text-[11px] text-ink-tertiary">Natural breathability in heat</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-brand-100 shadow-sm">
                <div className="text-2xl font-extrabold font-display text-sage-700">60+</div>
                <div className="text-xs font-semibold text-ink-primary mt-1">Washes Tested</div>
                <div className="text-[11px] text-ink-tertiary">Zero piling or color fade</div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/collections/boys/co-ord-sets"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-ink-primary hover:bg-brand-900 text-white font-bold text-sm shadow-soft transition-all"
              >
                <span>Shop Everyday Co-ords</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Column - Slides in from RIGHT */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-surface-pure group">
                <Image
                  src="/images/Comfort.webp"
                  alt="Comfort for Every Day - Daily Co-ords"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-sage-200">
                    Daily Comfort Range
                  </span>
                  <h4 className="font-display font-bold text-2xl text-white mt-1">
                    Easy Wear, Easy Care
                  </h4>
                  <p className="text-xs text-brand-100/90 mt-1">
                    Designed to keep your little ones smiling through playtime.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-2xl shadow-xl border border-brand-100 max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Certified Safe</span>
                </div>
                <div className="text-xs text-ink-secondary">
                  Non-toxic dyes & nickel-free snap buttons.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

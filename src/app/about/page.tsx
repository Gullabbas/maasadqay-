import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, MapPin, ShieldCheck, Smile, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us | Designed with Love | Maa Sadqay Lahore",
  description:
    "Learn about Maa Sadqay's journey in Lahore, Pakistan. Dedicated to crafting comfortable, premium children's Eastern wear and everyday staples at honest prices.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-surface-warm min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current text-brand-500" />
            Our Brand Story
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-ink-primary tracking-tight">
            Designed with Love for Pakistan&apos;s Little Ones
          </h1>
          <div className="font-urdu text-xl sm:text-2xl text-brand-700 font-semibold pt-1">
            ماں صدقے — پیار اور خلوص سے سجا بچپن
          </div>
          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed pt-2">
            Maa Sadqay is a heartfelt tribute to every mother in Pakistan. We craft dignified festive Eastern wear and soft everyday essentials that never compromise on childish joy.
          </p>
        </div>

        {/* Feature Image Banner */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-surface-pure">
          <Image
            src="/images/slider.webp"
            alt="Maa Sadqay Heritage Studio"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/70 via-transparent to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-lg space-y-1">
              <span className="text-xs uppercase font-bold tracking-widest text-ochre-300">
                Lahore Studio
              </span>
              <h3 className="font-display font-bold text-2xl">Karim Block, Lahore</h3>
              <p className="text-xs text-brand-100/90">
                Crafted in the cultural heart of Pakistan by generational master tailors.
              </p>
            </div>
          </div>
        </div>

        {/* The Welcome Message to Amazing Moms */}
        <div className="bg-surface-pure rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-soft space-y-6">
          <h2 className="font-display font-bold text-2xl text-ink-primary">
            A Letter to Our Amazing Moms
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-ink-secondary leading-relaxed">
            <p>
              When a child is born, a mother whispers words of infinite love. In Punjabi and Urdu, there is no phrase more tender than <strong>&ldquo;Maa Sadqay&rdquo; (ماں صدقے)</strong> — a mother placing her whole heart and soul at the service of her child&apos;s happiness.
            </p>
            <p>
              We noticed that whenever moms shopped for children&apos;s Eastern wear in Pakistan, they faced two unfortunate extremes: stiff, itchy synthetic formalwear that made kids cry, or exorbitantly marked-up designer clothes that were out of reach for regular family celebrations.
            </p>
            <p>
              We established <strong>Maa Sadqay</strong> right in Karim Block Market, Lahore, to fix this. We use soft combed cotton, breathable lawn inner linings, tag-less necklines, and gentle elastic waistbands. Kids look regal in photos, and can still play tag in the garden without scratching their necks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-600 font-bold text-base">
                <Smile className="w-5 h-5" />
                <span>Zero-Itch Guarantee</span>
              </div>
              <p className="text-xs text-ink-tertiary">
                Every collar placket is lined with soft cotton facing so young skin is always protected.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sage-700 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>Honest Pricing</span>
              </div>
              <p className="text-xs text-ink-tertiary">
                High-end boutique quality without the 300% mall markup.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-ochre-600 font-bold text-base">
                <MapPin className="w-5 h-5" />
                <span>Lahore Flagship</span>
              </div>
              <p className="text-xs text-ink-tertiary">
                First Floor, Tariq Plaza, Karim Block Market, Lahore, Pakistan.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/collections/boys"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-soft transition-all"
          >
            <span>Explore Our Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

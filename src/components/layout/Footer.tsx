"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Truck, ShieldCheck, Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { CATEGORIES } from "@/data/catalog";

export default function Footer() {
  return (
    <footer className="bg-ink-primary text-brand-50 pt-16 pb-24 lg:pb-12 border-t border-brand-900 relative overflow-hidden">
      {/* Subtle brand glow in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Feature Ticker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-ochre-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Nationwide Delivery</h4>
              <p className="text-xs text-brand-200/80 mt-0.5">
                Free on orders above Rs. 10,000. Flat Rs. 250 nationwide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-ochre-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Cash on Delivery</h4>
              <p className="text-xs text-brand-200/80 mt-0.5">
                Pay conveniently at your doorstep across all cities of Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-ochre-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">4.84★ Verified Trust</h4>
              <p className="text-xs text-brand-200/80 mt-0.5">
                Cherished by 185+ verified parents and amazing moms.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white p-3 rounded-2xl shadow-md">
              <Image
                src="/images/logo.png"
                alt="Maa Sadqay Logo"
                width={160}
                height={55}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-brand-200/80 max-w-sm leading-relaxed">
              <strong>Maa Sadqay (ماں صدقے)</strong> is designed with love in Lahore, Pakistan. We bring premium Eastern festive wear, softest co-ord sets, and everyday comfort to your little ones without the luxury markup.
            </p>
            <div className="pt-2 text-xs text-ochre-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Dedicated with heartfelt care to Pakistan&apos;s amazing moms.</span>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="font-display font-bold text-sm uppercase tracking-wider text-ochre-400 mb-4">
              Collections
            </h5>
            <ul className="space-y-2 text-xs text-brand-200/80">
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/collections/boys" className="hover:text-white transition-colors">
                  Boys Wear (2–14Y)
                </Link>
              </li>
              <li>
                <Link href="/collections/boys/eastern-wear" className="hover:text-white transition-colors">
                  Eastern Kurta & Prince Coats
                </Link>
              </li>
              <li>
                <Link href="/collections/girls" className="hover:text-white transition-colors">
                  Girls Co-ords & Suits
                </Link>
              </li>
              <li>
                <Link href="/collections/toddlers" className="hover:text-white transition-colors">
                  Toddlers (6–24M)
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="text-red-400 font-semibold hover:text-red-300 transition-colors">
                  Clearance Sale (Under 999)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-display font-bold text-sm uppercase tracking-wider text-ochre-400 mb-4">
              Help & Policies
            </h5>
            <ul className="space-y-2 text-xs text-brand-200/80">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Track Order</span>
                  <ArrowUpRight className="w-3 h-3 text-ochre-400" />
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="hover:text-white transition-colors">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Brand
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="font-display font-bold text-sm uppercase tracking-wider text-ochre-400 mb-4">
              Visit & Contact
            </h5>
            <ul className="space-y-3 text-xs text-brand-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ochre-400 flex-shrink-0 mt-0.5" />
                <span>First Floor, Tariq Plaza, Karim Block Market, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-emerald-400"
                >
                  0315-4245424 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-ochre-400 flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-3">
                  <a
                    href={SITE_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200/60">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved. Crafted with love in Lahore.
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-brand-200/80 mr-2">Payment Options:</span>
            <span className="px-2 py-1 rounded bg-white/10 text-white font-bold text-[10px]">CASH ON DELIVERY</span>
            <span className="px-2 py-1 rounded bg-white/10 text-white font-bold text-[10px]">VISA</span>
            <span className="px-2 py-1 rounded bg-white/10 text-white font-bold text-[10px]">MASTERCARD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

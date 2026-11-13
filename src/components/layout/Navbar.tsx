"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useCartStore, useWishlistStore, useSearchStore } from "@/lib/store";
import { CATEGORIES } from "@/data/catalog";
import AnnouncementBar from "./AnnouncementBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);
  const openSearch = useSearchStore((s) => s.openSearch);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const boysCategory = CATEGORIES.find((c) => c.slug === "boys");
  const girlsCategory = CATEGORIES.find((c) => c.slug === "girls");
  const saleCategory = CATEGORIES.find((c) => c.slug === "sale");

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <AnnouncementBar />

      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-soft py-2"
            : "bg-surface-warm/90 backdrop-blur-md border-b border-brand-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-xl text-ink-primary hover:bg-brand-50 hover:text-brand-600 transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="relative block group">
                <Image
                  src="/images/logo.png"
                  alt="Maa Sadqay Logo"
                  width={160}
                  height={60}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                href="/collections/new-arrivals"
                className="px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-600 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-ochre-500" />
                New Arrivals
              </Link>

              {/* Boys Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("boys")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/collections/boys"
                  className="px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-600 rounded-lg transition-colors flex items-center gap-1"
                >
                  Boys (2–14Y)
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {activeMegaMenu === "boys" && boysCategory && (
                  <div className="absolute top-full left-0 w-[600px] glass-dropdown rounded-2xl shadow-modal p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-3">
                        Sub-Collections
                      </h4>
                      <ul className="space-y-2">
                        {boysCategory.subCollections.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/collections/boys/${sub.slug}`}
                              className="text-sm text-ink-secondary hover:text-brand-600 hover:font-medium block py-0.5 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-surface-muted rounded-xl p-4 flex flex-col justify-between border border-brand-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-500 text-white px-2 py-0.5 rounded-full">
                          Festive Feature
                        </span>
                        <h5 className="font-display font-bold text-ink-primary mt-2 text-base">
                          Eastern Festive Wear
                        </h5>
                        <p className="text-xs text-ink-secondary mt-1">
                          Kurta Pajama, Prince Coats & Velvet Waistcoats tailored for joyous Pakistani celebrations.
                        </p>
                      </div>
                      <div className="relative h-48 w-full rounded-xl overflow-hidden mt-3 bg-white border border-brand-100">
                        <Image
                          src="/images/boys.webp"
                          alt="Boys Collection"
                          fill
                          className="object-contain object-top"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Girls Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu("girls")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/collections/girls"
                  className="px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-600 rounded-lg transition-colors flex items-center gap-1"
                >
                  Girls (2–14Y)
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </Link>

                {activeMegaMenu === "girls" && girlsCategory && (
                  <div className="absolute top-full left-0 w-[500px] glass-dropdown rounded-2xl shadow-modal p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-3">
                        Sub-Collections
                      </h4>
                      <ul className="space-y-2">
                        {girlsCategory.subCollections.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/collections/girls/${sub.slug}`}
                              className="text-sm text-ink-secondary hover:text-brand-600 hover:font-medium block py-0.5 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative h-48 rounded-xl overflow-hidden border border-brand-100 bg-white">
                      <Image
                        src="/images/girls.webp"
                        alt="Girls Collection"
                        fill
                        className="object-contain object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                        <span className="text-xs font-semibold text-white">
                          Playful Co-ord Sets
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toddlers Link */}
              <Link
                href="/collections/toddlers"
                className="px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-600 rounded-lg transition-colors relative"
              >
                Toddlers (6–24M)
              </Link>

              {/* Accessories Link */}
              <Link
                href="/collections/accessories"
                className="px-3 py-2 text-sm font-medium text-ink-primary hover:text-brand-600 rounded-lg transition-colors"
              >
                Accessories
              </Link>

              {/* Sale Link with Badge */}
              <Link
                href="/collections/sale"
                className="px-3 py-1.5 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors flex items-center gap-1.5 border border-red-200"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Clearance Sale
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search Button */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search Catalog"
                className="p-2 sm:p-2.5 rounded-xl text-ink-primary hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                aria-label="View Wishlist"
                className="p-2 sm:p-2.5 rounded-xl text-ink-primary hover:bg-brand-50 hover:text-brand-600 transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                aria-label="Shopping Cart"
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-brand-500 text-white hover:bg-brand-600 transition-all shadow-soft hover:shadow-hover"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-bold">
                  {totalCartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Search, Heart, ShoppingBag } from "lucide-react";
import { useCartStore, useWishlistStore, useSearchStore } from "@/lib/store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const wishlistItems = useWishlistStore((s) => s.items);
  const openSearch = useSearchStore((s) => s.openSearch);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-brand-100 lg:hidden shadow-[0_-4px_16px_rgba(38,29,26,0.06)] pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isActive("/") ? "text-brand-600 font-bold" : "text-ink-secondary hover:text-brand-600"
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* Categories */}
        <Link
          href="/collections/boys"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isActive("/collections") ? "text-brand-600 font-bold" : "text-ink-secondary hover:text-brand-600"
          }`}
        >
          <Grid className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Shop</span>
        </Link>

        {/* Search */}
        <button
          type="button"
          onClick={openSearch}
          className="flex flex-col items-center justify-center py-1 text-ink-secondary hover:text-brand-600 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Search</span>
        </button>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
            isActive("/wishlist") ? "text-brand-600 font-bold" : "text-ink-secondary hover:text-brand-600"
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-1" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">Wishlist</span>
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 relative text-ink-secondary hover:text-brand-600 transition-colors"
          aria-label="Open Cart Drawer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-1" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-600 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Cart</span>
        </button>
      </div>
    </nav>
  );
}

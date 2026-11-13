import Link from "next/link";
import { Sparkles, Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 bg-surface-warm min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-surface-pure rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-modal text-center space-y-6">
        <div className="relative inline-block">
          <span className="font-display font-extrabold text-7xl sm:text-8xl text-brand-500/20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-3xl sm:text-4xl text-brand-600">
            ماں صدقے
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-ink-primary">
            Little Explorer Wandered Off!
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            The page you are looking for has moved, taken a nap, or does not exist. Let&apos;s guide you back to our charming collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs sm:text-sm shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/collections/new-arrivals"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-surface-warm hover:bg-brand-50 text-ink-primary font-bold text-xs sm:text-sm border border-brand-200 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-ochre-500" />
            <span>Shop New Arrivals</span>
          </Link>
        </div>

        <div className="text-xs text-ink-tertiary pt-4 border-t border-brand-100">
          Need help? Tap our <strong>AI Assistant</strong> in the bottom right corner!
        </div>
      </div>
    </div>
  );
}

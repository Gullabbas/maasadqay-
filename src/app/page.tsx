import HeroSection from "@/components/home/HeroSection";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import CategoryTiltGrid from "@/components/home/CategoryTiltGrid";
import TrendingShelf from "@/components/home/TrendingShelf";
import PinnedScrollStory from "@/components/home/PinnedScrollStory";
import ClearanceSaleBanners from "@/components/home/ClearanceSaleBanners";
import BrandWelcomeSection from "@/components/home/BrandWelcomeSection";
import UgcInstagramWall from "@/components/home/UgcInstagramWall";
import HappyParentsReviews from "@/components/home/HappyParentsReviews";
import { productRepository } from "@/data/catalog";

export default async function HomePage() {
  const trendingProducts = await productRepository.getTrendingProducts();

  return (
    <div className="flex flex-col">
      {/* 1. 3D Hero */}
      <HeroSection />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. Shop by Category (3D Tilt Cards) */}
      <CategoryTiltGrid />

      {/* 4. Trending Products Shelf */}
      <TrendingShelf products={trendingProducts} />

      {/* 5. Pinned Scroll Story */}
      <PinnedScrollStory />

      {/* 6. Clearance Sale Price-Tiers */}
      <ClearanceSaleBanners />

      {/* 7. Welcome to Maa Sadqay */}
      <BrandWelcomeSection />

      {/* 8. Instagram / UGC Wall */}
      <UgcInstagramWall />

      {/* 9. Happy Parents Verified Reviews */}
      <HappyParentsReviews />
    </div>
  );
}

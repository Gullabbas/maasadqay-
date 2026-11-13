import type { Metadata } from "next";
import "@/styles/globals.css";
import { SITE_CONFIG } from "@/lib/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/layout/CartDrawer";
import SearchModal from "@/components/layout/SearchModal";
import AiOrderChatbot from "@/components/chat/AiOrderChatbot";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorSpotlight from "@/components/layout/CursorSpotlight";
import LiveActivityPill from "@/components/layout/LiveActivityPill";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.maasadqay.com"),
  title: {
    default: "Maa Sadqay | Designed With Love | Kids Clothing Lahore, Pakistan",
    template: "%s | Maa Sadqay",
  },
  description:
    "Flagship Pakistani kids clothing brand. Shop premium Eastern wear, kurta pajamas, prince coats, waistcoats, and everyday breathable co-ord sets with Cash on Delivery nationwide.",
  keywords: [
    "Maa Sadqay",
    "Kids Clothing Pakistan",
    "Boys Eastern Wear",
    "Kurta Pajama Boys",
    "Prince Coat Kids",
    "Waistcoat Set Boys",
    "Toddler Clothes Lahore",
    "Kids Co-ord Sets",
    "Children Clothing Online Pakistan",
  ],
  authors: [{ name: "Maa Sadqay" }],
  openGraph: {
    title: "Maa Sadqay | Designed With Love",
    description: "Premium kids Eastern festive wear & casuals. Lahore, Pakistan.",
    url: "https://www.maasadqay.com",
    siteName: "Maa Sadqay",
    images: [
      {
        url: "/images/slider.webp",
        width: 1880,
        height: 1058,
        alt: "Maa Sadqay Kids Collection",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: SITE_CONFIG.name,
    image: "https://www.maasadqay.com/images/logo.png",
    description: SITE_CONFIG.welcomeSubhead,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address,
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    priceRange: "Rs. 499 - Rs. 4,500",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE_CONFIG.reviews.averageRating.toString(),
      reviewCount: SITE_CONFIG.reviews.totalCount.toString(),
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-ink-primary bg-surface-warm selection:bg-brand-500 selection:text-white overflow-x-hidden">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen overflow-x-hidden">{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
          <SearchModal />
          <AiOrderChatbot />
          <CursorSpotlight />
          <LiveActivityPill />
        </SmoothScroll>
      </body>
    </html>
  );
}

# MAA SADQAY (ماں صدقے) — Flagship E-Commerce Platform

> **Agency Standard 2027 E-Commerce Experience** for Maa Sadqay (Lahore, Pakistan). Built with Next.js 15 (App Router), React 19, React Three Fiber (3D), GSAP storytelling, Tailwind CSS tokens, and an autonomous bilingual AI Order-Taker Chatbot.

---

## 🌟 Key Highlights

- **Original Creative Design:** Completely departs from the generic Shopify theme. Features soft organic 3D floating shapes, mouse/gyro parallax, 3D tilt product cards, and pinned storytelling layers.
- **Brand Tokens Derived from Logo:** Visual identity sampled programmatically from `logo.png` (`#B36648` Rose Terracotta), paired with Eucalyptus Sage (`#698070`) and Warm Cream surfaces.
- **100% Real Assets:** Uses exclusively the provided images from `/maasadqay` for slider banners, categories, products, and UGC masonry walls.
- **Autonomous AI Order-Taker Chatbot:** Floating launcher with pulse & tooltip, desktop glassmorphism panel (380×600) and mobile full-height sheet. Conducts complete conversational commerce with product search, size picker, Pakistani phone validation (`03XX-XXXXXXX`), order placement (`MS-YYMMDD-XXXX`), and direct WhatsApp link generation.
- **Complete Route Coverage:** 18+ routes implemented including Boys, Girls, Toddlers, Women, Accessories, Clearance Sale tiers (Under 999, 799, 599), Cart, Checkout, Wishlist, Search, Track Order, About, and 4 policy pages.
- **Legacy 301 Redirects:** Handles Shopify typos seamlessly (e.g. `/collections/toodlers` -> `/collections/toddlers`).

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js `v18.18+` or `v20+` or `v24+`
- npm `v9+` / `v10+` / `v11+`

### 2. Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Verification
To test the production build:
```bash
npm run build
npm run start
```

### 4. Running the Automated Verification Tests
Run the test suite verifying search, Pakistani phone validation, shipping rules, and order ID formatting:
```bash
node scripts/test-order-flow.cjs
```

---

## 📁 Project Architecture

```
/
├── public/
│   └── images/                     # 15 real brand assets & logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts       # AI Chatbot conversational order engine
│   │   │   └── orders/route.ts     # Zod validated order creation endpoint
│   │   ├── collections/            # Boys, Girls, Toddlers, Women, Accessories, Sale
│   │   ├── products/[slug]/        # Rich PDP with 3D tilt, zoom, size chart modal
│   │   ├── cart/ & checkout/       # Guest checkout with Pakistani validation & COD
│   │   ├── wishlist/               # LocalStorage persisted favorites
│   │   ├── search/                 # Instant search overlay & full page
│   │   ├── track-order/            # Deep link & embed for maasadqay-tracking.vercel.app
│   │   ├── about/ & contact/       # Brand narrative and studio inquiries
│   │   ├── policies/               # Shipping, Refund, Privacy, Terms
│   │   ├── layout.tsx              # Root layout with fonts, JSON-LD, Lenis smooth scroll
│   │   └── page.tsx                # 10-step flagship home storytelling flow
│   ├── components/
│   │   ├── 3d/                     # React Three Fiber Canvas & Floating Shapes
│   │   ├── chat/                   # Floating AI Order Assistant & Drawer
│   │   ├── ecommerce/              # ProductCard, QuickViewModal, SizeChartModal
│   │   ├── home/                   # Hero, Marquee, TiltCards, PinnedStory, UgcWall
│   │   └── layout/                 # Navbar, MegaMenu, MobileBottomNav, Footer, CartDrawer
│   ├── data/
│   │   └── catalog.ts              # Typed ProductRepository & catalog data
│   ├── lib/
│   │   ├── config.ts               # Brand constants, phone, shipping rules
│   │   ├── store.ts                # Zustand store (Cart, Wishlist, Chat UI)
│   │   └── utils.ts                # Order ID generator, phone validator, price formatter
│   ├── styles/
│   │   └── globals.css             # Tailwind directives & CSS design tokens
│   └── types/
│       └── index.ts                # Complete TypeScript domain contracts
├── docs/
│   ├── design-system.md            # Color tokens, typography, and motion guidelines
│   └── chatbot.md                  # Chatbot state machine and tool schemas
├── scripts/
│   └── test-order-flow.cjs         # Automated test script
└── assets-manifest.json            # Complete asset inventory with dimensions
```

---

## 🛠️ How to Edit the Catalog & Assets

1. **Adding/Editing Products:**
   Open `src/data/catalog.ts`. All products are strongly typed via the `Product` interface in `src/types/index.ts`.
   You can add or modify products by adding to the `PRODUCTS` array:
   ```typescript
   {
     id: "prod-9",
     slug: "boys-emerald-embroidered-kurta",
     sku: "BEW05",
     name: "Boys Emerald Festive Kurta",
     category: "boys",
     subCollection: "eastern-wear",
     price: 2650,
     originalPrice: 5300,
     discountPercent: 50,
     images: ["/images/your-image.webp"],
     sizes: ["3-4Y", "5-6Y", "7-8Y"],
     colors: [{ name: "Emerald", hex: "#1B4D3E" }],
     inStock: true,
     details: ["100% Breathable Lawn", "Dry clean or gentle hand wash"]
   }
   ```

2. **Swapping to Shopify Storefront API (Phase 2 Ready):**
   The codebase is built on the `ProductRepository` interface in `src/types/index.ts`.
   To switch from the local JSON store to Shopify:
   - Create a `ShopifyProductRepository` class implementing `ProductRepository`.
   - In `src/data/catalog.ts`, replace `export const productRepository = new LocalProductRepository()` with your new instance.
   - None of your UI components or pages will require changing!

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Next.js.
4. (Optional) Set your environment variables from `.env.example`:
   - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (if using external LLM for chatbot streaming)
   - `NEXT_PUBLIC_SITE_URL` = `https://www.maasadqay.com`
5. Click **Deploy**. Your site will be live worldwide in under 2 minutes!

---

## 📞 Brand & Contact Information

- **Brand:** Maa Sadqay ("ماں صدقے")
- **Studio Address:** First Floor, Tariq Plaza, Karim Block Market, Lahore, Pakistan
- **Helpline / WhatsApp:** 0315-4245424 ([wa.me/923154245424](https://wa.me/923154245424))
- **Email:** maasadqay11@gmail.com
- **Live Order Tracker:** [maasadqay-tracking.vercel.app](https://maasadqay-tracking.vercel.app/)
- **Instagram:** [@maa.sadqay](https://instagram.com/maa.sadqay)

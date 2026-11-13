export const SITE_CONFIG = {
  name: "Maa Sadqay",
  legalName: "Maa Sadqay Kids Wear",
  urduName: "ماں صدقے",
  tagline: "Designed with Love",
  welcomeHeadline: "Welcome to Maa Sadqay",
  welcomeSubhead: "Crafted with motherly affection for Pakistan's little ones.",
  currency: "Rs.",
  currencyCode: "PKR",
  shipping: {
    freeThreshold: 10000,
    flatRate: 250,
    deliveryDays: "3-5 Business Days",
    bannerText: "Free shipping nationwide on orders above Rs. 10,000 | Flat Rs. 250 shipping nationwide | Delivery in 3-5 days",
  },
  reviews: {
    averageRating: 4.84,
    totalCount: 185,
    tagline: "Loved by 185+ Verified Happy Parents Across Pakistan",
  },
  contact: {
    phone: "0315-4245424",
    phoneClean: "923154245424",
    whatsappUrl: "https://wa.me/923154245424",
    email: "maasadqay11@gmail.com",
    address: "First Floor, Tariq Plaza, Karim Block Market, Lahore, Pakistan",
    city: "Lahore",
    country: "Pakistan",
  },
  socials: {
    instagram: "https://instagram.com/maa.sadqay",
    instagramHandle: "@maa.sadqay",
    instagramAlt: "https://instagram.com/maasadqay.official", // Flagged for client confirmation
    facebook: "https://facebook.com/maasadqay3",
  },
  orderTrackingUrl: "https://maasadqay-tracking.vercel.app/",
  paymentMethods: [
    { id: "COD", name: "Cash on Delivery", badge: "Most Popular", enabled: true },
    { id: "Card", name: "Credit / Debit Card (Visa/Mastercard)", badge: "Instant", enabled: true },
    { id: "BankTransfer", name: "Direct Bank Transfer", badge: "Manual Verification", enabled: true },
  ],
};

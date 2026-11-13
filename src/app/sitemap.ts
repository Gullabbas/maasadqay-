import { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.maasadqay.com";

  // Core static routes
  const staticRoutes = [
    "",
    "/collections/new-arrivals",
    "/collections/boys",
    "/collections/girls",
    "/collections/toddlers",
    "/collections/women",
    "/collections/accessories",
    "/collections/sale",
    "/collections/sale/under-999",
    "/collections/sale/under-799",
    "/collections/sale/under-599",
    "/cart",
    "/checkout",
    "/wishlist",
    "/search",
    "/about",
    "/contact",
    "/track-order",
    "/policies/privacy-policy",
    "/policies/refund-policy",
    "/policies/shipping-policy",
    "/policies/terms-of-service",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Sub-collection routes
  const subCollectionRoutes: MetadataRoute.Sitemap = [];
  CATEGORIES.forEach((cat) => {
    cat.subCollections.forEach((sub) => {
      subCollectionRoutes.push({
        url: `${baseUrl}/collections/${cat.slug}/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    });
  });

  // Dynamic Product PDP routes
  const productRoutes = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...subCollectionRoutes, ...productRoutes];
}

export type ProductCategory =
  | 'boys'
  | 'girls'
  | 'toddlers'
  | 'women'
  | 'accessories'
  | 'sale'
  | 'new-arrivals';

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  description: string;
  category: ProductCategory;
  subCollection: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isClearance?: boolean;
  clearanceTier?: 'under-999' | 'under-799' | 'under-599';
  rating: number;
  reviewCount: number;
  details: string[];
  tags: string[];
};

export type CartItem = {
  id: string; // Composite unique key: `${productId}-${size}-${color}`
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type CustomerInfo = {
  fullName: string;
  phoneNumber: string;
  city: string;
  address: string;
  email?: string;
  paymentMethod: 'COD' | 'Card' | 'BankTransfer';
  orderNotes?: string;
};

export type Order = {
  id: string; // MS-YYMMDD-XXXX
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'COD' | 'Card' | 'BankTransfer';
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered';
  createdAt: string;
  trackingUrl: string;
  whatsappUrl: string;
};

export type Review = {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName?: string;
};

export interface ProductRepository {
  getAllProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductsByCategory(category: string, subCollection?: string): Promise<Product[]>;
  getTrendingProducts(): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  getSaleProducts(tier?: string): Promise<Product[]>;
  searchProducts(query: string, filters?: ProductFilterOptions): Promise<Product[]>;
}

export type ProductFilterOptions = {
  category?: string;
  subCollection?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  colors?: string[];
  inStockOnly?: boolean;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'discount' | 'newest';
};

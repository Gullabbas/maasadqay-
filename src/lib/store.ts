import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { SITE_CONFIG } from "./config";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string, color?: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getFreeShippingProgress: () => number; // 0 to 100%
  getAmountForFreeShipping: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, size, color = product.colors[0]?.name || "Standard", quantity = 1) => {
        set((state) => {
          const id = `${product.id}-${size}-${color}`;
          const existing = state.items.find((item) => item.id === id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { id, product, size, color, quantity }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= SITE_CONFIG.shipping.freeThreshold ? 0 : SITE_CONFIG.shipping.flatRate;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingFee();
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        return Math.min(100, Math.round((subtotal / SITE_CONFIG.shipping.freeThreshold) * 100));
      },

      getAmountForFreeShipping: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, SITE_CONFIG.shipping.freeThreshold - subtotal);
      },
    }),
    {
      name: "maasadqay-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

interface WishlistState {
  items: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.items.includes(productId);
          return {
            items: exists
              ? state.items.filter((id) => id !== productId)
              : [...state.items, productId],
          };
        });
      },
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    {
      name: "maasadqay-wishlist",
    }
  )
);

interface SearchState {
  isOpen: boolean;
  query: string;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isOpen: false,
  query: "",
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: "" }),
  setQuery: (query) => set({ query }),
}));

interface ChatUIState {
  isOpen: boolean;
  hasInteracted: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

export const useChatUIStore = create<ChatUIState>((set) => ({
  isOpen: false,
  hasInteracted: false,
  openChat: () => set({ isOpen: true, hasInteracted: true }),
  closeChat: () => set({ isOpen: false }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen, hasInteracted: true })),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToLocalCart: (productId: number, quantity?: number) => void;
  removeFromLocalCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  setCart: (items: CartItem[]) => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // 👉 thêm vào cart local (chưa login)
      addToLocalCart: (productId, quantity = 1) => {
        const items = get().items;

        const existing = items.find(i => i.productId === productId);

        if (existing) {
          set({
            items: items.map(i =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { productId, quantity }],
          });
        }
      },

      removeFromLocalCart: (productId) => {
        set({
          items: get().items.filter(i => i.productId !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromLocalCart(productId);
          return;
        }
        set({
          items: get().items.map(i =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      setCart: (items) => set({ items }),

      getCartTotal: () => get().items.length,
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
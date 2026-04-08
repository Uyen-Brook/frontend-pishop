import { create } from "zustand";

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addToLocalCart: (productId: number, quantity?: number) => void;
  removeFromLocalCart: (productId: number) => void;
  clearCart: () => void;

  setCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
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

  clearCart: () => set({ items: [] }),

  setCart: (items) => set({ items }),
}));
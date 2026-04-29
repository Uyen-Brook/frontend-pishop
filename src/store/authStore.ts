import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/index.ts";
import { storage } from "../utils/storage.js";
import { CartService } from "../service/user/CartService.js";
import { useCartStore } from "./CartStore.js";

export interface AuthState {
  user: DecodedToken | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (token: string) => DecodedToken | null;
  logout: () => void;
  initFromStorage: () => void;
  isTokenValid: () => boolean;
  clearExpiredToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  isTokenValid: () => {
    const { token } = get();
    if (!token) return false;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;
      return decoded.exp ? decoded.exp > now : false;
    } catch {
      return false;
    }
  },

  clearExpiredToken: () => {
    if (!get().isTokenValid()) {
      storage.clearToken();
      // storage.clearLocalCart();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },

  initFromStorage: () => {
    const token = storage.getToken();
    if (!token) {
      set({ isInitialized: true });
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;

      // Token còn hạn
      if (decoded.exp && decoded.exp > now) {
        set({
          token,
          user: decoded,
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        // Token hết hạn
        storage.clearToken();
        useCartStore.getState().clearCart();
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      }
    } catch {
      storage.clearToken();
      useCartStore.getState().clearCart();
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },

  login: (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      storage.setToken(token);

      // Set state trước
      set({
        token,
        user: decoded,
        isAuthenticated: true,
        isInitialized: true,
      });

      // Sau khi state đã được set, truyền auth state trực tiếp để đồng bộ cart
      CartService.syncLocalCartToServer({
        isAuthenticated: true,
        accountId: decoded.accountId,
      });

      return decoded;
    } catch {
      set({ isInitialized: true });
      return null;
    }
  },

  logout: () => {
    storage.clearToken();
    // Clear local cart (CartStore dùng zustand persist nên tự clear)
    useCartStore.getState().clearCart();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
  getAccountId: () => {
    const { user } = get();
    return user?.accountId ?? null;
  },
}));


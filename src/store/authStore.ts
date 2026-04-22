import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../types/index.ts";
import { storage } from "../utils/storage.js";

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
      storage.clearLocalCart();
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
        storage.clearLocalCart();
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      }
    } catch {
      storage.clearToken();
      storage.clearLocalCart();
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
      storage.clearLocalCart(); // Xóa cart local khi login
      set({
        token,
        user: decoded,
        isAuthenticated: true,
        isInitialized: true,
      });
      return decoded;
    } catch {
      set({ isInitialized: true });
      return null;
    }
  },

  logout: () => {
    storage.clearToken();
    storage.clearLocalCart();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));


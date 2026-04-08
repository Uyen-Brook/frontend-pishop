import { create } from "zustand";
import {jwtDecode} from "jwt-decode";
import type {DecodedToken} from "../types/index.ts";
import { storage } from "../utils/storage.js";

export interface AuthState {
  user: DecodedToken | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  initFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  initFromStorage: () => {
    const token = storage.getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        storage.clearToken();
        return;
      }
      set({
        token,
        user: decoded,
        isAuthenticated: true,
      });
    } catch {
      storage.clearToken();
    }
  },

  login: (token: string) => {
    storage.setToken(token);
    const decoded = jwtDecode<DecodedToken>(token);
    set({
      token,
      user: decoded,
      isAuthenticated: true,
    });
  },

  logout: () => {
    storage.clearToken();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));


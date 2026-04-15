const TOKEN_KEY = "access_token";
const CART_KEY = "local_cart";

export interface LocalCartItem {
  productId: number;
  quantity: number;
  addedAt: number;
}

export const storage = {
  // Token Management
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Local Cart Management
  getLocalCart(): LocalCartItem[] {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  setLocalCart(items: LocalCartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },

  clearLocalCart() {
    localStorage.removeItem(CART_KEY);
  },

  addToLocalCart(productId: number, quantity: number = 1) {
    const cart = this.getLocalCart();
    const existing = cart.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity, addedAt: Date.now() });
    }

    this.setLocalCart(cart);
  },

  removeFromLocalCart(productId: number) {
    const cart = this.getLocalCart().filter((item) => item.productId !== productId);
    this.setLocalCart(cart);
  },

  updateLocalCartQuantity(productId: number, quantity: number) {
    const cart = this.getLocalCart();
    const item = cart.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
      this.setLocalCart(cart);
    }
  },
};

import type { Cart, CartItem } from "../../types/index";
import { useAuthStore } from "../../store/authStore";
import { storage } from "../../utils/storage";

export const mockCart: Cart = {
  cartId: 1,
  items: [
    {
      basePrice: 22990000.00,
      discountType: 'PERCENT',
      discountValue: 10.00,
      endDate: '2026-12-31',
      finalPrice: 20691000.00,
      modelNumber: 'A3090',
      productId: 2,
      productName: 'iPhone 15 128GB',
      promotionName: 'Giảm 10% Laptop',
      quantity: 2,
      startDate: '2026-01-01',
      stockQuantity: 8,
      thumbnail: 'iphone15.png',
      selected: false
    },
    {
      basePrice: 20990000.00,
      discountType: 'FIXED_AMOUNT',
      discountValue: 50000.00,
      endDate: '2026-12-31',
      finalPrice: 20940000.00,
      modelNumber: 'SM-S921B',
      productId: 3,
      productName: 'Samsung Galaxy S24',
      promotionName: 'Giảm 50k phụ kiện',
      quantity: 3,
      startDate: '2026-01-01',
      stockQuantity: 10,
      thumbnail: 's24.png',
      selected: false
    },
    {
      basePrice: 28990000.00,
      discountType: 'PERCENT',
      discountValue: 10.00,
      endDate: '2026-12-31',
      finalPrice: 26091000.00,
      modelNumber: 'MLY13SA/A',
      productId: 1,
      productName: 'MacBook Air M2 2023',
      promotionName: 'Giảm 10% Laptop',
      quantity: 1,
      startDate: '2026-01-01',
      stockQuantity: 5,
      thumbnail: 'macbook_air_m2.png',
      selected: false
    }
  ],
  totalPrice: 130293000.00
};

export const CartService = {
  /**
   * Lấy giỏ hàng của user
   * - Nếu user đã login: lấy từ API (dùng mockCart cho demo)
   * - Nếu chưa login: lấy từ localStorage (local cart)
   */
  async getCartByAccountId(accountId: number): Promise<Cart> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const authStore = useAuthStore.getState();
        
        // Kiểm tra token còn hạn không
        authStore.clearExpiredToken();
        
        if (authStore.isAuthenticated && authStore.isTokenValid()) {
          // User đã login và token còn hạn - lấy từ API
          // TODO: Thay bằng API call khi backend ready
          resolve(mockCart);
        } else {
          // Chưa login - lấy từ local cart
          const localCartItems = storage.getLocalCart();
          const cart: Cart = {
            cartId: 0,
            items: localCartItems.map((item) => ({
              basePrice: 0,
              discountType: 'PERCENT' as const,
              discountValue: 0,
              endDate: '',
              finalPrice: 0,
              modelNumber: '',
              productId: item.productId,
              productName: 'Product',
              promotionName: '',
              quantity: item.quantity,
              startDate: '',
              stockQuantity: 0,
              thumbnail: '',
              selected: false
            })),
            totalPrice: 0
          };
          resolve(cart);
        }
      }, 300);
    });
  },

  /**
   * Lấy loại giỏ hàng hiện tại (local hoặc server)
   */
  getCartType(): 'local' | 'server' {
    const authStore = useAuthStore.getState();
    authStore.clearExpiredToken();
    return authStore.isAuthenticated && authStore.isTokenValid() ? 'server' : 'local';
  }
};

// API implementation (uncomment when backend is ready)
// import apiClient from "../api";
// export const CartService = {
//   async getCartByAccountId(accountId: number): Promise<Cart> {
//     return apiClient
//       .get(`/api/cart/${accountId}`)
//       .then((res) => res.data);
//   }
// };
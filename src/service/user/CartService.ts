import type { Cart, CartItem } from "../../types/index";
import { useAuthStore } from "../../store/authStore";
import { storage } from "../../utils/storage";
import { API_BASE_URL } from "../../config/env";
import { apiClient } from "../api";
import { useCartStore } from "../../store/CartStore";

// ============================================
// HELPER FUNCTIONS - Tái sử dụng logic
// ============================================


const getAccountIdFromToken = (): number | null => {
  const authStore = useAuthStore.getState();
  return authStore.user?.accountId ?? null;
};

/** Kiểm tra auth hợp lệ */
const isAuthenticated = (): boolean => {
  const authStore = useAuthStore.getState();
  authStore.clearExpiredToken();
  return authStore.isAuthenticated && authStore.isTokenValid();
};

/** Lấy token hiện tại */
const getToken = (): string | null => {
  const authStore = useAuthStore.getState();
  return authStore.token;
};

/** Tạo headers cho API call có auth */
const getAuthHeaders = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Thực hiện action với auth check
 * @param serverAction Function gọi API khi đã login
 * @param localAction Function gọi khi chưa login
 */
const handleAuthAction = async <T>(
  serverAction: (accountId: number) => Promise<T>,
  localAction: () => Promise<T>
): Promise<T> => {
  const accountId = getAccountIdFromToken();
  
  if (isAuthenticated() && accountId) {
    return serverAction(accountId);
  } else {
    return localAction();
  }
};

export const CartService = {
  /**
   * Đồng bộ cart từ local lên server
   * @param authState - Truyền auth state trực tiếp để đảm bảo chính xác
   */
  async syncLocalCartToServer(authState?: {
    isAuthenticated: boolean;
    accountId: number | null;
    user?: { accountId?: number } | null;
  }): Promise<void> {
    // Sử dụng authState truyền vào hoặc lấy từ store
    const auth = authState ?? useAuthStore.getState();
    
    // Tách rõ: nếu truyền authState thì dùng accountId, nếu không thì lấy từ user
    let accountId: number | null = null;
    if (authState) {
      accountId = authState.accountId ?? authState.user?.accountId ?? null;
    } else {
      const storeAuth = useAuthStore.getState();
      accountId = storeAuth.user?.accountId ?? null;
    }
    
    if (!auth.isAuthenticated || !accountId) {
      console.log("Chưa login, không cần đồng bộ cart");
      return;
    }

    const localItems = useCartStore.getState().items;
    if (localItems.length === 0) {
      console.log("Local cart rỗng, không cần đồng bộ");
      return;
    }

    try {
      const headers = getAuthHeaders();
      
      // Gọi API đồng bộ từng item
      await Promise.all(
        localItems.map((item) =>
          apiClient.post(
            `${API_BASE_URL}/user/cart/${accountId}/add?productId=${item.productId}&quantity=${item.quantity}`
          )
        )                                                                                                               
      );
      // Sau khi đồng bộ thành công, clear local cart
      useCartStore.getState().clearCart();
      console.log(`Đồng bộ ${localItems.length} sản phẩm lên server thành công`);

    } catch (error) {
      console.error("Lỗi đồng bộ cart:", error);
      throw error;
    }
  },

  /**
   * Lấy giỏ hàng của user
   */
  async getCartByAccountId(_accountId: number): Promise<Cart> {
    return handleAuthAction(
      async (accountId) => {
        const response = await apiClient.get(`${API_BASE_URL}/user/cart/${accountId}`, {
          headers: getAuthHeaders(),
        });
        return response.data as Cart;
      },
      async () => {
        // Chưa login → lấy từ CartStore (zustand persist)
      const localItems = useCartStore.getState().items;
      const cart: Cart = {
        cartId: 0,
        items: localItems.map((item) => ({
          basePrice: 0,
          discountType: "PERCENT" as const,
          discountValue: 0,
          endDate: "",
          finalPrice: 0,
          modelNumber: "",
          productId: item.productId,
          productName: "Product",
          promotionName: "",
          quantity: item.quantity,
          startDate: "",
          stockQuantity: 0,
          thumbnail: "",
          selected: false,
        })),
        totalPrice: 0,
      };
      return cart;
      }
    );
  },

  // Thêm vào cart
  async addToCart(productId: number, quantity: number): Promise<void> {
    return handleAuthAction(
      async (accountId) => {
        await apiClient.post(
          `${API_BASE_URL}/user/cart/${accountId}/add?productId=${productId}&quantity=${quantity}`,
          {},
          { headers: getAuthHeaders() }
        );
        console.log("Thêm vào giỏ hàng thành công (backend)");
      },
      async () => {
        useCartStore.getState().addToLocalCart(productId, quantity);
        console.log("Thêm vào giỏ hàng thành công (local)");
      }
    );
  },

  async removeFromCart(productId: number): Promise<void> {
    return handleAuthAction(
      async (accountId) => {
        await apiClient.delete(
          `${API_BASE_URL}/user/cart/${accountId}/remove/${productId}`,
          { headers: getAuthHeaders() }
        );
        console.log("Xóa khỏi giỏ hàng thành công (backend)");
      },
      async () => {
        useCartStore.getState().removeFromLocalCart(productId);
        console.log("Xóa khỏi giỏ hàng thành công (local)");
      }
    );
  },

  async updateCartItem(productId: number, quantity: number): Promise<void> {
    return handleAuthAction(
      async (accountId) => {
        await apiClient.put(
          `${API_BASE_URL}/user/cart/${accountId}/update/${productId}/${quantity}`,
          {},
          { headers: getAuthHeaders() }
        );
        console.log("Cập nhật giỏ hàng thành công (backend)");
      },
      async () => {
        useCartStore.getState().updateQuantity(productId, quantity);
        console.log("Cập nhật giỏ hàng thành công (local)");
      }
    );
  },

  /**
   * Lấy loại giỏ hàng hiện tại (local hoặc server)
   */
  getCartType(): "local" | "server" {
    return isAuthenticated() ? "server" : "local";
  },

  /**
   * Legacy method - giữ tương thích ngược
   * @deprecated Sử dụng syncLocalCartToServer() thay thế
   */
  async asynCartToServer(_params: {} = {}): Promise<void> {
    return this.syncLocalCartToServer();
  },
};


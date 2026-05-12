import { apiClient } from "../api";
import { useAuthStore } from "../../store/authStore";
import axios from "axios";

export interface OrderItem {
  productName: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}

// Types for creating order
export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  accountId: number;
  toName: string;
  toPhone: string;
  toProvinceCode: string;
  toWardCode: string;
  toAddress: string;
  voucherCode?: string;
  paymentMethod: "COD" | "BANK";
  items: OrderItemRequest[];
}

export interface CreateOrderResponse {
  id: number;
  status: string;
  message?: string;
}
interface VNPayResponse {
  paymentUrl: string;
}

export const orderService = {
  // =====================================================
  // 1. CREATE ORDER
  // =====================================================
  async createOrder(
    request: CreateOrderRequest
  ): Promise<CreateOrderResponse> {
    const res = await apiClient.post<CreateOrderResponse>(
      "/user/orders/create",
      request
    );
    return res.data;
  },

  // =====================================================
  // 2. GET ORDERS BY ACCOUNT
  // =====================================================
  async getUserOrders(): Promise<Order[]> {
    try {
      const accountId = useAuthStore.getState().user?.accountId;

      if (!accountId) return [];

      const res = await apiClient.get<Order[]>(
        `/user/orders/by-account/${accountId}`
      );

      return res.data || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // =====================================================
  // 3. GET ORDER BY ID (⚠️ backend chưa có endpoint chuẩn)
  // =====================================================
  async getOrderById(id: number): Promise<Order | null> {
    try {
      const res = await apiClient.get<Order>(
        `/user/orders/${id}`
      );
      return res.data || null;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  },

  // =====================================================
  // 4. CANCEL ORDER (FIXED theo backend CancelOrderRequest)
  // =====================================================
  async cancelOrder(orderId: number): Promise<boolean> {
    try {
      const accountId = useAuthStore.getState().user?.accountId;

      if (!accountId) return false;

      await apiClient.post("/user/orders/cancel", {
        orderId,
        accountId,
      });

      return true;
    } catch (error) {
      console.error("Error canceling order:", error);
      return false;
    }
  },

  // =====================================================
  // 5. VNPay
  // =====================================================
  async submitOrder(
    orderId: number,
    orderTotal: number,
    orderInfo: string
  ): Promise<string | null> {
    try {
      const res = await apiClient.post<VNPayResponse>(
        "/public/submitOrder",
        null,
        {
          params: {
            orderId,
            amount: orderTotal,
            orderInfo,
          },
        }
      );

      return res.data.paymentUrl || null;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  },

  // =====================================================
  // 6. FILTER BY STATUS (mapping backend endpoints)
  // =====================================================
  async getOrdersByStatus(status: string): Promise<Order[]> {
    const res = await apiClient.get<Order[]>(
      `/user/orders/by-status`,
      { params: { status } }
    );
    return res.data;
  },

  // =====================================================
  // 7. PURCHASE HISTORY
  // =====================================================
  async getPurchaseHistory(): Promise<Order[]> {
    const accountId = useAuthStore.getState().user?.accountId;

    if (!accountId) return [];

    const res = await apiClient.get<Order[]>(
      `/user/orders/purchase-history/${accountId}`
    );

    return res.data;
  },

  // =====================================================
  // 8. UNPAID BANK ORDERS
  // =====================================================
  async getUnpaidBankOrders(): Promise<Order[]> {
    const accountId = useAuthStore.getState().user?.accountId;

    if (!accountId) return [];

    const res = await apiClient.get<Order[]>(
      `/user/orders/unpaid-bank/${accountId}`
    );

    return res.data;
  },

  // =====================================================
  // 9. WRAPPER STATUS HELPERS (clean frontend usage)
  // =====================================================

  getPendingOrders: () =>
    orderService.getOrdersByStatus("PENDING"),

  getConfirmedOrders: () =>
    orderService.getOrdersByStatus("CONFIRMED"),

  getProcessingOrders: () =>
    orderService.getOrdersByStatus("PROCESSING"),

  getPreparingOrders: () =>
    orderService.getOrdersByStatus("PREPARING"),

  getShippingOrders: () =>
    orderService.getOrdersByStatus("SHIPPING"),

  getDeliveredOrders: () =>
    orderService.getOrdersByStatus("DELIVERED"),

  getReturnedOrders: () =>
    orderService.getOrdersByStatus("RETURNED"),

  getCompletedOrders: () =>
    orderService.getOrdersByStatus("COMPLETED"),

  getCancelledOrders: () =>
    orderService.getOrdersByStatus("CANCELLED"),
};

  // async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse | null> {
  //   try {
  //     const response = await apiClient.post<CreateOrderResponse>("/user/orders/create", request);
  //     return response.data || null;
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     throw error;
  //   }
  // },

//  async submitOrder(
//   orderId: number,
//   orderTotal: number,
//   orderInfo: string
// ): Promise<string | null> {

//   try {

//     const response =
//       await apiClient.post<VNPayResponse>(
//         "/public/submitOrder",
//         null,
//         {
//           params: {
//             orderId: orderId,
//             amount: orderTotal,
//             orderInfo: orderInfo,
//           },
//         }
//       );

//     return response.data.paymentUrl || null;

//   } catch (error) {

//     console.error(
//       "Error submitting order for payment:",
//       error
//     );

//     throw error;
//   }




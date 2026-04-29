import { apiClient } from "../api";
import { useAuthStore } from "../../store/authStore";

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

// Mock data
const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    createdAt: "2024-01-15T10:30:00Z",
    status: "DELIVERED",
    totalAmount: 1250000,
    items: [
      {
        productName: "iPhone 15 Pro Max",
        image: "https://via.placeholder.com/60",
        quantity: 1,
        price: 1250000
      }
    ]
  },
  {
    id: 1002,
    createdAt: "2024-01-20T14:20:00Z",
    status: "SHIPPING",
    totalAmount: 890000,
    items: [
      {
        productName: "AirPods Pro 2",
        image: "https://via.placeholder.com/60",
        quantity: 2,
        price: 445000
      }
    ]
  },
  {
    id: 1003,
    createdAt: "2024-01-25T09:15:00Z",
    status: "PENDING",
    totalAmount: 450000,
    items: [
      {
        productName: "Samsung Galaxy S24",
        image: "https://via.placeholder.com/60",
        quantity: 1,
        price: 450000
      }
    ]
  }
];
export const orderService = {
  async getUserOrders(): Promise<Order[]> {
    try {
      const accountId = useAuthStore.getState().user?.accountId;
      const response = await apiClient.get<Order[]>(`/user/orders/${accountId}`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Return mock data for testing
      return MOCK_ORDERS;
    }
  },

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const response = await apiClient.get<Order>(`/user/orders/${id}`);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  },

  async cancelOrder(id: number): Promise<boolean> {
    try {
      await apiClient.put(`/user/orders/${id}/cancel`);
      return true;
    } catch (error) {
      console.error("Error canceling order:", error);
      return false;
    }
  },

  async createOrder(request: CreateOrderRequest): Promise<CreateOrderResponse | null> {
    try {
      const response = await apiClient.post<CreateOrderResponse>("/user/orders/create", request);
      return response.data || null;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  async submitOrder(orderTotal: number, orderInfo: string): Promise<string | null> {
    try {
      const response = await apiClient.post<string>(`/user/orders/submitOrder`, null, {
        params: {
          amount: orderTotal,
          orderInfo: orderInfo,
        },
      });
      return response.data || null;
    } catch (error) {
      console.error("Error submitting order for payment:", error);
      throw error;
    }
  },
}

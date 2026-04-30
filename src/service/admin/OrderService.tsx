// orderService.ts
import { apiClient } from "../api";
import { OrderStatus, PayStatus, ProductStatus, PaymentMethod, DiscountType} from "../../types";

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  accountId?: number;
  toName?: string;
  toPhone?: string;
  toProvinceCode?: string;
  toWardCode?: string;
  toAddress?: string;
  voucherCode?: string;
  paymentMethod?: PaymentMethod;
  items: OrderItemRequest[];
}

export interface OrderProductResponse {
  id: number;
  modelName?: string;
  thumbnail?: string;
  price?: number;
  modelNumber?: string;
  quanlity?: number;
  productStatus?: ProductStatus;
  brandName?: string;
  categoryName?: string;
}

export interface OrderPromotionResponse {
  id: number;
  name?: string;
  discountType?: DiscountType;
  discountValue?: number;
  description?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface OrderItemResponse {
  id: number;
  quantity: number;
  price?: number;
  discountPrice?: number;
  promotionId?: number;

  product?: OrderProductResponse;
  promotion?: OrderPromotionResponse;
}

export interface OrderResponse {
  id: number;

  toPhone?: string;
  toName?: string;
  toAddress?: string;

  wardName?: string;
  provinceName?: string;

  totalAmount?: number;
  discountAmount?: number;

  voucherCode?: string;
  shipFee?: number;
  trackingNumber?: string;

  orderStatus?: OrderStatus;
  paymentMethod?: PaymentMethod;
  payStatus?: PayStatus;

  createAt?: string;
  lastUpdate?: string;

  items?: OrderItemResponse[];
}

export interface OrderSearchParams {
  keyword?: string;
  status?: OrderStatus;
  accountId?: number;
}

const BASE_URL = "/admin/orders";

export const OrderService = {
  /**
   * GET ALL
   */
  async getAll(): Promise<OrderResponse[]> {
    const response = await apiClient.get(
      BASE_URL
    );

    return response.data;
  },

  /**
   * GET DETAIL
   */
  async getById(
    id: number
  ): Promise<OrderResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    params: OrderSearchParams
  ): Promise<OrderResponse[]> {
    const response = await apiClient.get(
      `${BASE_URL}/search`,
      {
        params,
      }
    );

    return response.data;
  },

  /**
   * CREATE ORDER
   */
  async create(
    request: OrderRequest
  ): Promise<OrderResponse> {
    const response = await apiClient.post(
      BASE_URL,
      request
    );

    return response.data;
  },

  /**
   * UPDATE ORDER
   */
  async update(
    id: number,
    request: OrderRequest
  ): Promise<OrderResponse> {
    const response = await apiClient.put(
      `${BASE_URL}/${id}`,
      request
    );

    return response.data;
  },

  /**
   * CHANGE STATUS
   */
  async changeStatus(
    id: number,
    status: OrderStatus
  ): Promise<OrderResponse> {
    const response = await apiClient.patch(
      `${BASE_URL}/${id}/status`,
      null,
      {
        params: { status },
      }
    );

    return response.data;
  },

  /**
   * CANCEL ORDER
   */
  async cancel(
    id: number
  ): Promise<OrderResponse> {
    const response = await apiClient.patch(
      `${BASE_URL}/${id}/cancel`
    );

    return response.data;
  },

  /**
   * DELETE ORDER
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(
      `${BASE_URL}/${id}`
    );
  },
};
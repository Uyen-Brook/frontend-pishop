// promotionService.ts
import { apiClient } from "../api";
import { DiscountType } from "../../types";

export interface PromotionRequest {
  name?: string;
  discountType?: DiscountType;
  discountValue?: number;
  description?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  productIds?: number[];
}

export interface PromotionResponse {
  id: number;
  name: string;
  discountType: DiscountType;
  discountValue: number;
  description?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  productIds?: number[];
}

const BASE_URL = "/admin/promotions";

export const PromotionService = {
  /**
   * CREATE
   */
  async create(
    request: PromotionRequest
  ): Promise<PromotionResponse> {
    const response = await apiClient.post(
      BASE_URL,
      request
    );

    return response.data;
  },

  /**
   * UPDATE
   */
  async update(
    id: number,
    request: PromotionRequest
  ): Promise<PromotionResponse> {
    const response = await apiClient.patch(
      `${BASE_URL}/${id}`,
      request
    );

    return response.data;
  },

  /**
   * DELETE
   */
  async delete(id: number): Promise<string> {
    const response = await apiClient.delete(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * GET ALL
   */
  async getAll(): Promise<PromotionResponse[]> {
    const response = await apiClient.get(
      BASE_URL
    );

    return response.data;
  },

  /**
   * GET BY ID
   */
  async getById(
    id: number
  ): Promise<PromotionResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * ASSIGN PROMOTION TO PRODUCT
   */
  async assignPromotionToProduct(
    promotionId: number,
    productId: number
  ): Promise<string> {
    const response = await apiClient.post(
      `${BASE_URL}/${promotionId}/assign/${productId}`
    );

    return response.data;
  },
};
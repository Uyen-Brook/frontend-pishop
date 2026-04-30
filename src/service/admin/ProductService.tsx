// productService.ts
import { apiClient } from "../api";
import { ProductStatus, DiscountType } from "../../types";

export interface ProductCreateRequest {
  modelName?: string;
  specification?: string;
  thumbnail?: string;
  description?: string;
  importPrice?: number;
  taxVat?: number;
  price?: number;
  modelNumber?: string;
  listImage?: string;
  quanlity?: number;
  productStatus?: ProductStatus;
  brandId?: number;
  supplierId?: number;
  categoryId?: number;
}

export interface ProductUpdateRequest
  extends ProductCreateRequest {}

export interface ProductResponse {
  id: number;
  modelName: string;
  modelNumber?: string;
  thumbnail?: string;

  price?: number;
  productStatus?: ProductStatus;
  createAt?: string;
  updateAt?: string;
  quantity?: number;

  description?: string;
  specification?: Record<string, string>;
  listImage?: string[];

  discountPercent?: number;
  discountValue?: number;
  discountType?: DiscountType;
  promotionDescription?: string;
  promotionName?: string;

  brandName?: string;
  supplierName?: string;
  categoryName?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProductSearchParams {
  keyword?: string;
  categoryId?: number;
  brandId?: number;
  supplierId?: number;
  deleted?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

const BASE_URL = "/admin/products";

export const ProductService = {
  /**
   * CREATE
   */
  async create(
    request: ProductCreateRequest
  ): Promise<ProductResponse> {
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
    request: ProductUpdateRequest
  ): Promise<ProductResponse> {
    const response = await apiClient.put(
      `${BASE_URL}/${id}`,
      request
    );

    return response.data;
  },

  /**
   * GET DETAIL
   */
  async getById(
    id: number
  ): Promise<ProductResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * GET ALL
   */
  async getAll(
    page = 0,
    size = 10,
    sort?: string
  ): Promise<PageResponse<ProductResponse>> {
    const response = await apiClient.get(
      BASE_URL,
      {
        params: {
          page,
          size,
          sort,
        },
      }
    );

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    params: ProductSearchParams
  ): Promise<PageResponse<ProductResponse>> {
    const response = await apiClient.get(
      `${BASE_URL}/search`,
      {
        params,
      }
    );

    return response.data;
  },

  /**
   * SOFT DELETE
   */
  async softDelete(
    id: number
  ): Promise<void> {
    await apiClient.delete(
      `${BASE_URL}/${id}`
    );
  },

  /**
   * HARD DELETE
   */
  async hardDelete(
    id: number
  ): Promise<void> {
    await apiClient.delete(
      `${BASE_URL}/${id}/hard`
    );
  },

  /**
   * RESTORE
   */
  async restore(
    id: number
  ): Promise<void> {
    await apiClient.patch(
      `${BASE_URL}/${id}/restore`
    );
  },

  /**
   * CHANGE STATUS
   */
  async changeStatus(
    id: number,
    status: ProductStatus
  ): Promise<ProductResponse> {
    const response = await apiClient.patch(
      `${BASE_URL}/${id}/status`,
      null,
      {
        params: { status },
      }
    );

    return response.data;
  },
};
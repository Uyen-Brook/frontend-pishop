import type {
  ProductSumaryResponse,
  ProductResponse,
  PageResponse,
} from "../../types";

import apiClient from "../api";

// ============================
// PAGINATION PARAMS
// ============================
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

// ============================
// FILTER PARAMS
// ============================
export interface ProductFilterParams
  extends PaginationParams {

  categoryId?: number;
  brandId?: number;
  supplierId?: number;
}

// ============================
// PRODUCT SERVICE
// ============================
export const productService = {

  // ============================
  // GET ALL PRODUCTS
  // ============================
  async getAll(
    params?: PaginationParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          "/products",
          {
            params: {
              page: params?.page ?? 0,
              size: params?.size ?? 10,
              sort: params?.sort ?? "id,desc",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Error fetching products:",
        error
      );

      return emptyPage<ProductSumaryResponse>();
    }
  },

  // ============================
  // GET PRODUCT DETAIL
  // ============================
  async getById(
    id: number
  ): Promise<ProductResponse | null> {

    try {

      const response =
        await apiClient.get<ProductResponse>(
          `/product/${id}`
        );

      return response.data;

    } catch (error) {

      console.error(
        "Error fetching product detail:",
        error
      );

      return null;
    }
  },

  // ============================
  // GET BY CATEGORY
  // ============================
  async getByCategory(
    categoryId: number,
    params?: PaginationParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          `/product/category/${categoryId}`,
          {
            params: {
              page: params?.page ?? 0,
              size: params?.size ?? 10,
              sort: params?.sort ?? "id,desc",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Không có sản phẩm phù hợp category",
        error
      );

      return emptyPage<ProductSumaryResponse>();
    }
  },

  // ============================
  // GET BY BRAND
  // ============================
  async getByBrand(
    brandId: number,
    params?: PaginationParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          `/product/brand/${brandId}`,
          {
            params: {
              page: params?.page ?? 0,
              size: params?.size ?? 10,
              sort: params?.sort ?? "id,desc",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Không có sản phẩm phù hợp brand",
        error
      );

      return emptyPage<ProductSumaryResponse>();
    }
  },

  // ============================
  // GET BY SUPPLIER
  // ============================
  async getBySupplier(
    supplierId: number,
    params?: PaginationParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          `/supplier/${supplierId}`,
          {
            params: {
              page: params?.page ?? 0,
              size: params?.size ?? 10,
              sort: params?.sort ?? "id,desc",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Không có sản phẩm phù hợp supplier",
        error
      );

      return emptyPage<ProductSumaryResponse>();
    }
  },

  // ============================
  // FILTER PRODUCTS
  // ============================
  async filterProducts(
    filters: ProductFilterParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          "/filter",
          {
            params: {
              brandId: filters.brandId,
              categoryId: filters.categoryId,
              supplierId: filters.supplierId,
              page: filters.page ?? 0,
              size: filters.size ?? 10,
              sort: filters.sort ?? "id,desc",
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Không thể filter products",
        error
      );

      return emptyPage<ProductSumaryResponse>();
    }
  },
};

// ============================
// EMPTY PAGE
// ============================
function emptyPage<T>(): PageResponse<T> {

  return {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 10,
    number: 0,
    first: true,
    last: true,
  };
}
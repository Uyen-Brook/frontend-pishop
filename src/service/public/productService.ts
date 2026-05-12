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

  keyword?: string;

  categoryId?: number;

  brandId?: number;

  supplierId?: number;
}

// ============================
// DEFAULT PAGINATION
// ============================
const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;
const DEFAULT_SORT = "createAt,desc";

// ============================
// BUILD PAGINATION PARAMS
// ============================
function buildPaginationParams(
  params?: PaginationParams
) {
  return {
    page: params?.page ?? DEFAULT_PAGE,
    size: params?.size ?? DEFAULT_SIZE,
    sort: params?.sort ?? DEFAULT_SORT,
  };
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
          "/public/products",
          {
            params: buildPaginationParams(params),
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
          `/public/products/${id}`
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
  // SEARCH PRODUCTS
  // ============================
  async searchProducts(
    keyword: string,
    params?: PaginationParams
  ): Promise<PageResponse<ProductSumaryResponse>> {

    try {

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          "/public/products/search",
          {
            params: {
              keyword,
              ...buildPaginationParams(params),
            },
          }
        );

      return response.data;

    } catch (error) {

      console.error(
        "Không thể search products",
        error
      );

      return emptyPage<ProductSumaryResponse>();
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
          `/public/products/category/${categoryId}`,
          {
            params: buildPaginationParams(params),
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
          `/public/products/brand/${brandId}`,
          {
            params: buildPaginationParams(params),
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
          `/public/products/supplier/${supplierId}`,
          {
            params: buildPaginationParams(params),
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

      const params: any = {
        page: filters.page ?? DEFAULT_PAGE,
        size: filters.size ?? DEFAULT_SIZE,
        sort: filters.sort ?? DEFAULT_SORT,
      };

      // keyword
      if (filters.keyword) {
        params.keyword = filters.keyword;
      }

      // brand
      if (filters.brandId !== undefined) {
        params.brandId = filters.brandId;
      }

      // category
      if (filters.categoryId !== undefined) {
        params.categoryId = filters.categoryId;
      }

      // supplier
      if (filters.supplierId !== undefined) {
        params.supplierId = filters.supplierId;
      }

      const response =
        await apiClient.get<
          PageResponse<ProductSumaryResponse>
        >(
          "/public/products/filter",
          { params }
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
    size: DEFAULT_SIZE,
    number: DEFAULT_PAGE,
    first: true,
    last: true,
  };
}
import { apiClient } from "../api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { PageResponse } from "../../types/index";
import { ProductSumaryResponse } from "../../types/index";

export interface PageableParams {
  page?: number;
  size?: number;
  sort?: string;
}

const DEFAULT_PAGEABLE: PageableParams = {
  page: 0,
  size: 8,
  sort: "id,desc",
};

async function fetchProducts(
  url: string,
  params?: PageableParams,
  errorMessage?: string
): Promise<PageResponse<ProductSumaryResponse>> {
  try {
    const response = await apiClient.get<PageResponse<ProductSumaryResponse>>(
      url,
      {
        params: {
          ...DEFAULT_PAGEABLE,
          ...params,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw getErrorMessage(error, errorMessage ?? "Lỗi tải sản phẩm");
  }
}

export const FeatureService = {
  // ===== TOP DISCOUNT =====
  getTopDiscountProducts(params?: PageableParams) {
    return fetchProducts(
      "/public/products/top-discount",
      params,
      "Lấy sản phẩm giảm giá thất bại"
    );
  },

  // ===== TOP SELLING =====
  getTopBestSellingProducts(params?: PageableParams) {
    return fetchProducts(
      "/public/products/top-selling",
      params,
      "Lấy sản phẩm bán chạy thất bại"
    );
  },

  // ===== TOP NEWEST (TOP 8 NỔI TIẾNG / MỚI NHẤT) =====
  getTopNewestProducts(params?: PageableParams) {
    return fetchProducts(
      "/public/products/top-newest",
        params,
      "Lấy sản phẩm mới nhất thất bại"
    );
  },

  // ===== BY CATEGORY =====
  getTopSellingByCategory(categoryId: number, params?: PageableParams) {
    return fetchProducts(
      `/public/products/top-selling/category/${categoryId}`,
      params,
      "Lấy sản phẩm theo danh mục thất bại"
    );
  },

  // ===== BY SUPPLIER =====
  getTopSellingBySupplier(supplierId: number, params?: PageableParams) {
    return fetchProducts(
      `/public/products/top-selling/supplier/${supplierId}`,
      params,
      "Lấy sản phẩm theo nhà cung cấp thất bại"
    );
  },

  // ===== BY BRAND =====
  getTopSellingByBrand(brandId: number, params?: PageableParams) {
    return fetchProducts(
      `/public/products/top-selling/brand/${brandId}`,
      params,
      "Lấy sản phẩm theo thương hiệu thất bại"
    );
  },
};
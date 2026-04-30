// supplierService.ts
import { apiClient } from "../api";

export interface SupplierRequest {
  name?: string;
  taxcode?: string;
  email?: string;
  phone?: string;
  address?: string;
  note?: string;
  website?: string;
}

export interface SupplierResponse {
  id: number;
  name: string;
  logo?: string;
  taxcode?: string;
  phone?: string;
  address?: string;
}

const BASE_URL = "/admin/suppliers";

export const SupplierService = {
  /**
   * Tạo supplier
   */
  async createSupplier(
    data: SupplierRequest,
    logo?: File
  ): Promise<SupplierResponse> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await apiClient.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  /**
   * Cập nhật supplier
   */
  async updateSupplier(
    id: number,
    data: SupplierRequest,
    logo?: File
  ): Promise<SupplierResponse> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await apiClient.patch(
      `${BASE_URL}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  /**
   * Xóa supplier
   */
  async deleteSupplier(id: number): Promise<string> {
    const response = await apiClient.delete(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * Lấy tất cả supplier
   */
  async getAllSuppliers(): Promise<SupplierResponse[]> {
    const response = await apiClient.get(BASE_URL);

    return response.data;
  },

  /**
   * Search supplier
   */
  async searchSuppliers(
    keyword?: string
  ): Promise<SupplierResponse[]> {
    const response = await apiClient.get(
      `${BASE_URL}/search`,
      {
        params: { keyword },
      }
    );

    return response.data;
  },

  /**
   * Lấy supplier theo id
   */
  async getSupplierById(
    id: number
  ): Promise<SupplierResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },
};
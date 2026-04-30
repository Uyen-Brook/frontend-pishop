// supplierService.ts
import { apiClient } from "../api";
import { SupplierRequest, SupplierResponse, SupplierDetailResponse } from "../../types/index";

const BASE_URL = "/admin/suppliers";

export const SupplierService = {
  /**
   * CREATE
   */
  async create(
    request: SupplierRequest,
    logo?: File
  ): Promise<SupplierResponse> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (logo) {
      formData.append("logo", logo);
    }

    const response = await apiClient.post(
      BASE_URL,
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
   * UPDATE
   */
  async update(
    id: number,
    request: SupplierRequest,
    logo?: File
  ): Promise<SupplierResponse> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
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
  async getAll(): Promise<SupplierResponse[]> {
    const response = await apiClient.get(BASE_URL);

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
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
   * GET BY ID
   */
  async getById(
    id: number
  ): Promise<SupplierDetailResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },
};
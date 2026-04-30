// categoryService.ts
import { apiClient } from "../api";

export interface CategoryRequest {
  name?: string;
  description?: string;
  icon?: string;
  note?: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  note?: string;
}

const BASE_URL = "/admin/categories";

export const CategoryService = {
  /**
   * CREATE
   */
  async create(
    request: CategoryRequest,
    image?: File
  ): Promise<CategoryResponse> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
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
    request: CategoryRequest,
    image?: File
  ): Promise<CategoryResponse> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await apiClient.put(
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
  async getAll(): Promise<CategoryResponse[]> {
    const response = await apiClient.get(BASE_URL);

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    keyword?: string
  ): Promise<CategoryResponse[]> {
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
  ): Promise<CategoryResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },
};
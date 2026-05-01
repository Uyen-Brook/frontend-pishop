// categoryService.ts
import { apiClient } from "../api";

export interface CategoryRequest {
  name: string;
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

const buildFormData = (
  request: CategoryRequest,
  image?: File
): FormData => {
  const formData = new FormData();

  formData.append("name", request.name);

  if (request.description) {
    formData.append("description", request.description);
  }

  if (request.icon) {
    formData.append("icon", request.icon);
  }

  if (request.note) {
    formData.append("note", request.note);
  }

  if (image) {
    formData.append("image", image);
  }

  return formData;
};

export const CategoryService = {
  /**
   * CREATE
   */
  async create(
    request: CategoryRequest,
    image?: File
  ): Promise<CategoryResponse> {
    const formData = buildFormData(request, image);

    const response = await apiClient.post<CategoryResponse>(
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
    const formData = buildFormData(request, image);

    const response = await apiClient.put<CategoryResponse>(
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
    const response = await apiClient.delete<string>(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * GET ALL
   */
  async getAll(): Promise<CategoryResponse[]> {
    const response = await apiClient.get<CategoryResponse[]>(
      BASE_URL
    );

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    keyword?: string
  ): Promise<CategoryResponse[]> {
    const response = await apiClient.get<CategoryResponse[]>(
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
    const response = await apiClient.get<CategoryResponse>(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },
};
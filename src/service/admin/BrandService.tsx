import { apiClient } from "../api";

// =========================
// TYPES
// =========================

export interface BrandRequest {
  name: string;
  website?: string;
  image?: File;
}

export interface BrandResponse {
  id: number;
  name: string;
  website?: string;
  image?: string;
}

// =========================
// SERVICE
// =========================

const BASE_URL = "/admin/brands";

export const brandService = {
  // =====================
  // CREATE
  // =====================
  create: async (data: BrandRequest) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.website) {
      formData.append("website", data.website);
    }

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await apiClient.post<BrandResponse>(
      BASE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  // =====================
  // UPDATE
  // =====================
  update: async (id: number, data: BrandRequest) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.website) {
      formData.append("website", data.website);
    }

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await apiClient.put<BrandResponse>(
      `${BASE_URL}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  // =====================
  // DELETE
  // =====================
  delete: async (id: number) => {
    const res = await apiClient.delete<string>(
      `${BASE_URL}/${id}`
    );
    return res.data;
  },

  // =====================
  // GET ALL
  // =====================
  getAll: async () => {
    const res = await apiClient.get<BrandResponse[]>(
      BASE_URL
    );
    return res.data;
  },

  // =====================
  // GET BY ID
  // =====================
  getById: async (id: number) => {
    const res = await apiClient.get<BrandResponse>(
      `${BASE_URL}/${id}`
    );
    return res.data;
  },

  // =====================
  // SEARCH
  // =====================
  search: async (keyword: string) => {
    const res = await apiClient.get<BrandResponse[]>(
      `${BASE_URL}/search`,
      {
        params: { keyword },
      }
    );

    return res.data;
  },
};
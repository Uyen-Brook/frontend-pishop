import apiClient from "../api";

const API_BASE_URL = "/admin/sliders";

/**
 * TYPES
 */
export interface SliderResponse {
  id: number;
  title: string;
  imageUrl: string;
  redirectUrl: string;
  sortOrder: number;
  active: boolean;
}

export interface SliderRequest {
  title: string;
  image?: File;
  redirectUrl: string;
  sortOrder: number;
  active: boolean;
}

/**
 * SERVICE
 */
export const sliderService = {
  // set active
  setActive: async (
    id: number,
    active: boolean
  ): Promise<SliderResponse> => {
    const res = await apiClient.put<SliderResponse>(
      `${API_BASE_URL}/${id}/active`,
      null,
      {
        params: { active },
      }
    );

    return res.data;
  },
  /**
   * CREATE (POST /api/admin/sliders)
   */
  create: async (data: SliderRequest): Promise<SliderResponse> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("redirectUrl", data.redirectUrl);
    formData.append("sortOrder", String(data.sortOrder));
    formData.append("active", String(data.active));

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await apiClient.post<SliderResponse>(
      API_BASE_URL,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  },

  /**
   * UPDATE (PUT /api/admin/sliders/{id})
   */
  update: async (
    id: number,
    data: SliderRequest
  ): Promise<SliderResponse> => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("redirectUrl", data.redirectUrl);
    formData.append("sortOrder", String(data.sortOrder));
    formData.append("active", String(data.active));

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await apiClient.put<SliderResponse>(
      `${API_BASE_URL}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  },

  /**
   * DELETE (DELETE /api/admin/sliders/{id})
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`${API_BASE_URL}/${id}`);
  },

  /**
   * GET ALL (GET /api/admin/sliders)
   */
  getAll: async (): Promise<SliderResponse[]> => {
    const res = await apiClient.get<SliderResponse[]>(API_BASE_URL);
    return res.data;
  },

  /**
   * GET BY ID (GET /api/admin/sliders/{id})
   */
  getById: async (id: number): Promise<SliderResponse> => {
    const res = await apiClient.get<SliderResponse>(
      `${API_BASE_URL}/${id}`
    );
    return res.data;
  },

  /**
   * SEARCH (GET /api/admin/sliders/search?keyword=)
   */
  search: async (keyword: string): Promise<SliderResponse[]> => {
    const res = await apiClient.get<SliderResponse[]>(
      `${API_BASE_URL}/search`,
      {
        params: { keyword },
      }
    );
    return res.data;
  },

  /**
   * GET ACTIVE (GET /api/admin/sliders/active)
   */
  getActive: async (): Promise<SliderResponse[]> => {
    const res = await apiClient.get<SliderResponse[]>(
      `${API_BASE_URL}/active`
    );
    return res.data;
  },

  /**
   * GET UNACTIVE (GET /api/admin/sliders/unactive)
   */
  getUnactive: async (): Promise<SliderResponse[]> => {
    const res = await apiClient.get<SliderResponse[]>(
      `${API_BASE_URL}/unactive`
    );
    return res.data;
  },
};
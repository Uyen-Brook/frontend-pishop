
import apiClient from "../api";

export interface UserSliderResponse {
  id: number;
  title?: string;
  imageUrl: string;
  redirectUrl?: string;
  sortOrder?: number;
  active?: boolean;
}
export const userSliderService = {
  // Get all active sliders
  getAll: async (): Promise<UserSliderResponse[]> => {
    const response = await apiClient.get(`/public/sliders`);

    return response.data;
  },
};
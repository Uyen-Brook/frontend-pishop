import apiClient from "../api";

const API_BASE_URL = "/public/suppliers";

export interface SupplierResponse {
  id: number;
  name: string;
  logo?: string;
  description?: string;
}

export const supplierService = {
  // Get all suppliers
  getAll: async (): Promise<SupplierResponse[]> => {
    const response = await apiClient.get(API_BASE_URL);
    return response.data;
  },
};

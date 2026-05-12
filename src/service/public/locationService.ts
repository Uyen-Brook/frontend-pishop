import { apiClient } from "../api";

export interface Province {
  code: string;
  codeName:string;
  fullName: string;
  fullNameEn: string;
  name: string;
  nameEn: string;
}

export interface Ward {
  code: string;
  name: string;
  codeName:string;
  fullName: string;
  fullNameEn: string;
  nameEn: string;
  provinceCode: string;
}

class LocationService {
  /**
   * Get all provinces/cities
   */
  async getProvinces(): Promise<Province[]> {
    try {
      const response = await apiClient.get<Province[]>("/public/location/provinces");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching provinces:", error);
      return [];
    }
  }

  /**
   * Get wards by province code
   */
  async getWardsByProvinceCode(provinceCode: string): Promise<Ward[]> {
    try {
      const response = await apiClient.get<Ward[]>(`/public/location/wards/provinces/${provinceCode}`);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  }

  /**
   * Get province by code
   */
  async getProvinceByCode(code: string): Promise<Province | null> {
    try {
      const response = await apiClient.get<Province>(`/public/locations/provinces/${code}`);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching province:", error);
      return null;
    }
  }

  /**
   * Get ward by code
   */
  async getWardByCode(code: string): Promise<Ward | null> {
    try {
      const response = await apiClient.get<Ward>(`/public/locations/wards/code/${code}`);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching ward:", error);
      return null;
    }
  }
}

export default new LocationService();

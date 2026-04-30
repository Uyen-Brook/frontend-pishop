// warrantyAcceptanceService.ts
import { apiClient } from "../api";

export type DeviceAccountStatus =
  | "ACTIVE"
  | "LOCKED"
  | "UNKNOWN";

export type DataStatus =
  | "SAFE"
  | "LOST"
  | "BACKUP"
  | "UNKNOWN";

export interface WarrantyAcceptanceRequest {
  serialNumber?: string;

  customerName?: string;
  phone?: string;
  email?: string;

  productStatus?: string;
  problem?: string;
  accessories?: string;

  accountStatus?: DeviceAccountStatus;
  password?: string;
  dataStatus?: DataStatus;

  estimate?: string;
}

export interface WarrantyAcceptanceResponse {
  id: number;

  startDate?: string;

  customerName?: string;
  phone?: string;
  email?: string;

  serialNumber?: string;
  productName?: string;
  modelNumber?: string;
  thumbnail?: string;

  productStatus?: string;
  problem?: string;
  accessories?: string;

  accountStatus?: DeviceAccountStatus;
  password?: string;
  dataStatus?: DataStatus;

  estimate?: string;

  warrantyPeriod?: number;
  soldDate?: string;
  inWarranty?: boolean;
}

const BASE_URL = "/admin/warranty";

export const WarrantyAcceptanceService = {
  /**
   * GET ALL
   */
  async getAll(): Promise<
    WarrantyAcceptanceResponse[]
  > {
    const response = await apiClient.get(
      BASE_URL
    );

    return response.data;
  },

  /**
   * GET DETAIL
   */
  async getById(
    id: number
  ): Promise<WarrantyAcceptanceResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${id}`
    );

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    keyword?: string
  ): Promise<WarrantyAcceptanceResponse[]> {
    const response = await apiClient.get(
      `${BASE_URL}/search`,
      {
        params: { keyword },
      }
    );

    return response.data;
  },

  /**
   * CREATE
   */
  async create(
    request: WarrantyAcceptanceRequest
  ): Promise<WarrantyAcceptanceResponse> {
    const response = await apiClient.post(
      BASE_URL,
      request
    );

    return response.data;
  },

  /**
   * UPDATE
   */
  async update(
    id: number,
    request: WarrantyAcceptanceRequest
  ): Promise<WarrantyAcceptanceResponse> {
    const response = await apiClient.put(
      `${BASE_URL}/${id}`,
      request
    );

    return response.data;
  },

  /**
   * DELETE
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(
      `${BASE_URL}/${id}`
    );
  },
};
// serialNumberService.ts
import { apiClient } from "../api";

export type SerialStatus =
  | "IN_STOCK"
  | "SOLD"
  | "WARRANTY"
  | "RETURNED"
  | "DEFECTIVE";

export interface SerialNumberRequest {
  serialNumber?: string;
  productId?: number;
//   importPrice?: number;
//   warehouseLocation?: string;
//   sellingPrice?: number;
  warrantyPeriod?: number;
}

export interface SerialNumberResponse {
  serialNumber: string;

  productId?: number;
  productName?: string;
  modelNumber?: string;
  thumbnail?: string;

//   importPrice?: number;
//   sellingPrice?: number;
//   warehouseLocation?: string;

  warrantyPeriod?: number;

  status?: SerialStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface SerialNumberSearchParams {
  keyword?: string;
  status?: SerialStatus;
}

const BASE_URL = "/admin/serial-numbers";

export const SerialNumberService = {
  /**
   * GET ALL
   */
  async getAll(): Promise<
    SerialNumberResponse[]
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
    serialNumber: string
  ): Promise<SerialNumberResponse> {
    const response = await apiClient.get(
      `${BASE_URL}/${serialNumber}`
    );

    return response.data;
  },

  /**
   * SEARCH
   */
  async search(
    params: SerialNumberSearchParams
  ): Promise<SerialNumberResponse[]> {
    const response = await apiClient.get(
      `${BASE_URL}/search`,
      {
        params,
      }
    );

    return response.data;
  },

  /**
   * CREATE
   */
  async create(
    request: SerialNumberRequest
  ): Promise<SerialNumberResponse> {
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
    serialNumber: string,
    request: SerialNumberRequest
  ): Promise<SerialNumberResponse> {
    const response = await apiClient.put(
      `${BASE_URL}/${serialNumber}`,
      request
    );

    return response.data;
  },

  /**
   * CHANGE STATUS
   */
  async changeStatus(
    serialNumber: string,
    status: SerialStatus
  ): Promise<SerialNumberResponse> {
    const response = await apiClient.patch(
      `${BASE_URL}/${serialNumber}/status`,
      null,
      {
        params: { status },
      }
    );

    return response.data;
  },

  /**
   * DELETE
   */
  async delete(
    serialNumber: string
  ): Promise<void> {
    await apiClient.delete(
      `${BASE_URL}/${serialNumber}`
    );
  },
};
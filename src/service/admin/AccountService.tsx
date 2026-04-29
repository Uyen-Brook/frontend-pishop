import { apiClient } from "../api";
import { API_BASE_URL } from "../../config/env";
import { AccountRank, UserRole } from "../../types";
export enum AccountRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface Account {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: AccountRole;
  locked: boolean;
  enabled: boolean;
  createdAt?: string;
}

export interface PageableResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const AdminAccountService = {
  /**
   * Reset mật khẩu tài khoản
   */
  async resetPassword(
    id: number,
    newPassword: string
  ): Promise<APIResponse<string>> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/reset-password`,
      {},
      {
        params: {
          newPassword,
        },
      }
    );

    return response.data;
  },

  /**
   * Khóa tài khoản
   */
  async lockAccount(id: number): Promise<APIResponse<string>> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/lock`,
      {}
    );

    return response.data;
  },

  /**
   * Mở khóa tài khoản
   */
  async unlockAccount(id: number): Promise<APIResponse<string>> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/unlock`,
      {}
    );

    return response.data;
  },

  /**
   * Tìm kiếm tài khoản có phân trang
   */
  async searchAccounts(
    q: string = "",
    page: number = 0,
    size: number = 10
  ): Promise<APIResponse<PageableResponse<Account>>> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts/search`,
      {
        params: {
          q,
          page,
          size,
        },
      }
    );

    return response.data;
  },

  /**
   * Lấy danh sách account theo role
   */
  async getAccountsByRole(
    role: AccountRole
  ): Promise<APIResponse<Account[]>> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts/by-role`,
      {
        params: {
          role,
        },
      }
    );

    return response.data;
  },
};
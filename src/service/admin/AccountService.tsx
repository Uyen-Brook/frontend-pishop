import { apiClient } from "../api";
import { API_BASE_URL } from "../../config/env";
import { UserRole, Account } from "../../types";

export const AdminAccountService = {
  /**
   * Tạo mới tài khoản
   */
  async createAccount(account: Partial<Account>): Promise<Account> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts`,
      account
    );

    return response.data;
  },

  /**
   * Lấy chi tiết tài khoản theo id
   */
  async getAccountById(id: number): Promise<Account> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts/${id}`
    );

    return response.data;
  },

  /**
   * Cập nhật tài khoản
   */
  async updateAccount(
    id: number,
    account: Partial<Account>
  ): Promise<Account> {
    const response = await apiClient.put(
      `${API_BASE_URL}/admin/accounts/${id}`,
      account
    );

    return response.data;
  },

  /**
   * Xóa tài khoản
   */
  async deleteAccount(id: number): Promise<string> {
    const response = await apiClient.delete(
      `${API_BASE_URL}/admin/accounts/${id}`
    );

    return response.data;
  },

  /**
   * Lấy toàn bộ danh sách tài khoản
   */
  async getAllAccounts(): Promise<Account[]> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts`
    );

    return response.data;
  },

  /**
   * Reset mật khẩu
   */
  async resetPassword(
    id: number,
    newPassword: string
  ): Promise<string> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/reset-password`,
      {},
      {
        params: { newPassword },
      }
    );

    return response.data;
  },

  /**
   * Khóa tài khoản
   */
  async lockAccount(id: number): Promise<string> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/lock`,
      {}
    );

    return response.data;
  },

  /**
   * Mở khóa tài khoản
   */
  async unlockAccount(id: number): Promise<string> {
    const response = await apiClient.post(
      `${API_BASE_URL}/admin/accounts/${id}/unlock`,
      {}
    );

    return response.data;
  },

  /**
   * Search account
   */
  async searchAccounts(q: string = ""): Promise<Account[]> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts/search`,
      {
        params: { q },
      }
    );

    return response.data;
  },

  /**
   * Lọc theo role
   */
  async getAccountsByRole(role: UserRole): Promise<Account[]> {
    const response = await apiClient.get(
      `${API_BASE_URL}/admin/accounts/by-role`,
      {
        params: { role },
      }
    );

    return response.data;
  },
};
import { apiClient } from "../api";
import { getErrorMessage } from "../../utils/getErrorMessage";

// ===== LOGIN =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
}
// ===== REGISTER =====
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message?: string;
}

export const authService = {
  // ===== REGISTER =====
  async register(payload: RegisterRequest) {
    try {
      const response = await apiClient.post(
        "/auth/register",
        payload
      );

      return response.data;
    } catch (error) {
        throw getErrorMessage(
        error,
        "Đăng nhập thất bại"
      );
    }
  },

  // ===== LOGIN =====
    async login(payload: LoginRequest) {
    try {
      const response = await apiClient.post(
        "/auth/login",
        payload
      );

      return response.data;
    } catch (error) {
      // QUAN TRỌNG
      throw getErrorMessage(
        error,
        "Đăng nhập thất bại"
      );
    }
  },
};


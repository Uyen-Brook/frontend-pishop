import axios from "axios";
import { useAuthStore } from "../store/authStore";
// Lấy API URL từ config
import { API_BASE_URL } from "../config/env";
import {ROUTES} from "../config/routes";


export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  Request Interceptor — tự động gắn token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — xử lý 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn → logout
      useAuthStore.getState().logout();

      // Điều hướng về login
      window.location.href = ROUTES.LOGIN;
    }

    return Promise.reject(error);
  }
);

export default apiClient;

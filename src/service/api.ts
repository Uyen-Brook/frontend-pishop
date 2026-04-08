import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { storage } from "../utils/storage"; // 👈 thêm dòng này
import { API_BASE_URL } from "../config/env";
import { ROUTES } from "../config/routes";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor — lấy token từ storage (nguồn thật)
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken(); // 👈 đổi sang storage

    if (token) {
      // đảm bảo headers luôn tồn tại
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — xử lý 401 + sync store
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      const { logout } = useAuthStore.getState();

      // 👉 logout sẽ clear cả storage + store
      logout();

      // 👉 tránh redirect loop nếu đang ở login
      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
// src/utils/handleApiError.ts

import axios from "axios";

export function handleApiError(error: unknown): string {

    if (axios.isAxiosError(error)) {

        // Không kết nối được server
        if (!error.response) {
            return "Không thể kết nối tới server";
        }
        switch (error.response.status) {

            case 400:
                return "Dữ liệu không hợp lệ";

            case 401:
                return "Bạn chưa đăng nhập";

            case 403:
                return "Bạn không có quyền truy cập";

            case 404:
                return "Không tìm thấy dữ liệu";

            case 500:
                return "Server đang gặp lỗi";

            default:
                return "Đã xảy ra lỗi";
        }
    }
    return "Lỗi không xác định";
}
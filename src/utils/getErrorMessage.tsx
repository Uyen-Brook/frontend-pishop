import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Có lỗi xảy ra"
): string => {
  // ===== AXIOS ERROR =====
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    const data = error.response?.data;

    const message =
      data?.message ||
      data?.error ||
      error.message;

    switch (status) {
      case 400:
        return message || "Dữ liệu không hợp lệ";

      case 401:
        return message || "Sai email hoặc mật khẩu";

      case 403:
        return message || "Bạn không có quyền truy cập";

      case 404:
        return message || "Không tìm thấy dữ liệu";

      case 409:
        return message || "Dữ liệu đã tồn tại";

      case 413:
        return message || "Dữ liệu quá lớn";

      case 415:
        return message || "Định dạng không hỗ trợ";

      case 422:
        return message || "Dữ liệu không hợp lệ";

      case 429:
        if (data?.blockedUntil) {
          return `${message}\nMở lại lúc: ${data.blockedUntil}`;
        }

        return message || "Bạn thao tác quá nhanh";

      case 500:
        return message || "Lỗi hệ thống";

      case 502:
      case 503:
      case 504:
        return (
          message ||
          "Máy chủ đang bận, vui lòng thử lại sau"
        );

      default:
        return message || defaultMessage;
    }
  }

  // ===== NORMAL ERROR =====
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
export const getErrorMessage = (error: any): string => {
  const code = error.response?.data?.code;
  const message = error.response?.data?.message;

  switch (code) {
    case 400:
      return "Dữ liệu không hợp lệ";
    case 401:
      return "Vui lòng đăng nhập";
    case 403:
      return "Bạn không có quyền";
    case 404:
      return "Không tìm thấy dữ liệu";
    case 500:
      return "Lỗi hệ thống, thử lại sau";
    default:
      return message || "Có lỗi xảy ra";
  }
};
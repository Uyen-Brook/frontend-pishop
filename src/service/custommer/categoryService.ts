// MOCK DATA
const mockCategories = [
  { id: 1, name: "Laptop", description: "Các dòng laptop văn phòng, gaming, đồ họa" },
  { id: 2, name: "Smartphone", description: "Điện thoại thông minh" },
  { id: 3, name: "Tablet", description: "Máy tính bảng các loại" }
];

export const categoryService = {
  async getAll() {
    return Promise.resolve(mockCategories);
  }
};


// import  apiClient from "../api";
// import type { Category } from "../../types/index";

// export const categoryService = {
//   getAll(): Promise<Category[]> {
//     return apiClient.get("/categories").then((res) => res.data);
//   },
// };

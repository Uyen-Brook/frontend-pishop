// MOCK DATA
import { Category } from "../../types";
import {apiClient } from "../api";

export const categoryService = {
 async getAll(): Promise<Category[]> {
    try {
      const response = await apiClient.get<Category[]>("/categories");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
};

// src/service/custommer/categoryService.ts
import type { Category } from "../../types/index";

const mockCategories: Category[] = [
  { id: 1, name: "Phones", icon: "📱", image: "phone.jpg", description: "Smartphones and mobile devices" },
  { id: 2, name: "Tablets", icon: "💻", image: "tablet.jpg", description: "Portable tablets for work and play" },
  { id: 3, name: "Laptops", icon: "🖥️", image: "laptop.jpg", description: "Powerful laptops for productivity" },
  { id: 4, name: "TVs", icon: "📺", image: "tv.jpg", description: "Smart TVs and displays" },
  { id: 5, name: "Headphones", icon: "🎧", image: "headphones.jpg", description: "Audio gear for music lovers" },
];

export const categoryServiceV2 = {
  async getAll(): Promise<Category[]> {
    // giả lập gọi API
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCategories), 300);
    });
  },
};

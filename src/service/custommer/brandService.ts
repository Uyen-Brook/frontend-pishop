import type { Brand } from "../../types";

export const mockBrands: Brand[] = [
  {
    id: 1,
    name: "Apple",
    image: "https://picsum.photos/seed/apple/400/300",
    website: "https://www.apple.com"
  },
  {
    id: 2,
    name: "Dell",
    image: "https://picsum.photos/seed/dell/400/300",
    website: "https://www.dell.com"
  },
  {
    id: 3,
    name: "Samsung",
    image: "https://picsum.photos/seed/samsung/400/300",
    website: "https://www.samsung.com"
  },
  {
    id: 4,
    name: "Sony",
    image: "https://picsum.photos/seed/sony/400/300",
    website: "https://www.sony.com"
  },
  {
    id: 5,
    name: "ASUS",
    image: "https://picsum.photos/seed/asus/400/300",
    website: "https://www.asus.com"
  },
  {
    id: 6,
    name: "Logitech",
    image: "https://picsum.photos/seed/logitech/400/300",
    website: "https://www.logitech.com"
  },
  {
    id: 7,
    name: "TP-Link",
    image: "https://picsum.photos/seed/tplink/400/300",
    website: "https://www.tp-link.com"
  }
];

export const brandService = {
  async getAll(): Promise<Brand[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBrands);
      }, 300);
    });
  },

  async getById(id: number): Promise<Brand | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockBrands.find(b => b.id === id));
      }, 300);
    });
  }
};

// API implementation (uncomment when backend is ready)
// import apiClient from "../api";
// export const brandService = {
//   getAll(): Promise<Brand[]> {
//     return apiClient.get("/api/brands").then((res) => res.data);
//   },
//   getById(id: number): Promise<Brand> {
//     return apiClient.get(`/api/brands/${id}`).then((res) => res.data);
//   }
// };

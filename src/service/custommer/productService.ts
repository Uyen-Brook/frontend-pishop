
import type { Product } from "../../types/index";

export const mockProducts: Product[] = [
  {
    id: 1,
    modelName: "MacBook Air M2 2023",
    modelNumber: "MLY13SA/A",
    brandName: "Apple",
    categoryName: "Laptop",
    price: 28990000,
    discountType: "PERCENT",
    discountValue: 10,
    productStatus: "NEW",
    promotionName: "Giảm 10% Laptop",
    quantity: 15,
    supplierName: "FPT Trading",
    thumbnail: "macbook_air_m2.png"
  },
  {
    id: 2,
    modelName: "Dell XPS 13 Plus",
    modelNumber: "XPS9320",
    brandName: "Dell",
    categoryName: "Laptop",
    price: 35990000,
    discountType: "FIXED_AMOUNT",
    discountValue: 2000000,
    productStatus: "HOT",
    promotionName: "Giảm 2 triệu",
    quantity: 10,
    supplierName: "DGW",
    thumbnail: "dell_xps_13.png"
  },
  {
    id: 3,
    modelName: "iPhone 15 Pro Max",
    modelNumber: "A3106",
    brandName: "Apple",
    categoryName: "Điện thoại",
    price: 32990000,
    discountType: "PERCENT",
    discountValue: 5,
    productStatus: "HOT",
    promotionName: "Flash Sale 5%",
    quantity: 20,
    supplierName: "FPT Trading",
    thumbnail: "iphone_15_pro_max.png"
  },
  {
    id: 4,
    modelName: "Samsung Galaxy S24 Ultra",
    modelNumber: "SM-S928B",
    brandName: "Samsung",
    categoryName: "Điện thoại",
    price: 30990000,
    discountType: null,
    discountValue: null,
    productStatus: "NEW",
    promotionName: null,
    quantity: 18,
    supplierName: "Samsung VN",
    thumbnail: "s24_ultra.png"
  },
  {
    id: 5,
    modelName: "iPad Air 5",
    modelNumber: "A2588",
    brandName: "Apple",
    categoryName: "Tablet",
    price: 14990000,
    discountType: "PERCENT",
    discountValue: 8,
    productStatus: "SALE",
    promotionName: "Back to School",
    quantity: 25,
    supplierName: "FPT Trading",
    thumbnail: "ipad_air_5.png"
  },
  {
    id: 6,
    modelName: "Sony WH-1000XM5",
    modelNumber: "WH1000XM5",
    brandName: "Sony",
    categoryName: "Tai nghe",
    price: 7990000,
    discountType: "FIXED_AMOUNT",
    discountValue: 1000000,
    productStatus: "HOT",
    promotionName: "Giảm 1 triệu",
    quantity: 30,
    supplierName: "Sony VN",
    thumbnail: "sony_xm5.png"
  },
  {
    id: 7,
    modelName: "Apple Watch Series 9",
    modelNumber: "S9",
    brandName: "Apple",
    categoryName: "Đồng hồ thông minh",
    price: 10990000,
    discountType: null,
    discountValue: null,
    productStatus: "NEW",
    promotionName: null,
    quantity: 12,
    supplierName: "FPT Trading",
    thumbnail: "apple_watch_s9.png"
  },
  {
    id: 8,
    modelName: "Logitech MX Master 3S",
    modelNumber: "MX3S",
    brandName: "Logitech",
    categoryName: "Bàn phím - Chuột",
    price: 2490000,
    discountType: "PERCENT",
    discountValue: 15,
    productStatus: "HOT",
    promotionName: "Sale 15%",
    quantity: 40,
    supplierName: "Logitech VN",
    thumbnail: "mx_master_3s.png"
  },
  {
    id: 9,
    modelName: "ASUS ROG Gaming PC",
    modelNumber: "ROG-G15",
    brandName: "ASUS",
    categoryName: "PC - Máy tính bàn",
    price: 25990000,
    discountType: "FIXED_AMOUNT",
    discountValue: 3000000,
    productStatus: "SALE",
    promotionName: "Giảm 3 triệu",
    quantity: 5,
    supplierName: "ASUS VN",
    thumbnail: "rog_pc.png"
  },
  {
    id: 10,
    modelName: "TP-Link Archer AX73",
    modelNumber: "AX73",
    brandName: "TP-Link",
    categoryName: "Thiết bị mạng",
    price: 1990000,
    discountType: null,
    discountValue: null,
    productStatus: "NEW",
    promotionName: null,
    quantity: 0,
    supplierName: "TP-Link VN",
    thumbnail: "tplink_ax73.png"
  }
];

export const productService = {
  async getByCategory(categoryName: string): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts.filter((p) => p.categoryName === categoryName));
      }, 300);
    });
  },
  async getAll():Promise<Product[]>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(mockProducts)
      },300);
    });
  },

  async getByCategoryId(categoryId: number): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts);
      }, 300);
    });
  },

  async getByBrandId(brandId: number): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const brandMap: Record<number, string> = {
          1: "Apple",
          2: "Dell",
          3: "Samsung",
          4: "Sony",
          5: "ASUS",
          6: "Logitech",
          7: "TP-Link"
        };
        const brandName = brandMap[brandId];
        resolve(mockProducts.filter((p) => p.brandName === brandName));
      }, 300);
    });
  },

  async getByBothFilters(categoryId?: number, brandId?: number): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = mockProducts;

        if (brandId) {
          const brandMap: Record<number, string> = {
            1: "Apple",
            2: "Dell",
            3: "Samsung",
            4: "Sony",
            5: "ASUS",
            6: "Logitech",
            7: "TP-Link"
          };
          const brandName = brandMap[brandId];
          filtered = filtered.filter((p) => p.brandName === brandName);
        }

        resolve(filtered);
      }, 300);
    });
  }
};

// API implementation (uncomment when backend is ready)
// import apiClient from "../api";
// import type { Product } from "../../types/index";

// export const productService = {
//   getByCategory(categoryName: string): Promise<Product[]> {
//     return apiClient
//       .get(`/api/products?categoryName=${categoryName}`)
//       .then((res) => res.data);
//   },

//   getByCategoryId(categoryId: number): Promise<Product[]> {
//     return apiClient
//       .get(`/api/products?categoryId=${categoryId}`)
//       .then((res) => res.data);
//   },

//   getByBrandId(brandId: number): Promise<Product[]> {
//     return apiClient
//       .get(`/api/products?brandId=${brandId}`)
//       .then((res) => res.data);
//   },

//   getByBothFilters(categoryId?: number, brandId?: number): Promise<Product[]> {
//     const params = new URLSearchParams();
//     if (categoryId) params.append("categoryId", categoryId.toString());
//     if (brandId) params.append("brandId", brandId.toString());
//     return apiClient
//       .get(`/api/products?${params.toString()}`)
//       .then((res) => res.data);
//   }
// };

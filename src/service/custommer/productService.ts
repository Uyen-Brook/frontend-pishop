import type { Product } from "../../types/index";

const mockProducts: Product[] = [
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
    quantity: 0,
    supplierName: "FPT Trading",
    thumbnail: "macbook_air_m2.png"
  },
  {
    id: 2,
    modelName: "iPhone 15 128GB",
    modelNumber: "A3090",
    brandName: "Apple",
    categoryName: "Smartphone",
    price: 22990000,
    discountType: "PERCENT",
    discountValue: 10,
    productStatus: "HOT",
    promotionName: "Giảm 10% Laptop",
    quantity: 0,
    supplierName: "FPT Trading",
    thumbnail: "iphone15.png"
  },
  {
    id: 3,
    modelName: "Samsung Galaxy S24",
    modelNumber: "SM-S921B",
    brandName: "Samsung",
    categoryName: "Smartphone",
    price: 20990000,
    discountType: "FIXED_AMOUNT",
    discountValue: 50000,
    productStatus: "HOT",
    promotionName: "Giảm 50k phụ kiện",
    quantity: 0,
    supplierName: "Viettel Distribution",
    thumbnail: "s24.png"
  },
  {
    id: 4,
    modelName: "Dell XPS 13 9315",
    modelNumber: "XPS9315",
    brandName: "Dell",
    categoryName: "Laptop",
    price: 32990000,
    discountType: null,
    discountValue: null,
    productStatus: "HOT",
    promotionName: null,
    quantity: 0,
    supplierName: "DGW Distribution",
    thumbnail: "https://cdn.hoanghamobile.vn/default/Uploads/2026/03/24/bm1403cda-s61611w-2.png;trim.threshold=80;trim.percentpadding=0.5;width=150;height=150;mode=pad"
  },
  {
    id: 5,
    modelName: "iPad Air 5 2022",
    modelNumber: "A2588",
    brandName: "Apple",
    categoryName: "Tablet",
    price: 14990000,
    discountType: null,
    discountValue: null,
    productStatus: "NEW",
    promotionName: null,
    quantity: 0,
    supplierName: "Viettel Distribution",
    thumbnail: "https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/11/13/356741392.jpeg"
  }
];

export const productService = {
  async getByCategory(categoryName: string): Promise<Product[]> {
    return mockProducts.filter((p) => p.categoryName === categoryName);
  }
};


// import apiClient from "../api";
// import type { Product } from "../../types/index";

// export const productService = {
//   getByCategory(categoryName: string): Promise<Product[]> {
//     return apiClient
//       .get(`/products?category=${categoryName}`)
//       .then((res) => res.data);
//   },
// };

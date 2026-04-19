
import type { Product, ProductDetail } from "../../types/index";

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
    thumbnail: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook-air-15-inch-m2-2023-1.jpg"
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
export const thinkpadX1CarbonGen13: ProductDetail = {
  id: 10001,
  modelName: "ThinkPad X1 Carbon Gen 13",
  modelNumber: "21NS0010GE",
  thumbnail: "https://www.lenovo.com/x1-carbon-gen13-thumbnail.jpg",

  price: 2499, // USD, tham khảo
  productStatus: "Available",
  createAt: "2026-04-17T00:00:00Z",
  updateAt: "2026-04-17T00:00:00Z",
  quantity: 50,

  description: "Lenovo ThinkPad X1 Carbon Gen 13 là dòng ultrabook cao cấp, nhẹ, bền, hiệu năng mạnh mẽ với Intel Core Ultra và màn hình 2.8K.",
  specification: {
    "Processor": "Intel Core Ultra 7 258V, 8C/8T, Turbo 4.8GHz",
    "Graphics": "Integrated Intel Arc Graphics 140V",
    "Memory": "32GB LPDDR5x-8533 (soldered)",
    "Storage": "1TB SSD M.2 PCIe 5.0 NVMe",
    "Display": "14'' 2.8K (2880x1800), 400 nits, Anti-glare",
    "Audio": "Dolby Atmos, Realtek ALC713 codec, Stereo speakers",
    "Camera": "FHD 1080p + IR, Privacy Shutter",
    "Battery": "57Wh, Integrated",
    "Adapter": "65W USB-C Slim GaN",
    "Ports": "Thunderbolt 4, USB 3.2 Gen 1, HDMI, Audio jack",
    "OS": "Windows 11 Pro",
    "Weight": "≈1.12kg",
    "Build": "Carbon-fiber reinforced chassis"
    
  },
  
  listImage: [
    "https://www.lenovo.com/x1-carbon-gen13-front.jpg",
    "https://www.lenovo.com/x1-carbon-gen13-side.jpg",
    "https://www.lenovo.com/x1-carbon-gen13-keyboard.jpg"
  ],

  discountPercent: 10,
  discountValue: 250,
  discountType: "Seasonal Promotion",
  promotionDescription: "Giảm giá mùa xuân áp dụng đến hết tháng 4/2026",
  promotionName: "Spring Sale",

  brandName: "Lenovo",
  supplierName: "Lenovo Vietnam",
  categoryName: "Laptop"
};
export const thinkpadX1CarbonGen131: ProductDetail = {
  id: 10002,
  modelName: "ThinkPad X1 Carbon Gen 13",
  modelNumber: "21NS0010GE",
  thumbnail: "https://www.lenovo.com/x1-carbon-gen13-thumbnail.jpg",
  price: 2499,
  productStatus: "Available",
  createAt: "2026-04-17T00:00:00Z",
  updateAt: "2026-04-17T00:00:00Z",
  quantity: 50,
  description: "Lenovo ThinkPad X1 Carbon Gen 13 là ultrabook cao cấp, nhẹ, bền, hiệu năng mạnh mẽ với Intel Core Ultra và màn hình 2.8K.",
  specification: {
    Processor: {
      model: "Intel Core Ultra 7 258V",
      cores: "8C/8T",
      turbo: "4.8GHz"
    },
    Graphics: {
      type: "Integrated",
      model: "Intel Arc Graphics 140V"
    },
    Memory: {
      capacity: "32GB",
      type: "LPDDR5x-8533",
      upgradeable: "No (soldered)"
    },
    Storage: {
      capacity: "1TB",
      type: "SSD M.2 PCIe 5.0 NVMe"
    },
    Display: {
      size: "14''",
      resolution: "2880x1800 (2.8K)",
      brightness: "400 nits",
      feature: "Anti-glare"
    },
    Audio: {
      system: "Dolby Atmos",
      codec: "Realtek ALC713",
      speakers: "Stereo"
    },
    Camera: {
      resolution: "FHD 1080p",
      feature: "IR, Privacy Shutter"
    },
    Battery: {
      capacity: "57Wh",
      type: "Integrated"
    },
    Adapter: {
      power: "65W",
      type: "USB-C Slim GaN"
    },
    Ports: {
      thunderbolt: "Thunderbolt 4",
      usb: "USB 3.2 Gen 1",
      hdmi: "HDMI",
      audio: "3.5mm jack"
    },
    OS: {
      version: "Windows 11 Pro"
    },
    Weight: {
      value: "≈1.12kg"
    },
    Build: {
      material: "Carbon-fiber reinforced chassis"
    }
  },
  listImage: [
    "https://www.lenovo.com/x1-carbon-gen13-front.jpg",
    "https://www.lenovo.com/x1-carbon-gen13-side.jpg",
    "https://www.lenovo.com/x1-carbon-gen13-keyboard.jpg"
  ],
  discountPercent: 10,
  discountValue: 250,
  discountType: "Seasonal Promotion",
  promotionDescription: "Giảm giá mùa xuân áp dụng đến hết tháng 4/2026",
  promotionName: "Spring Sale",
  brandName: "Lenovo",
  supplierName: "Lenovo Vietnam",
  categoryName: "Laptop"
};

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

  async getById(id: number): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id);
        resolve(product || null);
      }, 300);
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
  
  async getProductDetail(ProductId: Number): Promise<ProductDetail>{
    return new Promise((resolve) => {
       setTimeout(() => {
        resolve(thinkpadX1CarbonGen131);
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

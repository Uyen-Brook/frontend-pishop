// user
export type UserRole = "USER" | "ADMIN";
// token
export interface DecodedToken {
  accountId: number;
  role: UserRole;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}
// Account rank and 
export type AccountRank =
  | "NEW"
  | "BRONZE"
  | "SILVER"
  | "GOLD"
  | "DIAMOND"
  | "VIP";

export const AccountRankLabel: Record<AccountRank, string> = {
  NEW: "mới",
  BRONZE: "đồng",
  SILVER: "bạc",
  GOLD: "vàng",
  DIAMOND: "kim cương",
  VIP: "VIP",
};

// category type
export interface Category {
  id: number;
  name: string;
  description: string;
  icon : string;
  image: string;
}
// brand type
export interface Brand{
  id: number;
  name: string;
  image: string;
  website: string;
}

// discount type
export type DiscountType= "PERCENT" | "FIXED_AMOUNT" | null;

// product type
export interface ProductSumaryResponse {
  id: number;
  modelName: string;
  modelNumber: string;
  brandName: string;
  categoryName: string;
  price: number;
  discountType: DiscountType;
  discountValue: number;
  productStatus: ProductStatus;
  promotionName: string | null;
  quantity: number;
  supplierName: string;
  thumbnail: string;
  createAt: string;
  updateAt: string;
}

//  chi tiết 
export interface ProductResponse {
  id: number;
  modelName: string;
  modelNumber: string;
  thumbnail: string;

  price: number; // BigDecimal -> number
  productStatus: string; // hoặc enum nếu bạn định nghĩa riêng
  createAt: string; // LocalDateTime -> ISO string
  updateAt: string;
  quantity: number;

  description: string;
  specification: Record<string, string | Record<string, string>>; // Support both flat strings and nested objects
  listImage: string[];                   // List<String>
  discountPercent: number;
  discountValue: number;
  discountType: string; // hoặc enum
  promotionDescription: string;
  promotionName: string;

  brandName: string;
  supplierName: string;
  categoryName: string;
}
// tạo 1 sản phẩm mới
export interface ProductCreateRequest {
  modelName?: string;
  modelNumber?: string;

  specification?: string; // JSON string
  description?: string;

  importPrice?: number;
  taxVat?: number;
  price?: number;

  quantity?: number;
  productStatus?: string;

  brandId?: number;
  supplierId?: number;
  categoryId?: number;

  thumbnail?: File;
  listImage?: File[];
}
// update sản phẩm
export interface ProductUpdateRequest {
  modelName?: string;
  modelNumber?: string;
  description?: string;

  price?: number;
  quantity?: number;
  importPrice?: number;

  productStatus?: string;

  specification?: Record<string, string>;

  newImages?: File[];
  deletedImages?: string[];
  keptImages?: string[];
  thumbnail?: File;

  brandId?: number;
  supplierId?: number;
  categoryId?: number;
}

// giỏ hàng item
export interface CartItem {
  basePrice: number;
  discountType: 'PERCENT' | 'FIXED_AMOUNT';
  discountValue: number;
  endDate: string;
  finalPrice: number;
  modelNumber: string;
  productId: number;
  productName: string;
  promotionName: string;
  quantity: number;
  startDate: string;
  stockQuantity: number;
  thumbnail: string;
  selected: boolean;
}
// giỏ hàng
export interface Cart {
  cartId: number;
  items: CartItem[];
  totalPrice: number;
}

// productStatus
export type ProductStatus =
  | "NEW"
  | "HOT"
  | "SALE"
  | "OUT_OF_STOCK"
  | "DISCONTINUED"
  | "USED";

//  order status type
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "PREPARING"
  | "SHIPPING"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED"
  | "RETURNED";

// Order status
export const OrderStatusLabel: Record<OrderStatus, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PROCESSING: "Đang xử lý",
  PREPARING: "Đang chuẩn bị hàng",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  RETURNED: "Hoàn trả",
};
// payment method
export type PaymentMethod =
  | "COD"
  | "BANK";
  export const PaymentMethodLabel : Record<PaymentMethod, string> = {
    COD: "Thanh toán bằng tiền mặt",
    BANK: "Thanh toán thông qua ngân hàng",
  };
export type PayStatus =
  | "UNPAID"
  | "PAID"
  | "REFUNDED";

  export const PayStatusLabel : Record<PayStatus, string>={
    UNPAID: "Chưa thanh toán",
    PAID: " Đã thanh toán",
    REFUNDED: "Hoàn tiền"

  }

export type TransactionStatus =
  | "SUCCESS"
  | "FAILED"
  | "PENDING";

export interface Account {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDelete: boolean;
  image: string;
  role: UserRole;
  point: number;
  rank: string;
  createAt: string;
  lastActivity: string;
}

// Product status label hiển thị tiếng Việt
export const productStatusLabels: Record<ProductStatus, string> = {
  NEW: "Sản phẩm mới",
  HOT: "Bán chạy",
  SALE: "Đang giảm giá",
  OUT_OF_STOCK: "Hết hàng",
  DISCONTINUED: "Ngừng bán",
  USED: "Hàng cũ",
};
// mapp string string
export interface SpecEntry {
  key: string;
  value: string;
}

// nhà cung cấp
export interface SupplierRequest {
  name?: string;
  taxcode?: string;
  email?: string;
  phone?: string;
  address?: string;
  note?: string;
  website?: string;
  representative?: string;
}
// nhàcung cấp 
export interface SupplierResponse {
  id: number;
  name: string;
  logo?: string;
  taxcode?: string;
  phone?: string;
  address?: string;
  representative?: string;
}
// nhà cung cấp
export interface SupplierDetailResponse {
  id: number;
  name: string;
  taxcode?: string;
  email?: string;
  phone?: string;
  logo?: string;
  address?: string;
  note?: string;
  website?: string;
  representative?: string;
}

// phân trang
export interface PageResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
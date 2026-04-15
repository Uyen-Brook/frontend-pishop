export type UserRole = "USER" | "ADMIN";

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
export interface Product {
  id: number;
  modelName: string;
  modelNumber: string;
  brandName: string;
  categoryName: string;
  price: number;
  discountType: DiscountType;
  discountValue: number | null;
  productStatus: ProductStatus;
  promotionName: string | null;
  quantity: number;
  supplierName: string;
  thumbnail: string;
}
// giỏ hàng
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

export interface Cart {
  cartId: number;
  items: CartItem[];
  totalPrice: number;
}


export type ProductStatus =
  | "NEW"
  | "HOT"
  | "SALE"
  | "OUT_OF_STOCK"
  | "DISCONTINUED"
  | "USED";

//  order status type
export type OrderStatus =
  | "PENDDING"
  | "PAID"
  | "CONFIRMED"
  | "SHIPPING"
  | "DELIVERED"
  | "CANCELLED";

export const OrderStatusLabel: Record<OrderStatus, string> = {
  PENDDING: "Chờ thanh toán",
  PAID: "Đã thanh toán",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
};

export type PaymentMethod =
  | "COD"
  | "BANK_TRANSFER"
  | "MOMO"
  | "VNPAY";
export type PayStatus =
  | "UNPAID"
  | "PAID"
  | "REFUNDED";
export type TransactionStatus =
  | "SUCCESS"
  | "FAILED"
  | "PENDING";
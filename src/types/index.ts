export type UserRole = "USER" | "ADMIN";

export interface DecodedToken {
  accountId: number;
  role: UserRole;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

// category type
export interface Category {
  id: number;
  name: string;
  description: string;
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
  productStatus: "NEW" | "HOT" | "NORMAL";
  promotionName: string | null;
  quantity: number;
  supplierName: string;
  thumbnail: string;
}

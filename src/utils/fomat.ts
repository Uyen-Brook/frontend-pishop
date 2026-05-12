
/**
 * Format ngày kiểu Việt Nam
 */
export const formatDateVN = (date: string | Date): string => {
  if (!date) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * Format số kiểu Việt Nam
 */
export const formatNumberVN = (
  value: number | string,
  maxFractionDigits: number = 3
): string => {
  if (value === null || value === undefined || value === "") return "";

  return Number(value).toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  });
};

/**
 * Format tiền VNĐ
 */
export const formatMoneyVN = (
  amount: number | string,
  currency: string = "VNĐ"
): string => {
  if (amount === null || amount === undefined || amount === "") return "";

  return `${formatNumberVN(amount)} ${currency}`;
};

/**
 * Tính giá sau giảm giá
 */
export const calculateDiscountPrice = (
  price: number,
  discountType?: "PERCENT" | "FIXED_AMOUNT",
  discountValue?: number
): number => {
  if (!discountType || !discountValue) return price;

  if (discountType === "PERCENT") {
    return price - (price * discountValue) / 100;
  }

  if (discountType === "FIXED_AMOUNT") {
    return price - discountValue;
  }

  return price;
};
import { ROUTES } from "../../../../config/routes";
import { useNavigate } from "react-router-dom";
import "./checkoutSummary.css";

import { ROUTES } from "../../../../config/routes";

interface CheckoutSummaryProps {
  totalPrice: number;
  totalDiscount: number;
  totalPayable: number;
  onPlaceOrder: () => void;
  onBackToCart: () => void;
}

export default function CheckoutSummary({
  totalPrice,
  totalDiscount,
  totalPayable,
  onPlaceOrder,
  onBackToCart,
}: CheckoutSummaryProps) {
  return (
    <div className="checkout-summary">
      <div className="summary-row">
        <span>Tạm tính:</span>
        <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
      </div>
      <div className="summary-row">
        <span>Giảm giá:</span>
        <span>-{totalDiscount.toLocaleString("vi-VN")}đ</span>
      </div>
      <div className="summary-divider"></div>
      <div className="summary-row final">
        <span>Thành tiền:</span>
        <span>{totalPayable.toLocaleString("vi-VN")}đ</span>
      </div>

      <button className="btn-place-order" onClick={onPlaceOrder}>
        ĐẶT HÀNG
      </button>

      <button className="btn-back-cart" onClick={onBackToCart}>
        Quay lại giỏ hàng
      </button>
    </div>
  );
}
import React from "react";
import { CartItem } from "../../../../types";

interface OrderSummaryProps {
  selectedItems: CartItem[];
  totalPrice: number;
  totalDiscount: number;
  totalPayable: number;
  onPlaceOrder: () => void;
  onBackToCart: () => void;
}

export default function OrderSummary({
  selectedItems,
  totalPrice,
  totalDiscount,
  totalPayable,
  onPlaceOrder,
  onBackToCart,
}: OrderSummaryProps) {
  return (
    <div className="checkout-right">
      <h2>Đơn hàng của bạn</h2>
      <div className="checkout-items">
        {selectedItems.map((item) => (
          <div key={item.productId} className="checkout-item">
            <img src={item.thumbnail} alt={item.productName} />
            <div className="item-info">
              <h4>{item.productName}</h4>
              <p className="model-number">{item.modelNumber}</p>
              <p className="item-price">
                {item.finalPrice.toLocaleString("vi-VN")}đ x {item.quantity}
              </p>
            </div>
            <div className="item-subtotal">
              {(item.finalPrice * item.quantity).toLocaleString("vi-VN")}đ
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
}

import React from "react";
import "./css/CartSummary.css";

interface CartSummaryProps {
  totalProduct: number;
  subtotal: number;
  discount: number;
  cartTotal: number;
  onCheckout: () => void;
}

export default function CartSummary({
  totalProduct,
  subtotal,
  discount,
  cartTotal,
  onCheckout,
}: CartSummaryProps) {
  return (
        <div className="checkout-box">
          <h2>THÔNG TIN ĐƠN HÀNG</h2>
          <div className="row"><span>Số sản phẩm ({totalProduct})</span><span>{subtotal.toLocaleString("vi-VN")}đ</span></div>
          <div className="row"><span>Tạm tính</span><span>{subtotal.toLocaleString("vi-VN")}đ</span></div>
          <div className="row"><span>Giảm giá</span><span className="discount">
            -{discount.toLocaleString("vi-VN")}đ
          </span></div>
          <div className="final-total"><span>Thành tiền</span><span>{cartTotal.toLocaleString("vi-VN")}đ</span></div>
          <div className="note">TAXES INCLUDED</div>
          <button className="btn-checkout" onClick={onCheckout}>CHECKOUT NOW</button>
        </div>
  );
}

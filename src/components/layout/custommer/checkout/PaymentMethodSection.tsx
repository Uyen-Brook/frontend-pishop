import React from "react";
import { FaMoneyBill, FaUniversity } from "react-icons/fa";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSectionProps) {
  return (
    <div className="payment-method-section rounded-xl ">
      <div className="bg-white">
        <h3>Phương thức thanh toán</h3>
        <div className="payment-options">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={onPaymentMethodChange}
            />
            <div className="payment-content">
              <span className="payment-icon">
                <FaMoneyBill />
              </span>
              <div className="payment-text">
                <p className="payment-title">Thanh toán khi nhận hàng (COD)</p>
                <p className="payment-desc">Trả tiền trực tiếp cho nhân viên giao hàng</p>
              </div>
            </div>
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="BANK"
              checked={paymentMethod === "BANK"}
              onChange={onPaymentMethodChange}
            />
            <div className="payment-content">
              <span className="payment-icon">
                <FaUniversity />
              </span>
              <div className="payment-text">
                <p className="payment-title">Chuyển khoản ngân hàng</p>
                <p className="payment-desc">Chuyển tiền vào tài khoản ngân hàng của shop</p>
              </div>
            </div>
          </label>
        </div>
      </div>

    </div>
  );
}

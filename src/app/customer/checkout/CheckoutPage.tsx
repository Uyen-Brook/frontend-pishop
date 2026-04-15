import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "../../../types";
import { ROUTES } from "../../../config/routes";
import "./CheckoutPage.css";

interface LocationState {
  selectedItems: CartItem[];
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const selectedItems = state?.selectedItems || [];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  if (selectedItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Không có sản phẩm để thanh toán</h2>
        <p>Vui lòng quay lại giỏ hàng và chọn sản phẩm</p>
        <button onClick={() => navigate(ROUTES.CART)}>Quay lại giỏ hàng</button>
      </div>
    );
  }

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  );

  const totalDiscount = selectedItems.reduce((sum, item) => {
    if (item.discountType === "PERCENT") {
      return sum + (item.basePrice * item.discountValue * item.quantity) / 100;
    }
    if (item.discountType === "FIXED_AMOUNT") {
      return sum + item.discountValue * item.quantity;
    }
    return sum;
  }, 0);

  const totalPayable = totalPrice - totalDiscount;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const { fullName, email, phone, address, city, district, ward } = formData;
    
    if (!fullName || !email || !phone || !address || !city || !district || !ward) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    // TODO: Submit order to backend
    console.log("Order placed:", {
      items: selectedItems,
      totalPayable,
      shippingInfo: formData,
    });

    alert("Đặt hàng thành công! (Đây là demo)");
    navigate(ROUTES.HOME);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Thông tin giao hàng</h2>
        <form className="checkout-form">
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Tỉnh/Thành phố</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Tỉnh/Thành phố"
              />
            </div>
            <div className="form-group">
              <label htmlFor="district">Quận/Huyện</label>
              <input
                type="text"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="Quận/Huyện"
              />
            </div>
            <div className="form-group">
              <label htmlFor="ward">Phường/Xã</label>
              <input
                type="text"
                id="ward"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                placeholder="Phường/Xã"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Ghi chú (tùy chọn)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Ghi chú thêm cho đơn hàng"
              rows={4}
            />
          </div>
        </form>
      </div>

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

          <button
            className="btn-place-order"
            onClick={handlePlaceOrder}
          >
            ĐẶT HÀNG
          </button>

          <button
            className="btn-back-cart"
            onClick={() => navigate(ROUTES.CART)}
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

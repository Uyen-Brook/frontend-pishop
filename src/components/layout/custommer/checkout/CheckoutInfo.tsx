import React from "react";
import { AddressResponse } from "../../../../service/custommer/customerAddressService";
import { Province, Ward } from "../../../../service/custommer/locationService";

interface CheckoutInfoProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    specificAddress: string;
    provinceName: string;
    wardName: string;
    notes: string;
    paymentMethod: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<typeof errors>>;
  savedAddresses: AddressResponse[];
  selectedAddressId: number | null;
  setSelectedAddressId: React.Dispatch<React.SetStateAction<number | null>>;
  isLoadingAddresses: boolean;
  showAddressForm: boolean;
  setShowAddressForm: React.Dispatch<React.SetStateAction<boolean>>;
  provinces: Province[];
  wards: Ward[];
  isLoadingProvinces: boolean;
  isLoadingWards: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectAddress: (address: AddressResponse) => void;
  handleClearSelection: () => void;
}

export default function CheckoutInfo({
  formData,
  setFormData,
  errors,
  setErrors,
  savedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  isLoadingAddresses,
  showAddressForm,
  setShowAddressForm,
  provinces,
  wards,
  isLoadingProvinces,
  isLoadingWards,
  handleInputChange,
  handleSelectAddress,
  handleClearSelection,
}: CheckoutInfoProps) {
  return (
    <div className="checkout-left">
      <h2>Thông tin giao hàng</h2>

      {/* ADDRESS SELECTION DROPDOWN */}
      {!isLoadingAddresses && savedAddresses.length > 0 && (
        <div>
          <label htmlFor="addressDropdown">Danh sách địa chỉ đã lưu:</label>
          <select
            id="addressDropdown"
            className="address-selection-dropdown"
            value={selectedAddressId || ""}
            onChange={(e) => {
              const addressId = Number(e.target.value);
              if (addressId) {
                const selectedAddr = savedAddresses.find(
                  (a) => Number(a.id) === addressId
                );
                if (selectedAddr) {
                  handleSelectAddress(selectedAddr);
                }
              }
            }}
          >
            <option value="">-- Chọn một địa chỉ --</option>
            {savedAddresses.map((addr) => (
              <option key={addr.id.toString()} value={addr.id.toString()}>
                {addr.phone}, {addr.specificAddress}, {addr.wardName}, {addr.provinceName}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ADDRESS FORM SECTION */}
      <form className="checkout-form">
        <div className="form-group">
          <label htmlFor="fullName">Tên người nhận</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Nhập họ và tên"
            className={errors.fullName ? "input-error" : ""}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span className="label-hint">(từ tài khoản)</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="specificAddress">Địa chỉ chi tiết</label>
          <input
            type="text"
            id="specificAddress"
            name="specificAddress"
            value={formData.specificAddress}
            onChange={handleInputChange}
            placeholder="Nhập chi tiết địa chỉ (số nhà, đường, ...)"
            className={errors.specificAddress ? "input-error" : ""}
          />
          {errors.specificAddress && <span className="error-message">{errors.specificAddress}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="provinceName">Tỉnh/Thành phố</label>
            <select
              id="provinceName"
              name="provinceName"
              value={formData.provinceName}
              onChange={handleInputChange}
              disabled={isLoadingProvinces}
              className={errors.provinceName ? "input-error" : ""}
            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.provinceName && <span className="error-message">{errors.provinceName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="wardName">Xã/Phường</label>
            <select
              id="wardName"
              name="wardName"
              value={formData.wardName}
              onChange={handleInputChange}
              disabled={!formData.provinceName || isLoadingWards || wards.length === 0}
              className={errors.wardName ? "input-error" : ""}
            >
              <option value="">-- Chọn xã/phường --</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.name}>
                  {ward.name}
                </option>
              ))}
            </select>
            {errors.wardName && <span className="error-message">{errors.wardName}</span>}
            {!formData.provinceName && <span className="hint-text">Chọn tỉnh/thành phố trước</span>}
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

      {/* PAYMENT METHOD SECTION */}
      <div className="payment-method-section">
        <h3>Phương thức thanh toán</h3>
        <div className="payment-options">
          <label className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={formData.paymentMethod === "COD"}
              onChange={handleInputChange}
            />
            <div className="payment-content">
              <span className="payment-icon">🚚</span>
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
              checked={formData.paymentMethod === "BANK"}
              onChange={handleInputChange}
            />
            <div className="payment-content">
              <span className="payment-icon">🏦</span>
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
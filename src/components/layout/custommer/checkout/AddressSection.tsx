import React from "react";
import { AddressResponse } from "../../../../service/user/CustomerAddressService";
import { Province, Ward } from "../../../../service//custommer/locationService";
interface AddressSectionProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    specificAddress: string;
    provinceName: string;
    wardName: string;
    notes: string;
  };
  errors: { [key: string]: string };
  savedAddresses: AddressResponse[];
  selectedAddressId: number | null;
  isLoadingAddresses: boolean;
  provinces: Province[];
  wards: Ward[];
  isLoadingProvinces: boolean;
  isLoadingWards: boolean;
  onSelectAddress: (address: AddressResponse) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function AddressSection({
  formData,
  errors,
  savedAddresses,
  selectedAddressId,
  isLoadingAddresses,
  provinces,
  wards,
  isLoadingProvinces,
  isLoadingWards,
  onSelectAddress,
  onInputChange,
}: AddressSectionProps) {
  return (
    <div className="checkout-left">
      <h2>Thông tin giao hàng</h2>

      {/* SAVED ADDRESSES DROPDOWN */}
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
                  onSelectAddress(selectedAddr);
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

      {/* ADDRESS FORM */}
      <form className="checkout-form">
        <div className="form-group">
          <label htmlFor="fullName">Tên người nhận</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            placeholder="Nhập họ và tên"
            className={errors.fullName ? "input-error" : ""}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* <div className="form-group">
          <label htmlFor="email">
            Email <span className="label-hint">(từ tài khoản)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Nhập email"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div> */}

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            placeholder="Nhập số điện thoại"
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      
        <div className="flex gap-4">
          <div className="form-group flex 1">
            <label htmlFor="provinceName">Tỉnh/Thành phố</label>
            <select
              id="provinceName"
              name="provinceName"
              value={formData.provinceName}
              onChange={onInputChange}
              disabled={isLoadingProvinces}
              className={`w-full ${errors.provinceName ? "input-error" : ""}`}

            >
              <option value="">-- Chọn tỉnh/thành phố --</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.provinceName && (
              <span className="error-message">{errors.provinceName}</span>
            )}
          </div>

          <div className="form-group flex 1 ">
            <label htmlFor="wardName">Xã/Phường</label>
            <select
              id="wardName"
              name="wardName"
              value={formData.wardName}
              onChange={onInputChange}
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
            {errors.wardName && (
              <span className="error-message">{errors.wardName}</span>
            )}
            {!formData.provinceName && (
              <span className="hint-text">Chọn tỉnh/thành phố trước</span>
            )}
          </div>
        </div>
     
         
          <div className="form-group">
          <label htmlFor="specificAddress">Địa chỉ chi tiết</label>
          <input
            type="text"
            id="specificAddress"
            name="specificAddress"
            value={formData.specificAddress}
            onChange={onInputChange}
            placeholder="Nhập chi tiết địa chỉ (số nhà, đường, ...)"
            className={errors.specificAddress ? "input-error" : ""}
          />
          {errors.specificAddress && (
            <span className="error-message">{errors.specificAddress}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Ghi chú (tùy chọn)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onInputChange}
            placeholder="Ghi chú thêm cho đơn hàng"
            rows={4}
          />
        </div>
      </form>
    </div>
  );
}

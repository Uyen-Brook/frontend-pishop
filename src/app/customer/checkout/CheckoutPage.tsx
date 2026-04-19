import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartItem } from "../../../types";
import { ROUTES } from "../../../config/routes";
import { useAuthStore } from "../../../store/authStore";
import Header from "../../../components/layout/custommer/header/Header";
import customerAddressService, { AddressResponse } from "../../../service/custommer/customerAddressService";
import locationService, { Province, Ward, } from "../../../service/custommer/locationService";
import CheckoutInfo from "../../../components/layout/custommer/checkout/CheckoutInfo";
import CheckoutSummary from "../../../components/layout/custommer/checkout/checkoutSummary";
import "./CheckoutPage.css";


interface LocationState {
  selectedItems: CartItem[];
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const selectedItems = state?.selectedItems || [];
  const authUser = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    email: authUser?.email || "",
    phone: "",
    specificAddress: "",
    provinceName: "",
    wardName: "",
    notes: "",
    paymentMethod: "COD",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const [savedAddresses, setSavedAddresses] = useState<AddressResponse[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Location states
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(true);
  const [isLoadingWards, setIsLoadingWards] = useState(false);

  // Fetch saved addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoadingAddresses(true);
      const addresses = await customerAddressService.getAddresses();
      setSavedAddresses(addresses);
      
      // Auto-select default address
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        handleSelectAddress(defaultAddress);
      }
      
      setIsLoadingAddresses(false);
    };

    fetchAddresses();
  }, []);

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      const data = await locationService.getProvinces();
      setProvinces(data);
      setIsLoadingProvinces(false);
    };

    fetchProvinces();
  }, []);

  // Fetch wards when province changes
  useEffect(() => {
    const fetchWards = async () => {
      if (!formData.provinceName.trim()) {
        setWards([]);
        return;
      }

      setIsLoadingWards(true);
      // Find province code by name
      const selectedProvince = provinces.find((p) => p.name === formData.provinceName);
      if (selectedProvince) {
        const data = await locationService.getWardsByProvinceCode(selectedProvince.code);
        setWards(data);
        
        // Only reset ward if it doesn't exist in the new ward list
        const wardExists = data.some((w) => w.name === formData.wardName);
        if (!wardExists && formData.wardName.trim()) {
          setFormData((prev) => ({
            ...prev,
            wardName: "",
          }));
        }
      }
      setIsLoadingWards(false);
    };

    fetchWards();
  }, [formData.provinceName, provinces]);

  if (selectedItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="checkout-empty">
          <h2>Không có sản phẩm để thanh toán</h2>
          <p>Vui lòng quay lại giỏ hàng và chọn sản phẩm</p>
          <button onClick={() => navigate(ROUTES.CART)}>Quay lại giỏ hàng</button>
        </div>
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectAddress = (address: AddressResponse) => {
    setFormData((prev) => ({
      ...prev,
      fullName: address.fullName,
      phone: address.phone,
      specificAddress: address.specificAddress,
      provinceName: address.provinceName,
      wardName: address.wardName,
    }));
    setSelectedAddressId(Number(address.id));
    setShowAddressForm(false);
  };

  const handleClearSelection = () => {
    setSelectedAddressId(null);
    setFormData((prev) => ({
      ...prev,
      fullName: "",
      phone: "",
      specificAddress: "",
      provinceName: "",
      wardName: "",
    }));
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Vietnamese phone format: 0961234567 or +84961234567
    const phoneRegex = /^(0|84)\d{9,10}$|^\+84\d{9,10}$/;
    const cleanPhone = phone.replace(/\s/g, "");
    return phoneRegex.test(cleanPhone);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const { fullName, email, phone, specificAddress, provinceName, wardName } = formData;

    if (!fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (vd: 0961234567)";
    }

    if (!specificAddress.trim()) {
      newErrors.specificAddress = "Vui lòng nhập chi tiết địa chỉ";
    }

    if (!provinceName.trim()) {
      newErrors.provinceName = "Vui lòng chọn tỉnh/thành phố";
    }

    if (!wardName.trim()) {
      newErrors.wardName = "Vui lòng chọn xã/phường";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
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
    <div className="min-h-screen bg-white">
      <div className="checkout-container">
      <CheckoutInfo
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        savedAddresses={savedAddresses}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
        isLoadingAddresses={isLoadingAddresses}
        showAddressForm={showAddressForm}
        setShowAddressForm={setShowAddressForm}
        provinces={provinces}
        wards={wards}
        isLoadingProvinces={isLoadingProvinces}
        isLoadingWards={isLoadingWards}
        handleInputChange={handleInputChange}
        handleSelectAddress={handleSelectAddress}
        handleClearSelection={handleClearSelection}
      />

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

        <CheckoutSummary
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
          totalPayable={totalPayable}
          onPlaceOrder={handlePlaceOrder}
          onBackToCart={() => navigate(ROUTES.CART)}
        />
      </div>
    </div>
    </div>
  );
}

// CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart, CartItem } from "../../../types";
import { CartService } from "../../../service/user/CartService";
import { ROUTES } from "../../../config/routes";
import Header from "../../../components/layout/custommer/header/Header";
import CartItemComponent from "../../../components/cart/CartItem";
import CartEmpty from "../../../components/cart/CartEmpty";
import CartSummary from "../../../components/cart/CartSummary";
import "./CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // giả sử accountId = 1
    CartService.getCartByAccountId(1).then((data) => {
      setCart(data);
      setIsInitialized(true);
    });
  }, []);

  const handleToggle = (id: number) => {
    if (!cart) return;
    const updatedItems = cart.items.map((item) =>
      item.productId === id ? { ...item, selected: !item.selected } : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (!cart) return;
    const updatedItems = cart.items.map((item) => ({
      ...item,
      selected: selectAll,
    }));
    setCart({ ...cart, items: updatedItems });
  };

  const handleUpdateQty = (id: number, change: number) => {
    if (!cart) return;
    const updatedItems = cart.items.map((item) =>
      item.productId === id
        ? { ...item, quantity: change }
        : item
    );
    setCart({ ...cart, items: updatedItems });
  };

  const handleDeleteItem = (id: number) => {
    if (!cart) return;
    const updatedItems = cart.items.filter((item) => item.productId !== id);
    setCart({ ...cart, items: updatedItems });
  };

  const handleCheckout = () => {
    const selectedItems = cart?.items.filter((item) => item.selected) || [];
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán");
      return;
    }
    // Navigate to checkout with selected items
    navigate(ROUTES.CHECKOUT, { state: { selectedItems } });
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Đang tải giỏ hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cart) return null;

  const selectedItems = cart.items.filter((item) => item.selected);
  const allSelected = cart.items.length > 0 && cart.items.every((item) => item.selected);

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* MAIN LAYOUT */}
        
        {cart.items.length === 0 && (
          <div>
            <CartEmpty />
          </div>
          )}
        <div className="cart-main-layout pb-20">
          {/* LEFT: CART ITEMS */}
          <div className="cart-page-left pl-10">
            {cart.items.length > 0 && (
              <div className="cart-header">
                <h2>Giỏ hàng của bạn ({cart.items.length})</h2>
                <label className="select-all-group">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                  <span>Chọn tất cả</span>
                </label>
              </div>
            )}
              
            {cart.items.length === 0 ? (
              <div>Related product</div>
            ) : (
              <div className="cart-items-list">
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.productId}
                    item={item}
                    onToggle={handleToggle}
                    onUpdateQty={handleUpdateQty}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          {cart.items.length > 0 && (
            <div className="cart-page-right">
              <CartSummary
                totalProduct={selectedItems.length}
                subtotal={totalPrice}
                discount={totalDiscount}
                cartTotal={totalPayable}
                onCheckout={handleCheckout}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



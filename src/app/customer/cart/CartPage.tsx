// CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart, CartItem } from "../../../types";
import { CartService } from "../../../service/user/CartService";
import { ROUTES } from "../../../config/routes";
import CartItemComponent from "../../../components/cart/CartItem";
import CartEmpty from "../../../components/cart/CartEmpty";
import CartSummary from "../../../components/cart/CartSummary";
import "./CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    // giả sử accountId = 1
    CartService.getCartByAccountId(1).then((data) => {
      setCart(data);
    });
  }, []);
  //Số lượng sản phẩm
  const [qtyError, setQtyError] = useState<Record<number, string>>({});

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
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
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
  if (!cart) return <div className="text-center p-10">Đang tải giỏ hàng...</div>;
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
    <div className="cart-page-container">
      <div className= "cart-page-left">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>Giỏ hàng của bạn</h2>
          {cart.items.length > 0 && (
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{ width: 20, height: 20 }}
              />
              <span>Chọn tất cả</span>
            </label>
          )}
        </div>
        {cart.items.length === 0 ? (
          <CartEmpty />
        ) : (
          cart.items.map((item) => (
            <CartItemComponent
              key={item.productId}
              item={item}
              onToggle={handleToggle}
              onUpdateQty={handleUpdateQty}
              onDelete={handleDeleteItem}
            />
          ))
        )}
        {cart.items.length > 0 && (
          <div className="cart-total">
            <strong>Tổng tiền: </strong>
            {cart.totalPrice.toLocaleString("vi-VN")}đ
          </div>
        )}
      </div>
      <div className="cart-page-right">
        <CartSummary
          totalProduct={selectedItems.length}
          subtotal={totalPrice}
          discount={totalDiscount}
          cartTotal={totalPayable}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}



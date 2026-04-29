import React, { useState, useEffect } from "react";
import { CartItem } from "../../types";
import "./css/CartItem.css";


interface Props {
  item: CartItem;
  onToggle: (id: number) => void;
  onUpdateQty: (id: number, newQuantity: number) => void;
  onDelete: (id: number) => void;
}

export default function CartItemComponent({ item, onToggle, onUpdateQty, onDelete }: Props) {
  const [qtyError, setQtyError] = useState<Record<number, string>>({});
  const [quantity, setQuantity] = useState(item.quantity);
  // xử lý logic liên quan đến cart store
  
  // Sync quantity with parent item when item.quantity changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);

    if (isNaN(value)) return;

    if (value < 1) {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: "Số lượng tối thiểu là 1",
      }));
      value = 1;
    } else if (value > item.stockQuantity) {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: `Chỉ còn ${item.stockQuantity} sản phẩm`,
      }));
      value = item.stockQuantity;
    } else {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: "",
      }));
    }

    setQuantity(value);
    onUpdateQty(item.productId, value);
  };

  const handleUpdate = (change: number) => {
    let newValue = quantity + change;

    if (newValue < 1) {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: "Số lượng tối thiểu là 1",
      }));
      newValue = 1;
    } else if (newValue > item.stockQuantity) {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: `Chỉ còn ${item.stockQuantity} sản phẩm trong kho`,
      }));
      newValue = item.stockQuantity;
    } else {
      setQtyError((prev) => ({
        ...prev,
        [item.productId]: "",
      }));
    }

    setQuantity(newValue);
    onUpdateQty(item.productId, newValue);
  };

  const isOutOfStock = item.stockQuantity === 0;
  const canIncreaseQty = quantity < item.stockQuantity;

  return (
    <div className={`cart-item-card ${item.selected ? "selected" : ""}`}>
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onToggle(item.productId)}
        style={{ width: 20, height: 20 }}
      />

      <img
        src={item.thumbnail}
        alt={item.productName}
        className="cart-item-img"
      />

      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.productName}</h3>
        <p className="cart-item-sku">{item.modelNumber}</p>

        <div className="cart-item-price-group">
          <span className="cart-item-price">
            {item.finalPrice.toLocaleString("vi-VN")}₫
          </span>
          {item.discountValue > 0 && (
            <span className="old-price">
              {item.basePrice.toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>
      </div>

      <div className="cart-controls">
        <div className="quantity-control">
          <button onClick={() => handleUpdate(-1)} disabled={isOutOfStock}>−</button>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={handleChange}
            disabled={isOutOfStock}
          />
          <button onClick={() => handleUpdate(1)} disabled={!canIncreaseQty}>+</button>
        </div>
        
        <button className="btn-delete" onClick={() => onDelete(item.productId)}>
          Xóa
        </button>

        <div className="item-total">
          {(item.finalPrice * quantity).toLocaleString("vi-VN")}₫
        </div>
      </div>

      {isOutOfStock && (
        <p className="out-of-stock-notice">Sản phẩm hết hàng</p>
      )}

      {!isOutOfStock && qtyError[item.productId] && (
        <p className="error-message">{qtyError[item.productId]}</p>
      )}
    </div>
  );
}

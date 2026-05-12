import React from 'react';
import './css/CartEmty.css';
import {ROUTES} from "../../config/routes";
const CartEmpty: React.FC = () => {
  return (
    <div className="cart-empty">
      <h2>Your cart is empty</h2>
      <p>Browse our menu to add delicious items to your cart</p>
      <button className="btn-continue" onClick={() => window.location.href = ROUTES.PRODUCT}>
        Continue Shopping
      </button>
    </div>
  );
};

export default CartEmpty;

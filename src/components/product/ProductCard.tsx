import { Link } from "react-router-dom";
import type { Product } from "../../types/index"
import { useCartStore } from "../../store/CartStore";
import "./ProductCard.css";
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToLocalCart = useCartStore((state) => state.addToLocalCart);

  const discountedPrice = product.discountType === "PERCENT"
    ? product.price * (1 - (product.discountValue || 0) / 100)
    : product.discountType === "FIXED_AMOUNT"
    ? product.price - (product.discountValue || 0)
    : product.price;

  const discountPercent = product.discountType === "PERCENT"
    ? Math.floor(product.discountValue || 0)
    : product.discountType === "FIXED_AMOUNT"
    ? Math.floor((((product.price - discountedPrice) / product.price) * 100))
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToLocalCart(product.id, 1);
    alert(`Đã thêm ${product.modelName} vào giỏ hàng!`);
  };

  return (
    <div className="product-card">
      {/* IMAGE SECTION */}
      <div className="product-image">
        <img
          src={product.thumbnail}
          alt={product.modelName}
        />

        {/* Status Badge */}
        {product.productStatus && (
          <span className="badge new">
            {product.productStatus}
          </span>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="badge sale">
            -{discountPercent}%
          </span>
        )}

        {/* Out of Stock */}
        {product.quantity === 0 && (
          <span className="out-of-stock">Hết hàng</span>
        )}
      </div>

      {/* INFO SECTION */}
      <div className="product-info">
        {/* Product Name */}
        <h3 className="product-name">
          {product.modelName}
        </h3>

        {/* Model Number */}
        {/* <p className="product-model">
          {product.modelNumber}
        </p> */}

        {/* Promotion */}
        {/* {product.promotionName && (
          <p className="product-promo">
            ✓ {product.promotionName}
          </p>
        )} */}

        {/* PRICE SECTION */}
        <div className="product-price">
          {product.discountType ? (
            <>
              <span className="price-current">
                {Math.floor(discountedPrice).toLocaleString()}₫
              </span>
              <span className="price-old">
                {Math.floor(product.price).toLocaleString()}₫
              </span>
            </>
          ) : (
            <span className="price-current">
              {product.price.toLocaleString()}₫
            </span>
          )}
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? "Hết hàng" : "Thêm vào giỏ"}
        </button>

        {/* VIEW DETAIL BUTTON */}
        <Link to={`/product/${product.id}`} className="view-detail">
          Chi tiết
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/layout/custommer/header/Header";
import { productService } from "../../../service/custommer/productService";
import { useCartStore } from "../../../store/CartStore";
import type { ProductResponse } from "../../../types/index";
import ProductDetailComponent from "../../../components/product/ProductDetailComponent";
import "./ProductDetail.css";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import AddNewProduct from "../../../components/layout/admin/product/AddProductForm";

export default function ProductDetailPage() {
  const { id } = useParams();
  if (!id) return <div>Not found</div>;
  const productId = Number(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "reviews">("specs");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const addToLocalCart = useCartStore((state) => state.addToLocalCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await productService.getById(parseInt(id));
          setProduct(data);
          if (data?.thumbnail) {
            setSelectedImage(data.thumbnail);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
      
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-1400 mx-auto p-6">
          <p className="text-center text-gray-600">Không tìm thấy sản phẩm</p>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    addToLocalCart(product.id, quantity);
    alert(`Đã thêm ${quantity} ${product.modelName} vào giỏ hàng!`);
  };

  return (
    <div className="min-h-screen bg-white">
      <ProductDetailComponent id={productId} />
      <div style={{ paddingTop: "80px" }}>
        <div className="max-w-1400 mx-auto px-6 py-6">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-blue-600">
              <FaArrowLeft size={14} />
              Quay lại
            </button>
            <span>/</span>
            <span>{product.categoryName}</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.modelName}</span>
          </div>

          {/* MAIN LAYOUT: Gallery + Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* LEFT: GALLERY */}
            <div className="product-gallery">
              <div className="main-image mb-4">
                <img
                  src={selectedImage}
                  alt={product.modelName}
                  className="w-full h-400 object-cover rounded-lg bg-gray-100"
                />
              </div>
              <div className="thumbnail-list flex gap-2 overflow-x-auto">
                {/* Thumbnail */}
                <div
                  onClick={() => setSelectedImage(product.thumbnail)}
                  className={`cursor-pointer w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
                    selectedImage === product.thumbnail ? "border-blue-500" : "border-gray-200"
                  } hover:border-blue-400`}
                >
                  <img src={product.thumbnail} alt="main" className="w-full h-full object-cover" />
                </div>
                {/* List Images */}
                {product.listImage && product.listImage.length > 0 && product.listImage.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`cursor-pointer w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 ${
                      selectedImage === img ? "border-blue-500" : "border-gray-200"
                    } hover:border-blue-400`}
                  >
                    <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="product-info">
              {/* Status Badge */}
              {product.productStatus && (
                <span className={`inline-block px-3 py-1 rounded text-white text-xs font-semibold mb-3 ${
                  product.productStatus === "NEW" ? "bg-green-500" :
                  product.productStatus === "HOT" ? "bg-red-500" : "bg-blue-500"
                }`}>
                  {product.productStatus}
                </span>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.modelName}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(245 đánh giá)</span>
              </div>

              {/* Price Section */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-3xl font-bold text-red-600">
                    {Math.floor(discountedPrice).toLocaleString()}₫
                  </span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {Math.floor(product.price).toLocaleString()}₫
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded font-semibold text-sm">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                {product.promotionName && (
                  <p className="text-green-600 text-sm font-semibold">
                    ✓ {product.promotionName}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-900 mb-2">Mô tả ngắn</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Quantity & Stock */}
              <div className="mb-6 pb-6 border-b">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Số lượng</p>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          setQuantity(Math.min(Math.max(val, 1), product.quantity));
                        }}
                        min="1"
                        max={product.quantity}
                        className="w-16 px-2 py-2 text-center font-semibold border-0 outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={quantity >= product.quantity}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tồn kho</p>
                    <p className={`text-lg font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.quantity > 0 ? `${product.quantity} sản phẩm` : "Hết hàng"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <FaShoppingCart /> Thêm vào giỏ
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50">
                  <FaHeart /> Yêu thích
                </button>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600 font-medium">📦 Hãng:</span>
                  <span className="font-semibold text-blue-600">{product.brandName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-600 font-medium">🏭 Nhà cung cấp:</span>
                  <span className="font-semibold text-purple-600">{product.supplierName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-gray-600 font-medium">🏷️ Danh mục:</span>
                  <span className="font-semibold text-amber-600">{product.categoryName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600 font-medium">📋 Mô hình:</span>
                  <span className="font-semibold text-green-600">{product.modelNumber}</span>
                </div>
                {product.promotionName && (
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-gray-600 font-medium">🎁 Khuyến mãi:</span>
                    <span className="font-semibold text-red-600">{product.promotionName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="border-t pt-8">
            <div className="flex gap-8 mb-6 border-b">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-4 font-semibold transition ${
                  activeTab === "specs"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🔧 Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab("description")}
                className={`pb-4 font-semibold transition ${
                  activeTab === "description"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📝 Mô tả chi tiết
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 font-semibold transition ${
                  activeTab === "reviews"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ⭐ Đánh giá
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "specs" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {/* Basic Info */}
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900 w-1/3">Tên mô hình</td>
                        <td className="py-3 px-4">{product.modelName}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Số mô hình</td>
                        <td className="py-3 px-4">{product.modelNumber}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Hãng sản xuất</td>
                        <td className="py-3 px-4 font-semibold text-blue-600">{product.brandName}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Danh mục</td>
                        <td className="py-3 px-4">{product.categoryName}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Nhà cung cấp</td>
                        <td className="py-3 px-4">{product.supplierName}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Trạng thái</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-3 py-1 rounded text-white text-xs font-semibold ${
                            product.productStatus === "NEW" ? "bg-green-500" :
                            product.productStatus === "HOT" ? "bg-red-500" : "bg-blue-500"
                          }`}>
                            {product.productStatus}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">Tồn kho</td>
                        <td className={`py-3 px-4 font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                          {product.quantity > 0 ? `${product.quantity} sản phẩm` : "Hết hàng"}
                        </td>
                      </tr>
                      
                      {/* Detailed Specifications - Handle both flat and nested structures */}
                      {product.specification && Object.entries(product.specification).map(([key, value], index) => {
                        // Check if value is an object (nested structure)
                        if (typeof value === 'object' && value !== null) {
                          return [
                            // Header row for category
                            <tr key={`${index}-header`} className="border-b">
                              <td colSpan={2} className="py-3 px-4 bg-blue-50 font-bold text-blue-900">{key}</td>
                            </tr>,
                            // Nested specification rows
                            ...Object.entries(value as Record<string, string>).map(([subKey, subValue], subIndex) => (
                              <tr key={`${index}-${subIndex}`} className="border-b">
                                <td className="py-3 px-6 bg-gray-50 font-semibold text-gray-800 border-l-4 border-blue-400">
                                  {subKey}
                                </td>
                                <td className="py-3 px-4 text-gray-700">{String(subValue)}</td>
                              </tr>
                            ))
                          ];
                        }
                        // Flat structure (string value)
                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-900">{key}</td>
                            <td className="py-3 px-4 text-gray-700">{value}</td>
                          </tr>
                        );
                      }).flat()}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "description" && (
                <div className="prose prose-sm max-w-none space-y-6">
                  {/* Main Description */}
                  {product.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả sản phẩm</h3>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  )}

                  {/* Promotion Offer */}
                  {(product.promotionName || product.promotionDescription) && (
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🎉</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-green-900 text-lg mb-2">{product.promotionName || "Khuyến mãi đặc biệt"}</h4>
                          <p className="text-green-800 font-semibold mb-2">
                            {product.discountType === "PERCENT" 
                              ? `Giảm ${product.discountValue}%` 
                              : product.discountType === "FIXED_AMOUNT"
                              ? `Giảm ${product.discountValue?.toLocaleString()}₫`
                              : ""}
                          </p>
                          {product.promotionDescription && (
                            <p className="text-green-700 text-sm">{product.promotionDescription}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Hãng sản xuất</p>
                      <p className="text-lg font-bold text-blue-600">{product.brandName}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Nhà cung cấp</p>
                      <p className="text-lg font-bold text-purple-600">{product.supplierName}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Danh mục</p>
                      <p className="text-lg font-bold text-amber-600">{product.categoryName}</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Số mô hình</p>
                      <p className="text-lg font-bold text-orange-600">{product.modelNumber}</p>
                    </div>
                  </div>

                  {/* Detailed Specs */}
                  {product.specification && Object.keys(product.specification).length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông số chi tiết</h3>
                      <div className="space-y-4">
                        {Object.entries(product.specification).map(([key, value], index) => {
                          // Handle nested structure (2-level deep)
                          if (typeof value === 'object' && value !== null) {
                            return (
                              <div key={index} className="border rounded-lg overflow-hidden">
                                {/* Category Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
                                  <h4 className="text-white font-bold text-base">{key}</h4>
                                </div>
                                {/* Nested Items Grid */}
                                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50">
                                  {Object.entries(value as Record<string, string>).map(([subKey, subValue], subIndex) => (
                                    <div key={subIndex} className="p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition">
                                      <p className="text-xs text-gray-600 font-semibold uppercase mb-1 text-blue-600">{subKey}</p>
                                      <p className="text-sm text-gray-900 font-medium">{String(subValue)}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                          // Handle flat structure (1-level, string values)
                          return (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                              <p className="text-xs text-gray-600 font-semibold uppercase mb-2 text-blue-600">{key}</p>
                              <p className="text-sm text-gray-900 font-medium leading-relaxed">{value}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="text-center py-12">
                  <FaStar size={48} className="mx-auto mb-4 text-yellow-400" />
                  <p className="text-gray-600">Chưa có đánh giá. Hãy là người đầu tiên đánh giá sản phẩm này!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

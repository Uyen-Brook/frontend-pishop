import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/layout/custommer/header/Header";
import { productService } from "../../../service/public/productService";
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
    <div className="max-w-7xl mx-auto px-4 pt-6">
     
      <div style={{ paddingTop: "70px" }}>
        <div className="max-w-1200 mx-auto px-6">
          {/* BREADCRUMB */}
           <section>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-blue-600">
              <FaArrowLeft size={14} />
              Quay lại
            </button>
            <span>/</span>
            <span>{product.categoryName}</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.modelName}</span>
          </div>
          </section>
          <ProductDetailComponent id={productId} />
         </div>
         </div>
    </div>
  );
}

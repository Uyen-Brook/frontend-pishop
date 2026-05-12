import React from "react";
import { useState, useEffect } from "react";
import { productService } from "../../service/public/productService";
import type { ProductResponse } from "../../types/index";
import ProductImage from "./ProductImage";
import DOMPurify from "dompurify";


type Props = {
  id: number;
};

const ProductDetailComponent = ({ id }: Props) => {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("spec");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await productService.getById(id);
        if (productData) {
          setProduct(productData);
          setSelectedImage(productData.listImage?.[0] || productData.thumbnail);
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải sản phẩm");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-lg">{error || "Không tìm thấy sản phẩm"}</div>
        </div>
      </div>
    );
  }

  const finalPrice = product.price - product.discountValue;

  const renderSpecValue = (value: string | Record<string, string>) =>
    typeof value === "object" ? Object.values(value).join(", ") : value;

  const renderSpec = () => {
    return Object.entries(product.specification).map(([key, value]) => (
      <div key={key} className="flex justify-between py-2 border-b text-sm">
        <span className="text-gray-500">{key}</span>
        <span className="font-medium text-right">
          {renderSpecValue(value)}
        </span>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* TOP */}
      <div className="grid grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

        {/* LEFT: GALLERY */}
        <ProductImage selectedImage={selectedImage} setSelectedImage={setSelectedImage} product={product} />

        {/* RIGHT */}
        <div className="space-y-4">

          <div className="flex items-center gap-2 text-xs">
            {product.productStatus && (
              <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${product.productStatus === "NEW" ? "bg-green-100 text-green-600 px-2 py-1 rounded" :
                product.productStatus === "HOT" ? "bg-red-100 text-red-600 px-2 py-1 rounded" : "bg-blue-100 text-blue-600 px-2 py-1 rounded"
                }`}>
                {product.productStatus}
              </span>
            )}
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
            </span>
            <span className="text-gray-400">
              Model number: {product.modelNumber}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.modelName}</h1>

          {/* price */}
          <div className="flex items-center gap-3">
            {finalPrice === product.price ? (
              <span className="text-red-500 text-2xl font-bold">
                ${finalPrice}
              </span>
            ) : (
              <>
                <span className="text-red-500 text-2xl font-bold">
                  ${finalPrice}
                </span>
                <span className="line-through text-gray-400">
                  ${product.price}
                </span>
              </>
            )}
            {product.discountPercent && (
              <span className="text-green-600 text-sm font-semibold">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          {/* highlights */}
          <ul className="text-sm text-gray-600 space-y-1">
            {product.specification?.["Processor"] && (
              <li>✔ {renderSpecValue(product.specification["Processor"])}</li>
            )}
            {product.specification?.["Display"] && (
              <li>✔ {renderSpecValue(product.specification["Display"])}</li>
            )}
            {product.specification?.["Storage"] && (
              <li>✔ {renderSpecValue(product.specification["Storage"])}</li>
            )}
          </ul>
          <div>
            <p className="text-sm text-gray-600">Tồn kho</p>
            <p className={`text-lg font-semibold ${product.quantity > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.quantity > 0 ? `${product.quantity} sản phẩm` : "Hết hàng"}
            </p>
          </div>
          {/* quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm">QUANTITY</span>
            <div className="flex border rounded">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3"
              >-</button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3"
              >+</button>
            </div>
          </div>

          {/* buttons */}
          <div className="flex gap-4">
            <button className="w-full py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white">
              ADD TO CART
            </button>

            <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
              BUY NOW
            </button>
          </div>
          {product.promotionName?.trim() && (
            <div className="space-y-2">
              {/* Title */}
              <div>
                <strong className="font-medium">Bạn sẽ nhận được</strong>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-start gap-2">
                  {/* Icon */}
                  <div>
                    <img
                      src="https://shopfront-cdn.tekoapis.com/cart/gift-filled.png"
                      alt="gift"
                      className="w-[25px] h-[25px]"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-sm text-gray-700">
                    {product.promotionName}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* CONTENT (NO TABS - SEQUENTIAL LAYOUT) */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow space-y-10">

        {/* ===================== SPECIFICATIONS ===================== */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Thông số kỹ thuật
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full">
                <tbody>
                  {product.specification &&
                    Object.entries(product.specification).map(([key, value], index) => {

                      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                        return (
                          <React.Fragment key={index}>
                            <tr className="bg-blue-50">
                              <td colSpan={2} className="px-5 py-3 font-bold text-blue-700">
                                {key}
                              </td>
                            </tr>

                            {Object.entries(value as Record<string, any>).map(([subKey, subValue], subIndex) => {

                              if (typeof subValue === "object" && subValue !== null && !Array.isArray(subValue)) {
                                return (
                                  <React.Fragment key={`${index}-${subIndex}`}>
                                    <tr className="bg-gray-100">
                                      <td colSpan={2} className="px-5 py-2 font-semibold text-gray-700">
                                        {subKey}
                                      </td>
                                    </tr>

                                    {Object.entries(subValue as Record<string, any>).map(
                                      ([deepKey, deepValue], deepIndex) => (
                                        <tr
                                          key={`${index}-${subIndex}-${deepIndex}`}
                                          className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                        >
                                          <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium text-gray-700">
                                            {deepKey}
                                          </td>
                                          <td className="px-5 py-4 text-sm text-gray-600">
                                            {String(deepValue)}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </React.Fragment>
                                );
                              }

                              return (
                                <tr
                                  key={`${index}-${subIndex}`}
                                  className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                                >
                                  <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium text-gray-700">
                                    {subKey}
                                  </td>
                                  <td className="px-5 py-4 text-sm text-gray-600">
                                    {String(subValue)}
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      }

                      return (
                        <tr key={index} className="border-t hover:bg-gray-50">
                          <td className="w-1/3 bg-gray-50 px-5 py-4 font-medium text-gray-700">
                            {key}
                          </td>
                          <td className="px-5 py-4 text-sm text-gray-600">
                            {String(value)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Master the Digital Era
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {/* {product.description} */}
              </p>
              <div className="bg-gray-100 border-l-4 border-red-500 p-3 text-sm italic">
                "This device is designed for modern professionals."
              </div>
              <section>
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                  Mô tả sản phẩm
                </h2>

                <div className="grid grid-cols-1 gap-4">

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Hãng sản xuất</p>
                    <p className="text-lg font-bold text-blue-600">{product.brandName}</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Nhà cung cấp</p>
                    <p className="text-lg font-bold text-purple-600">{product.supplierName}</p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Tên sản phẩm</p>
                    <p className="text-lg font-bold text-amber-600">{product.modelName}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Số model</p>
                    <p className="text-lg font-bold text-orange-600">{product.modelNumber}</p>
                  </div>


                </div>
              </section>
            </div>
          </div>
        </section>

        {/* ===================== DESCRIPTION ===================== */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Mô tả sản phẩm
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div
              className="prose max-w-none text-sm text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />
          </div>
        </section>

        {/* ===================== REVIEWS ===================== */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Đánh giá sản phẩm
          </h2>

          <p className="text-sm text-gray-500">
            Chưa có đánh giá nào.
          </p>
        </section>

      </div>
    </div>)

};

export default ProductDetailComponent;
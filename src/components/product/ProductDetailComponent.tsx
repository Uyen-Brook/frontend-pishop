// import { useState, useEffect } from "react";
// import { productService } from "../../service/custommer/productService";
// import type { ProductDetail } from "../../types/index";

// type Props = {
//   id: number;
// };

// function ProductDetailComponent({ id }: Props) {
//   const [product, setProduct] = useState<ProductDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<string>("");
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const productData = await productService.getById(id);
//         if (productData) {
//           setProduct(productData);
//           setSelectedImage(productData.listImage?.[0] || productData.thumbnail);
//         } else {
//           setError("Không tìm thấy sản phẩm");
//         }
//       } catch (err) {
//         setError("Có lỗi xảy ra khi tải sản phẩm");
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-lg">{error || "Không tìm thấy sản phẩm"}</div>
//         </div>
//       </div>
//     );
//   }

//   const finalPrice = product.price - product.discountValue;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">

//       {/* TOP */}
//       <div className="grid grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">

//         {/* LEFT - IMAGE */}
//         <div>
//           <div className="border rounded-lg p-4">
//             <img src={selectedImage} className="w-full object-contain" />
//           </div>

//           {/* thumbnails */}
//           <div className="flex gap-3 mt-4">
//             {product.listImage.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 object-cover border rounded cursor-pointer 
//                   ${selectedImage === img ? "border-red-500" : ""}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="space-y-4">

//           {/* name */}
//           <h1 className="text-2xl font-semibold">
//             {product.modelName}
//           </h1>

//           {/* price */}
//           <div className="flex items-center gap-3">
//             <span className="text-red-500 text-2xl font-bold">
//               ${finalPrice}
//             </span>

//             <span className="line-through text-gray-400">
//               ${product.price}
//             </span>

//             <span className="text-green-600 text-sm font-semibold">
//               {product.discountPercent}% OFF
//             </span>
//           </div>

//           {/* description */}
//           <p className="text-gray-600 text-sm">
//             {product.description}
//           </p>

//           {/* quantity */}
//           <div className="flex items-center gap-3">
//             <span>Quantity</span>
//             <div className="flex border rounded">
//               <button
//                 onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                 className="px-3"
//               >-</button>

//               <span className="px-4">{quantity}</span>

//               <button
//                 onClick={() => setQuantity(q => q + 1)}
//                 className="px-3"
//               >+</button>
//             </div>
//           </div>

//           {/* buttons */}
//           <div className="flex gap-4">
//             <button className="w-full py-3 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white">
//               ADD TO CART
//             </button>

//             <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
//               BUY NOW
//             </button>
//           </div>

//           {/* promotion */}
//           <div className="bg-red-50 border border-red-200 p-3 rounded text-sm">
//             🎁 {product.promotionName}: {product.promotionDescription}
//           </div>

//         </div>
//       </div>

//       {/* BOTTOM */}
//       <div className="bg-white mt-6 p-6 rounded-xl shadow">

//         <h2 className="font-semibold mb-4">Technical Specifications</h2>

//         <div className="grid grid-cols-2 gap-4 text-sm">
//           {Object.entries(product.specification).map(([key, value]) => (
//             <div key={key} className="flex justify-between border-b py-2">
//               <span className="text-gray-500">{key}</span>
//               <span className="font-medium text-right">
//                 {typeof value === "string"
//                   ? value
//                   : JSON.stringify(value)}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
          
//     </div>
//   );
// };
// export default ProductDetailComponent;
import { useState, useEffect } from "react";
import { productService } from "../../service/custommer/productService";
import type { ProductDetail } from "../../types/index";
import ProductImage from "./ProductImage";

type Props = {
  id: number;
};

const ProductDetailComponent = ({ id }: Props) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
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
      <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
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
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
              IN STOCK
            </span>
            <span className="text-gray-400">
              SKU: {product.modelNumber}
            </span>
          </div>

          <h1 className="text-2xl font-semibold">
            {product.modelName}
          </h1>

          {/* price */}
          <div className="flex items-center gap-3">
            <span className="text-red-500 text-2xl font-bold">
              ${finalPrice}
            </span>
            <span className="line-through text-gray-400">
              ${product.price}
            </span>
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

          {/* <ul className="text-sm text-gray-600 space-y-1">
            {product.specification["Processor"] && <li>✔ {renderSpecValue(product.specification["Processor"])}</li>}
            {product.specification["Display"] && <li>✔ {renderSpecValue(product.specification["Display"])}</li>}
            {product.specification["Storage"] && <li>✔ {renderSpecValue(product.specification["Storage"])}</li>}
          </ul> */}

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

          {/* promo */}
          <div className="bg-red-50 border border-red-200 p-3 rounded text-sm">
            🎁 {product.promotionName}: {product.promotionDescription}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow">

        {/* tab header */}
        <div className="flex gap-6 border-b mb-4 text-sm">
          <button
            onClick={() => setActiveTab("spec")}
            className={`pb-2 ${
              activeTab === "spec"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Specifications
          </button>

          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-2 ${
              activeTab === "desc"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("review")}
            className={`pb-2 ${
              activeTab === "review"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Reviews (128)
          </button>
        </div>

        {/* tab content */}
        {activeTab === "spec" && (
          
          <div className="grid grid-cols-2 gap-8">
            <div>
             {product.specification && Object.entries(product.specification).map(([key, value], index) => {
                        // Check if value is an object (nested structure)
                        if (typeof value === 'object' && value !== null) {
                          return [
                            // Header row for category
                            <tr key={`${index}-header`} className="border-b">
                              <td colSpan={2} className="py-3 px-4 bg-blue-50 font-bold text-blue-00">{key}</td>
                            </tr>,
                            // Nested specification rows
                            ...Object.entries(value as Record<string, string>).map(([subKey, subValue], subIndex) => (
                              <tr key={`${index}-${subIndex}`} className="border-b">
                                <td className="py-3 px-6 bg-gray-50 font-semibold text-gray-800 border-l-4 border-blue-400">
                                  {subKey}
                                </td>
                                <td className="text-sm py-3 px-4 text-gray-700">{String(subValue)}</td>
                              </tr>
                            ))
                          ];
                        }
                        // Flat structure (string value)
                        return (
                          <tr key={index} className="border-b">
                            <td className=" text-sm py-3 px-4 bg-gray-10 font-semibold text-gray-900">{key}</td>
                            <td className="text-sm py-3 px-4 text-gray-600">{value}</td>
                          </tr>
                        );
                      }).flat()}
                      </div>
            <div>
              <h3 className="font-semibold mb-2">
                Master the Digital Era
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {product.description}
              </p>
              

              <div className="bg-gray-100 border-l-4 border-red-500 p-3 text-sm italic">
                "This device is designed for modern professionals."
              </div>
            </div>
          </div>
        )}

        {activeTab === "desc" && (
          <p className="text-sm text-gray-600">
            {product.description}
          </p>
        )}

        {activeTab === "review" && (
          <p className="text-sm text-gray-500">
            Chưa có đánh giá nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailComponent;
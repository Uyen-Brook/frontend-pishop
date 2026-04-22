import type { ProductDetail } from "../../types/index";

type Props = {
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  product: ProductDetail;
};

const ProductImage = ({ selectedImage, setSelectedImage, product }: Props) => {
  return (
    <div className="pt-3">
      {/* Main image */}
      <div className="mb-4">
        <img
          src={selectedImage}
          alt={product.modelName}
          className="w-full h-[400px] object-contain rounded-lg bg-gray-100"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {/* Thumbnail chính */}
        <div
          onClick={() => setSelectedImage(product.thumbnail)}
          className={`w-20 h-20 rounded border-2 overflow-hidden cursor-pointer flex-shrink-0
          transition-all duration-300 hover:scale-105
          ${
            selectedImage === product.thumbnail
              ? "border-blue-500"
              : "border-gray-200 hover:border-blue-400"
          }`}
        >
          <img
            src={product.thumbnail}
            alt="main"
            className="w-full h-full object-cover"
          />
        </div>

        {/* List images */}
        {product.listImage?.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 rounded border-2 overflow-hidden cursor-pointer flex-shrink-0
            transition-all duration-300 hover:scale-105
            ${
              selectedImage === img
                ? "border-blue-500"
                : "border-gray-200 hover:border-blue-400"
            }`}
          >
            <img
              src={img}
              alt={`Product ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;

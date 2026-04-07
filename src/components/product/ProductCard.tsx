import type { Product } from "../../types/index"

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded shadow p-4 w-64">
      <img
        src= {product.thumbnail}
        alt={product.modelName}
        className="w-full h-40 object-cover"
      />

      <h3 className="font-semibold mt-2">{product.modelName}</h3>
      <p className="text-gray-500">{product.brandName}</p>

      <p className="text-lg font-bold text-red-600 mt-2">
        {product.price.toLocaleString()}₫
      </p>

      {product.promotionName && (
        <p className="text-sm text-green-600">{product.promotionName}</p>
      )}
    </div>
  );
}

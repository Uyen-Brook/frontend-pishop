import type { Brand } from "../../types/index";

interface Props {
  brands: Brand[];
  selectedBrand: number | null;
  onSelect: (brandId: number | null) => void;
}

export default function BrandBar({ brands, selectedBrand, onSelect }: Props) {
  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-1 lg:px-6 lg:py-2">
        {/* <h3 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2">Lọc theo thương hiệu</h3> */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => onSelect(null)}
            className={`px-3 lg:px-4 lg:py-2 rounded-full whitespace-nowrap transition-all text-xs lg:text-sm font-medium ${
              selectedBrand === null
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onSelect(brand.id)}
              className={`px-3 py-1 lg:px-4 lg:py-2 rounded-full whitespace-nowrap transition-all text-xs lg:text-sm font-medium ${
                selectedBrand === brand.id
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

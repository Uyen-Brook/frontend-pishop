import { useEffect, useState } from "react";
import Header from "../../components/layout/custommer/Header";
import MenuBar from "../../components/menu/MenuBar";
import ProductCard from "../../components/product/ProductCard";

import { categoryService } from "../../service/custommer/categoryService";
import { productService } from "../../service/custommer/productService";

import type { Category } from "../../types/index";
import type { Product } from "../../types/index";
import type { DiscountType } from "../../types/index";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Laptop");

  useEffect(() => {
    categoryService.getAll().then(setCategories);
  }, []);

  useEffect(() => {
    productService.getByCategory(selectedCategory).then(setProducts);
  }, [selectedCategory]);

  return (
    <div>
      <Header />

      <MenuBar
        categories={categories}
        onSelect={(name) => setSelectedCategory(name)}
      />

      <div className="px-6 mt-6">
        <h2 className="text-xl font-bold mb-4">
          Sản phẩm: {selectedCategory}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

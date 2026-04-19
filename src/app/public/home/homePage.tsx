import { useEffect, useState } from "react";
import Header from "../../../components/layout/custommer/header/Header";
import ProductCard from "../../../components/product/ProductCard";

import { categoryService } from "../../../service/custommer/categoryService";
import { productService } from "../../../service/custommer/productService";

import type { Category, Product } from "../../../types/index";
import SideBarV2 from "../../../components/menu/menuCategory/SideBarV2";
import "./homePage.css";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tải danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getAll();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Tải sản phẩm khi thay đổi category
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let productsData: Product[];
        
        if (selectedCategory) {
          // Lọc theo category nếu được chọn
          productsData = await productService.getByCategory(selectedCategory);
        } else {
          // Hiển thị tất cả sản phẩm nếu không chọn category nào
          productsData = await productService.getAll();
        }
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto">
  
      <div className="flex gap-6 p-6">
        {/* Left Sidebar - Categories */}
        <div className="w-64 flex-shrink-0">
          <SideBarV2 
            categories={categories}
            activeCategory={selectedCategory || ""}
            onSelect={(name) => {
              setSelectedCategory(selectedCategory === name ? null : name);
            }}
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          {/* Products Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory ? selectedCategory : "Tất cả sản phẩm"}
              </h2>
              <span className="text-sm text-gray-600 font-medium">
                {isLoading ? "Đang tải..." : `${products.length} sản phẩm`}
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-4 text-gray-600 font-medium">Không có sản phẩm nào</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

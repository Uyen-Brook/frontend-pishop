import { useEffect, useState } from "react";
import Header from "../../../components/layout/custommer/header/Header";
import ProductCard from "../../../components/product/ProductCard";

import { categoryService } from "../../../service/custommer/categoryService";
import { productService } from "../../../service/custommer/productService";
import { brandService } from "../../../service/custommer/brandService";

import type { Category, Product, Brand } from "../../../types/index";
import SideBarV2 from "../../../components/menu/menuCategory/SideBarV2";
import BrandBar from "../../../components/menu/BrandBar";
import "./homePage.css";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  //menu trikger
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Tải danh sách brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await brandService.getAll();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Tải sản phẩm khi thay đổi category hoặc brand
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let productsData: Product[];

        if (selectedCategory && selectedBrand) {
          // Lọc theo cả category và brand
          productsData = await productService.getByCategoryAndBrand(selectedCategory, selectedBrand);
        } else if (selectedCategory) {
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
  }, [selectedCategory, selectedBrand]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <button
        className="lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded sticky top-0 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "Đóng Menu" : "Mở Menu"}
      </button>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Sidebar - Categories */}
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:w-55 lg:flex-shrink-0`}>
          <SideBarV2
            categories={categories}
            activeCategory={selectedCategory ?? undefined}
            onSelect={(id) => {
              setSelectedCategory(selectedCategory === id ? null : id);
              
            }}
            
          />
        </div>
        {/* <div className="hidden lg:block lg:w-55 lg:flex-shrink-0">
          <SideBarV2 
            categories={categories}
            activeCategory={selectedCategory ?? undefined}
            onSelect={(id) => {
              setSelectedCategory(selectedCategory === id ? null : id);
            }}
          />
        </div> */}

        {/* Right Content Area */}
        <div className="w-full lg:flex-1">
          {/* Brand Bar */}
          <BrandBar
            brands={brands}
            selectedBrand={selectedBrand}
            onSelect={setSelectedBrand}
          />

          {/* Products Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {selectedCategory && selectedBrand
                  ? `${categories.find(c => c.id === selectedCategory)?.name} - ${brands.find(b => b.id === selectedBrand)?.name}`
                  : selectedCategory
                    ? categories.find(c => c.id === selectedCategory)?.name
                    : "Tất cả sản phẩm"}
              </h2>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {isLoading ? "Đang tải..." : `${products.length} sản phẩm`}
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-48 sm:h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">Đang tải sản phẩm...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-48 sm:h-64">
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-medium">Không có sản phẩm nào</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

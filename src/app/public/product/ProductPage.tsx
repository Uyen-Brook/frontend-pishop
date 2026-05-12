import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProductCard from "../../../components/product/ProductCard";
import SideBarV2 from "../../../components/menu/menuCategory/SideBarV2";
import BrandBar from "../../../components/menu/BrandBar";

import { categoryService } from "../../../service/public/categoryService";
import { productService } from "../../../service/public/productService";
import { brandService } from "../../../service/public/brandService";
import { Menu, X } from "lucide-react";
import type {
  Category,
  ProductSumaryResponse,
  Brand,
} from "../../../types";

import "./ProductPage.css";

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ============================
  // STATE
  // ============================
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [products, setProducts] =
    useState<ProductSumaryResponse[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [selectedBrand, setSelectedBrand] =
    useState<number | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // ============================
  // PAGINATION (ONLY PRODUCT)
  // ============================
  const [page, setPage] = useState(0);
  const size = 8;

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // ============================
  // HANDLE SEARCH FROM NAVIGATION
  // ============================
  useEffect(() => {
    if (location.state?.searchKeyword) {
      setSearchKeyword(location.state.searchKeyword);
      // Don't reset category/brand - allow them to work together
      setPage(0);
    }
  }, [location.state]);

  // ============================
  // CLEAR SEARCH
  // ============================
  const clearSearch = () => {
    setSearchKeyword("");
    setPage(0);
  };

  // ============================
  // LOAD CATEGORY + BRAND (NO PAGE)
  // ============================
  useEffect(() => {

    const fetchData = async () => {

      try {

        const [cats, brs] = await Promise.all([
          categoryService.getAll(),
          brandService.getAll(),
        ]);

        setCategories(cats ?? []);
        setBrands(brs ?? []);

      } catch (error) {
        console.error("Load category/brand error:", error);
      }
    };

    fetchData();

  }, []);

  // ============================
  // RESET PAGE WHEN FILTER CHANGE
  // ============================
  useEffect(() => {
    setPage(0);
  }, [selectedCategory, selectedBrand, searchKeyword]);

  // ============================
  // LOAD PRODUCTS (PAGINATION SAFE)
  // ============================
  useEffect(() => {

    const fetchProducts = async () => {

      setIsLoading(true);

      try {

        let response: any;

        // SEARCH + CATEGORY/BRAND (combined filtering)
        if (searchKeyword) {
          // Search with category/brand filters
          if (selectedCategory || selectedBrand) {
            response = await productService.filterProducts({
              keyword: searchKeyword,
              categoryId: selectedCategory ?? undefined,
              brandId: selectedBrand ?? undefined,
              page,
              size,
            });
          } else {
            // Search only
            response = await productService.searchProducts(
              searchKeyword,
              { page, size }
            );
          }
        }
        // CATEGORY + BRAND (no search)
        else if (selectedCategory && selectedBrand) {

          response = await productService.filterProducts({
            categoryId: selectedCategory,
            brandId: selectedBrand,
            page,
            size,
          });
        }

        // CATEGORY ONLY
        else if (selectedCategory) {

          response = await productService.getByCategory(
            selectedCategory,
            { page, size }
          );
        }

        // BRAND ONLY
        else if (selectedBrand) {

          response = await productService.getByBrand(
            selectedBrand,
            { page, size }
          );
        }

        // ALL
        else {

          response = await productService.getAll({
            page,
            size,
          });
        }

        // ============================
        // SAFE SET (TRÁNH UNDEFINED CRASH)
        // ============================
        setProducts(response?.content ?? []);
        setTotalPages(response?.totalPages ?? 0);
        setTotalElements(response?.totalElements ?? 0);

      } catch (error) {

        console.error("Load products error:", error);

        setProducts([]);
        setTotalPages(0);
        setTotalElements(0);

      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

  }, [selectedCategory, selectedBrand, searchKeyword, page]);

  // ============================
  // UI
  // ============================
  return (
    <div className="max-w-7xl mx-auto px-4 pt-12">

      {/* MOBILE MENU BUTTON */}

      <button
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 rounded-xl bg-white shadow-lg border border-gray-200 text-gray-700 transition-all duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* SIDEBAR */}

        <div
          className={`
    ${isMenuOpen ? "block" : "hidden"}
    lg:block lg:w-64 flex-shrink-0 lg:sticky lg:top-0 self-start`}
        >
          <SideBarV2
            categories={categories}
            activeCategory={selectedCategory ?? undefined}
            onSelect={(id) =>
              setSelectedCategory(
                selectedCategory === id ? null : id
              )
            }
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* BRAND BAR */}
          <BrandBar
            brands={brands}
            selectedBrand={selectedBrand}
            onSelect={(id) =>
              setSelectedBrand(
                selectedBrand === id ? null : id
              )
            }
          />

          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">

                {searchKeyword
                  ? `Kết quả tìm kiếm: "${searchKeyword}"`
                  : selectedCategory && selectedBrand
                    ? `${categories.find(c => c.id === selectedCategory)?.name} - ${brands.find(b => b.id === selectedBrand)?.name}`
                    : selectedCategory
                      ? categories.find(c => c.id === selectedCategory)?.name
                      : selectedBrand
                        ? brands.find(b => b.id === selectedBrand)?.name
                        : "Tất cả sản phẩm"}
              </h2>

              {searchKeyword && (
                <button
                  onClick={clearSearch}
                  className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700 transition"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="text-sm text-gray-600">
              {isLoading
                ? "Đang tải..."
                : `${totalElements ?? 0} sản phẩm`}
            </span>
          </div>

          {/* PRODUCTS */}
          {isLoading ? (

            <div className="text-center py-10">
              Loading...
            </div>

          ) : (products?.length ?? 0) > 0 ? (

            <>
              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {products.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center gap-2 mt-6">

                <button
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`px-3 py-1 border rounded ${page === i
                        ? "bg-blue-500 text-white"
                        : ""
                        }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}

                <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>

          ) : (

            <div className="text-center py-10">
              Không có sản phẩm
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
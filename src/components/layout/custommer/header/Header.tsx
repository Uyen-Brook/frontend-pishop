import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import { ROUTES } from "../../../../config/routes";
import logo from "../../../../assets/pishopLogo.svg";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { productService } from "../../../../service/public/productService";
import type { ProductSumaryResponse } from "../../../../types";

export default function Header() {
  const { isAuthenticated, logout, isTokenValid } = useAuthStore();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<ProductSumaryResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
    }
  }, [isTokenValid, logout]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      // Add shadow when scrolled
      setIsScrolled(currentScrollY > 10);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Debounced search
  const debounceSearch = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      productService.searchProducts(keyword, { page: 0, size: 5 })
        .then((response) => {
          setSearchResults(response.content || []);
          setShowDropdown(true);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setSearchResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debounceSearch(searchKeyword);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchKeyword, debounceSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(ROUTES.PRODUCT, { state: { searchKeyword: searchKeyword.trim() } });
      // Keep search keyword in input - don't clear it
      setShowDropdown(false);
    }
  };

  const handleProductClick = (product: ProductSumaryResponse) => {
    navigate(`/product/${product.id}`);
    setSearchKeyword("");
    setShowDropdown(false);
  };

  const handleViewAllResults = () => {
    if (searchKeyword.trim()) {
      navigate(ROUTES.PRODUCT, { state: { searchKeyword: searchKeyword.trim() } });
      // Keep search keyword in input - don't clear it
      setShowDropdown(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      } ${!isHeaderVisible ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        
        {/* LOGO + SEARCH */}
        <div className="flex items-center gap-6 flex-1">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <img src={logo} alt="ManpiShop" className="h-8 w-auto object-contain" />
          </div>

          {/* SEARCH */}
          <div className="relative flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="flex flex-1 border border-gray-300 rounded-md overflow-hidden shadow-sm bg-white">
              <input
                type="text"
                placeholder="Tìm kiếm iPhone, Samsung, Laptop..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onFocus={() => searchKeyword && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="flex-1 px-3 py-1 text-sm text-gray-700 outline-none"
              />
              <button
                type="submit"
                className="px-3 bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition"
              >
                <FaSearch />
              </button>
            </form>

            {/* SEARCH DROPDOWN */}
            {showDropdown && searchKeyword && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Đang tìm kiếm...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none"
                      >
                        <img
                          src={product.thumbnail || "https://via.placeholder.com/40"}
                          alt={product.modelName}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {product.modelName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {product.brandName} - {product.categoryName}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-red-500">
                          {product.price?.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                    ))}
                    <button
                      onClick={handleViewAllResults}
                      className="w-full p-3 text-center text-sm text-blue-600 hover:bg-blue-50 transition"
                    >
                      Xem tất cả kết quả
                    </button>
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Không tìm thấy sản phẩm nào
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MENU */}
        <nav className="flex items-center gap-5 ml-6">
          <Link to={ROUTES.ABOUT} className="text-sm font-medium text-gray-700 hover:text-blue-500">
            GIỚI THIỆU
          </Link>
          <Link to={ROUTES.RETURN_POLICY} className="text-sm font-medium text-gray-700 hover:text-blue-500">
            CHÍNH SÁCH ĐỔI TRẢ
          </Link>
          <Link to={ROUTES.PRODUCT} className="text-sm font-medium text-gray-700 hover:text-blue-500">
            SẢN PHẨM
          </Link>
          <Link
            to={ROUTES.CART}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <FaShoppingCart /> <span>GIỎ HÀNG</span>
          </Link>
        </nav>

        {/* LOGIN PART */}
        <div className="flex items-center gap-3 ml-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.CUSTOMER_PROFILE}
                className="px-3 py-1 bg-blue-500 text-white rounded-md flex items-center gap-1 text-sm hover:bg-blue-600 transition"
              >
                <FaUserCircle size={18} />
                TÀI KHOẢN
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="px-3 py-1 bg-blue-500 text-white rounded-md flex items-center gap-1 text-sm hover:bg-blue-600 transition"
            >
              <FaUserCircle size={18} />
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import { ROUTES } from "../../../../config/routes";
import logo from "../../../../assets/pishopLogo.svg";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { useEffect } from "react";

export default function Header() {
  const { isAuthenticated, logout, isTokenValid } = useAuthStore();

  useEffect(() => {
    if (!isTokenValid()) {
      logout();
    }
  }, [isTokenValid, logout]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        
        {/* LOGO + SEARCH */}
        <div className="flex items-center gap-6 flex-1">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <img src={logo} alt="ManpiShop" className="h-8 w-auto object-contain" />
          </div>

          {/* SEARCH */}
          <div className="flex flex-1 max-w-md border border-gray-300 rounded-md overflow-hidden shadow-sm bg-white">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="flex-1 px-3 py-1 text-sm text-gray-700 outline-none"
            />
            <button className="px-3 bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition">
              <FaSearch />
            </button>
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
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-blue-500">
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

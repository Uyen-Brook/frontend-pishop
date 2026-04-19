import { Link, Navigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/authStore";
import { ROUTES } from "../../../../config/routes";
import "./header.css";
import logo from "../../../../assets/pishopLogo.svg";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";


export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="max-w-7xl mx-auto">

      {/* TOP BAR */}
      <div className="top-bar">
      </div>
      {/* MAIN HEADER */}
      <div className="main-header">

        <div className="header-middle-section">
          {/* LOGO */}
          <div className="logo">
            <img src={logo} alt="ManpiShop" />
          </div>
          {/* SEARCH */}
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." />
            <button>
              <FaSearch />
            </button>
          </div>
        </div>

        {/* MENU */}
        <nav className="menu flex items-center justify-between">
          <Link to={ROUTES.ABOUT}>GIỚI THIỆU</Link>
          <Link to={ROUTES.RETURN_POLICY}>CHÍNH SÁCH ĐỔI TRẢ</Link>
          <Link to="/">SẢN PHẨM</Link>
          <Link to={ROUTES.CART} className="cart-btn">
            <FaShoppingCart /> <span>GIỎ HÀNG</span>
          </Link>
        </nav>
        <div className="login-part">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <FaUserCircle size={20} className="icon-blue"/>
              <span className="font-medium">
                {user?.email}
              </span>

              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1"
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
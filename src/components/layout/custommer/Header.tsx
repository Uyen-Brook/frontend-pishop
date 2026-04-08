import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import {ROUTES} from "../../../config/routes";
import "../../../styles/header.css";
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
    <header className="header">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-left">
          <span>
            <FaEnvelope className="icon-blue" /> manpibrook@gmail.com
          </span>

          <span>
            <FaPhoneAlt className="icon-blue" /> 0968366940
          </span>

          <span>
            <FaMapMarkerAlt className="icon-blue" /> 298 Tây Tựu, Hà Nội
          </span>
        </div>

        {/* Logic đăng nhập*/}
        <div className="top-right">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <FaUserCircle size={20} className="icon-blue" />

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
              to="/auth/login"
              className="px-3 py-1 bg-blue-600 text-white rounded flex items-center gap-1"
            >
              <FaUserCircle size={18} />
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="main-header">

        <div className="header-middle-section">

          {/* LOGO */}
          <div className="logo">
            <img src="/logo.png" alt="ManpiShop" />
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
        <nav className="menu custom-scrollbar flex items-center justify-between">
          <Link to="/tin-tuc">TIN TỨC</Link>
          <Link to="/gioi-thieu">GIỚI THIỆU</Link>
          <Link to="/bao-hanh">BẢO HÀNH</Link>
          <Link to="/checkout">ĐƠN HÀNG</Link>

          <Link to= {ROUTES.CART} className="cart-btn">
            <FaShoppingCart /> <span>GIỎ HÀNG</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        PISHOP
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/products" className="hover:text-blue-600">
          Sản phẩm
        </Link>
        <Link to="/cart" className="hover:text-blue-600">
          Giỏ hàng
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="font-medium">{user?.email}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

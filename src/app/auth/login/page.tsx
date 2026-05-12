import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { ROUTES } from "../../../config/routes";
import { authService } from "../../../service/public/authService";
import "../../../styles/login.css";

export default function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  // ===== STATE =====
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ===== HANDLE LOGIN =====
  const handleLoginUser = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await authService.login({
        email,
        password,
      });

      const token =
        data.token || data.accessToken;

      if (token) {
        const decodedUser = login(token);

        if (decodedUser?.role === "ADMIN") {
          navigate(ROUTES.ADMIN_DASHBOARD);
        } else {
          navigate(ROUTES.PRODUCT);
        }
      } else {
        setError("Không nhận được token từ server");
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">
          <h1 className="brand-title">ĐĂNG NHẬP</h1>
          <p className="brand-subtitle">
            Tham gia mua sắm ngay với PiShop
          </p>
        </div>

        {/* FORM */}
        <form className="login-inner-form" onSubmit={handleLoginUser}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập địa chỉ email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value.trim())
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              disabled={loading}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={{
                color: "#e74c3c",
                margin: "10px 0",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-login-main"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="login-links">
          <span>
            Bạn chưa có tài khoản? {" "}
            <a href={ROUTES.REGISTER} className="link-orange">
              Đăng ký ngay
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { ROUTES } from "../../../config/routes";
import { API_BASE_URL } from "../../../config/env";
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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token || data.accessToken;
        
        if (token) {
          login(token);
          navigate(ROUTES.HOME);
        } else {
          setError("Không nhận được token từ server");
        }
      } else if (response.status === 403) {
        setError("Tài khoản đã bị khóa");
      } else if (response.status === 401) {
        setError("Sai email hoặc mật khẩu");
      } else {
        setError("Đăng nhập thất bại");
      }
    } catch (err: unknown) {
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        {/* HEADER */}
        <div className="login-header">
          <h1 className="brand-title">Login</h1>
          <p className="brand-subtitle">
            Login to your account to order device in ManpiShop!
          </p>
        </div>

        {/* FORM */}
        <form className="login-inner-form" onSubmit={handleLoginUser}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your email address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value.trim())
              }
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="your password.."
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
            Do you have no an account?{" "}
            <a href={ROUTES.REGISTER} className="link-orange">
              Register
            </a>
          </span>
          </div>
      </div>
    </div>
  );
}
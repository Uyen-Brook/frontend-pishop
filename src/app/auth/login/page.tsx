import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { ROUTES } from "../../../config/routes";
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
      // 👉 fake login logic (sau này thay API)
      if (email === "uyenchu98@gmail.com" && password === "123456") {
        const payload = {
          accountId: 5,
          role: "USER",
          email: email,
          sub: email,
          iat: Date.now(),
          exp: Date.now() + 1000 * 60 * 60,
        };

        const base64Payload = btoa(JSON.stringify(payload));
        const fakeToken = `header.${base64Payload}.signature`;

        login(fakeToken);
        navigate(ROUTES.HOME);
      } else {
        setError("Email hoặc mật khẩu không đúng");
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
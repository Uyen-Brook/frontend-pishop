import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/register.css";
import { ROUTES } from "../../../config/routes";
import { API_BASE_URL } from "../../../config/env";
export default function RegisterPage() {
  const navigate = useNavigate();

  // ===== STATE =====
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ===== HANDLE INPUT =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseText = await response.text();
        setSuccess(responseText || "Đăng ký thành công!");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        // Redirect to login after 1.5s
        setTimeout(() => {
          navigate(ROUTES.LOGIN);
        }, 1500);
      } else if (response.status === 400) {
        const errorText = await response.text();
        setError(errorText || "Email đã tồn tại vui lòng đăng kí bằng email khác");
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/* HEADER */}
        <div className="auth-header">
          <h1 className="auth-title">ĐĂNG KÝ</h1>
        </div>

        {/* FORM */}
         <div className="input-field">
            <label>Họ</label>
            <input
              type="text"
              name="lastName"
              placeholder="Họ"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Tên</label>
            <input
              type="text"
              name="firstName"
              placeholder="Tên"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
         

          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="nhập email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div style={{ color: "#e74c3c", margin: "12px 0" }}>
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div style={{ color: "#27ae60", margin: "12px 0" }}>
              {success}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Register"}
          </button>

        </form>

        {/* FOOTER */}
        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <a href={ROUTES.LOGIN} className="orange-link">
              Login
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/register.css";
import {ROUTES} from "../../../config/routes";
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

  // ===== HANDLE SUBMIT (GIẢ LẬP API) =====
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 👉 giả lập request giống backend RegisterRequest
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      // 👉 giả lập delay API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 👉 giả lập thành công
      setSuccess("Đăng ký thành công!");

      // 👉 reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      // 👉 chuyển trang login sau 1.5s
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
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
          <h1 className="auth-title">Register</h1>
        </div>
        
        {/* FORM */}
        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="input-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Your first name..."
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Your last name..."
              value={formData.lastName}
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
              placeholder="your email address"
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
              placeholder="your password.."
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
            <a href= {ROUTES.LOGIN} className="orange-link">
              Login
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
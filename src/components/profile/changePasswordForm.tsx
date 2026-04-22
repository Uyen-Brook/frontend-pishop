import { useState } from "react";
import axios from "axios";

type Props = {
  userId: number;
};

const ChangePasswordForm = ({ userId }: Props) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);

      await axios.put(`/password/update/${userId}`, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      });

      alert("Đổi mật khẩu thành công");
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-md w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">Đổi mật khẩu</h2>

      <div className="space-y-4">
        <input
          type="password"
          name="oldPassword"
          placeholder="Mật khẩu hiện tại"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Mật khẩu mới"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full 
            py-3 mb-2 
            bg-red-500/10 
            text-red-600 
            rounded-lg 
            text-sm font-semibold 
            transition-colors duration-200 
            hover:bg-red-500 hover:text-white 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
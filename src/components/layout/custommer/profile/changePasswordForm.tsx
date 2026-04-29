import { useState } from "react";
import { profileService } from "../../../../service/user/profileService";

type Props = {
  userId: number;
  onCancel: () => void;
};

const ChangePasswordForm = ({
  userId,
  onCancel,
}: Props) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // validate
    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      setError(
        "Mật khẩu xác nhận không khớp"
      );
      return;
    }

    if (form.newPassword.length < 6) {
      setError(
        "Mật khẩu phải từ 6 ký tự"
      );
      return;
    }

    try {
      setLoading(true);

      await profileService.changePassword(
        userId,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }
      );

      setSuccess(
        "Đổi mật khẩu thành công"
      );

      // reset form
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // close modal after 1s
      setTimeout(() => {
        onCancel();
      }, 1000);

    } catch (err: any) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Có lỗi xảy ra"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4 relative">

        {/* CLOSE */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-5">
          Đổi mật khẩu
        </h2>

        <div className="space-y-4">

          {/* OLD PASSWORD */}
          <input
            type="password"
            name="oldPassword"
            placeholder="Mật khẩu hiện tại"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* NEW PASSWORD */}
          <input
            type="password"
            name="newPassword"
            placeholder="Mật khẩu mới"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 text-sm">
              {success}
            </p>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              onClick={onCancel}
              className="
                flex-1
                py-3
                border
                border-gray-300
                rounded-lg
                text-sm
                font-semibold
                hover:bg-gray-50
              "
            >
              Hủy
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                flex-1
                py-3
                bg-red-500
                text-white
                rounded-lg
                text-sm
                font-semibold
                transition
                hover:bg-red-600
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Đang xử lý..."
                : "Cập nhật"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
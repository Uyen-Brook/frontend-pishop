import { useState } from "react";
import {
  profileService,
  UserProfile,
  UpdateProfilePayload,
} from "../../../../service/user/profileService";

type Props = {
  profile: UserProfile;
  onCancel: () => void;
  onSuccess?: () => void;
};

const ProfileUpdate = ({
  profile,
  onCancel,
  onSuccess,
}: Props) => {
  const [form, setForm] = useState<UpdateProfilePayload>({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    phone: profile.phone || "",
    email: profile.email || "",
    gender: profile.gender,
    dob: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);

  const [preview, setPreview] = useState(
    profile.image ||
      "https://thuvienavatar.edu.vn/wp-content/uploads/2025/11/avatar-khung-long-cute-32.jpg"
  );

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ================= INPUT =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "radio"
          ? value === "true"
          : value,
    }));
  };

  // ================= FILE =================
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= UPDATE PROFILE =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await profileService.updateProfile(
        profile.id,
        form
      );

      alert("Cập nhật thông tin thành công");

      onSuccess?.();
      onCancel();
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  // ================= UPLOAD AVATAR =================
  const handleUploadAvatar = async () => {
    if (!avatar) {
      alert("Vui lòng chọn ảnh");
      return;
    }

    try {
      setUploading(true);

      await profileService.uploadAvatar(
        profile.id,
        avatar
      );

      alert("Upload avatar thành công");

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Upload avatar thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Cập nhật thông tin
            </h2>

            {/* FIRST NAME */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Tên
              </label>

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Nhập tên"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Họ
              </label>

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Nhập họ"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Số điện thoại
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Email
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Ngày sinh
              </label>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* GENDER */}
            <div className="flex items-center gap-5">
              <span className="font-medium">
                Giới tính:
              </span>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={form.gender === true}
                  onChange={handleChange}
                />
                Nam
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={form.gender === false}
                  onChange={handleChange}
                />
                Nữ
              </label>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition"
            >
              {loading
                ? "Đang lưu..."
                : "Lưu thông tin"}
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={preview}
              alt="avatar"
              className="w-36 h-36 rounded-full object-cover border"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <button
              onClick={handleUploadAvatar}
              disabled={uploading}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              {uploading
                ? "Đang upload..."
                : "Upload ảnh"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
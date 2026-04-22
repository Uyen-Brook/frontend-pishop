import { useState } from "react";
import axios from "axios";
import { mockProfile } from "../../service/user/profileService";
const ProfileUpdate = ({ profile = mockProfile }) => {
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    email: profile.email,
    gender: profile.gender
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(profile.image);

  // handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "radio" ? value === "true" : value
    });
  };

  // chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // submit info
  const handleSubmit = async () => {
    await axios.put(`/infor/update/${profile.id}`, form);
    alert("Cập nhật thành công");
  };

  // upload avatar
  const handleUploadAvatar = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append("file", avatar);

    await axios.post(`/avatar/${profile.id}`, formData);
    alert("Upload avatar thành công");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow p-6 grid grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Cập nhật thông tin</h2>

          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Họ"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Tên"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Gender */}
          <div className="flex items-center gap-4">
            <span>Giới tính:</span>
            <label>
              <input
                type="radio"
                name="gender"
                value="true"
                checked={form.gender === true}
                onChange={handleChange}
              /> Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="false"
                checked={form.gender === false}
                onChange={handleChange}
              /> Nữ
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-2 rounded-lg"
          >
            Lưu thông tin
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border"
          />

          <input type="file" onChange={handleFileChange} />

          <button
            onClick={handleUploadAvatar}
            className="border px-4 py-2 rounded-lg"
          >
            Upload ảnh
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileUpdate;
"use client";

import { useMemo, useState, useEffect } from "react";

import Card from "../../../components/card/Card";
import SearchInput from "../../../components/search/SearchInput";
import Select from "../../../components/select/Select";
import Label from "../../../components/field/LabelField";

import {
  Building2,
  Globe,
  Plus,
  X,
} from "lucide-react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

import { brandService, BrandRequest, BrandResponse } from "../../../service/admin/BrandService";

// ============================================
// TYPES
// ============================================

interface Brand extends BrandResponse {
  deleted?: boolean;
}

// ============================================
// FILTER OPTIONS
// ============================================

const statusOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Đang hoạt động", value: "active" },
  { label: "Đã xóa", value: "deleted" },
];

// ============================================
// MAIN PAGE
// ============================================

export default function AdminBrandsPage() {
  // ============================================
  // STATES
  // ============================================

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  // Form state
  const [formData, setFormData] = useState<BrandRequest>({
    name: "",
    website: "",
    note: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    loadBrands();
  }, []);

  // ============================================
  // API CALLS
  // ============================================

  const loadBrands = async () => {
    try {
      setLoading(true);
      const res = await brandService.getAll();
      setBrands(res.map((b) => ({ ...b, deleted: false })));
    } catch (error) {
      console.error("Cannot load brands", error);
      alert("Không thể tải danh sách thương hiệu");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FILTER
  // ============================================

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchSearch =
        brand.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
          ? !brand.deleted
          : brand.deleted;

      return matchSearch && matchStatus;
    });
  }, [brands, search, status]);

  // ============================================
  // FORM HANDLERS
  // ============================================

  const resetForm = () => {
    setFormData({ name: "", website: "", note: "" });
    setImageFile(null);
    setImagePreview(null);
    setEditingBrand(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      website: brand.website || "",
      note: brand.note || "",
    });
    setImagePreview(brand.image || null);
    setImageFile(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên thương hiệu");
      return;
    }

    try {
      const data: BrandRequest = {
        name: formData.name,
        website: formData.website,
        note: formData.note,
        image: imageFile || undefined,
      };

      if (editingBrand) {
        await brandService.update(editingBrand.id, data);
        alert("Cập nhật thương hiệu thành công!");
      } else {
        await brandService.create(data);
        alert("Thêm thương hiệu thành công!");
      }

      await loadBrands();
      handleCloseModal();
    } catch (error) {
      console.error("Save error", error);
      alert("Có lỗi xảy ra khi lưu thương hiệu");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa thương hiệu này?");
    if (!confirmDelete) return;

    try {
      await brandService.delete(id);
      alert("Xóa thương hiệu thành công!");
      await loadBrands();
    } catch (error) {
      console.error("Delete error", error);
      alert("Không thể xóa thương hiệu");
    }
  };

  // ============================================
  // STATS
  // ============================================

  const totalBrands = brands.length;
  const activeBrands = brands.filter((b) => !b.deleted).length;
  const deletedBrands = brands.filter((b) => b.deleted).length;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="space-y-6">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quản lý thương hiệu
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý các thương hiệu sản phẩm
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <MdAdd className="h-5 w-5" />
          Thêm thương hiệu
        </button>
      </div>

      {/* ============================================ */}
      {/* FILTER */}
      {/* ============================================ */}

      <Card extra="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}
          <div className="w-full lg:w-[320px]">
            <SearchInput
              value={search}
              onChange={(value) => setSearch(value)}
              placeholder="Tìm kiếm thương hiệu..."
            />
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-3">
            <Select
              value={status}
              onChange={(value) =>
                setStatus(String(value))
              }
              options={statusOptions}
            />
          </div>
        </div>
      </Card>

      {/* ============================================ */}
      {/* TABLE */}
      {/* ============================================ */}

      <Card extra="overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Danh sách thương hiệu
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Hiển thị {filteredBrands.length} thương hiệu
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* HEAD */}
            <thead className="bg-gray-50 dark:bg-navy-900">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  ID
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Thương hiệu
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Website
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Trạng thái
                </th>
                <th className="px-3 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Thao tác
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900">
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  {/* ID */}
                  <td className="px-3 py-4">
                    <p className="text-sm text-gray-500">#{brand.id}</p>
                  </td>

                  {/* BRAND */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={brand.image || "/placeholder.png"}
                        alt={brand.name}
                        className="h-12 w-12 rounded-lg object-contain border border-gray-200 p-1"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {brand.name}
                        </h4>
                      </div>
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="px-3 py-4">
                    {brand.website ? (
                      <a
                        href={brand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        brand.deleted
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {brand.deleted ? "Đã xóa" : "Đang hoạt động"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* EDIT */}
                      <button
                        onClick={() => handleOpenEdit(brand)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {filteredBrands.length === 0 && (
          <div className="py-16 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              Không tìm thấy thương hiệu
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Thử thay đổi bộ lọc hoặc thêm thương hiệu mới
            </p>
          </div>
        )}
      </Card>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
          <Card extra="w-full max-w-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                {editingBrand ? "Chỉnh sửa thương hiệu" : "Thêm thương hiệu mới"}
              </h3>
              <button onClick={handleCloseModal} className="text-2xl text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" text="Tên thương hiệu" required />
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Apple"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* Website */}
              <div>
                <Label htmlFor="website" text="Website" />
                <input
                  id="website"
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* Note */}
              <div>
                <Label htmlFor="note" text="Ghi chú" />
                <textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ghi chú về thương hiệu..."
                  rows={3}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white resize-none"
                />
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image" text="Logo thương hiệu" />
                <div
                  onClick={() => document.getElementById("brandImageInput")?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition min-h-[120px]"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-24 w-auto object-contain" />
                  ) : (
                    <>
                      <Plus className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-400 text-center">Click để tải logo</p>
                    </>
                  )}
                </div>
                <input
                  id="brandImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingBrand ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
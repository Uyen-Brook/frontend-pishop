"use client";

import { useMemo, useState, ChangeEvent, useEffect } from "react";

import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";

import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Eye,
  Globe,
  Mail,
  Phone,
  MapPin,
  X,
  User,
} from "lucide-react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

import { SupplierService } from "../../../service/admin/SupplierService";
import { SupplierRequest, SupplierResponse, SupplierDetailResponse } from "../../../types/index";

// ============================================
// TYPES
// ============================================

interface Supplier extends SupplierResponse {
  totalProducts?: number;
}

interface SupplierForm {
  name: string;
  taxcode: string;
  email: string;
  phone: string;
  logo: string;
  address: string;
  note: string;
  website: string;
  representative: string;
}

// ============================================
// EMPTY FORM
// ============================================

const emptyForm: SupplierForm = {
  name: "",
  taxcode: "",
  email: "",
  phone: "",
  logo: "",
  address: "",
  note: "",
  website: "",
  representative: "",
};

// ============================================
// MAIN PAGE
// ============================================

export default function SupplierManagementPage() {
  // ============================================
  // STATES
  // ============================================

  const [suppliers, setSuppliers] = useState<SupplierDetailResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [previewSupplier, setPreviewSupplier] = useState<SupplierDetailResponse| null>(null);
  const [editingSupplier, setEditingSupplier] = useState<SupplierDetailResponse | null>(null);
  const [form, setForm] = useState<SupplierForm>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    loadSuppliers();
  }, []);

  // ============================================
  // API CALLS
  // ============================================

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const res = await SupplierService.getAll();
      setSuppliers(res.map((s) => ({ ...s, totalProducts: 0 })));
    } catch (error) {
      console.error("Cannot load suppliers", error);
      alert("Không thể tải danh sách nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      loadSuppliers();
      return;
    }
    try {
      setLoading(true);
      const res = await SupplierService.search(search);
      setSuppliers(res.map((s) => ({ ...s, totalProducts: 0 })));
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FILTER
  // ============================================

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      return supplier.name
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }, [suppliers, search]);

  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (
    field: keyof SupplierForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ============================================
  // HANDLE IMAGE
  // ============================================

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    const imageUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, logo: imageUrl }));
  };

  // ============================================
  // OPEN CREATE
  // ============================================

  const handleOpenCreate = () => {
    setEditingSupplier(null);
    setForm(emptyForm);
    setLogoFile(null);
    setOpenModal(true);
  };

  // ============================================
  // OPEN EDIT
  // ============================================

  const handleOpenEdit = (supplier:SupplierDetailResponse) => {
    setEditingSupplier(supplier);
    setForm({
      name: supplier.name,
      taxcode: supplier.taxcode || "",
      email: supplier.email || "",
      phone: supplier.phone || "",
      logo: supplier.logo || "",
      address: supplier.address || "",
      note: supplier.note || "",
      website: supplier.website || "",
      representative: supplier.representative || "",
    });
    setLogoFile(null);
    setOpenModal(true);
  };

  // ============================================
  // SAVE SUPPLIER
  // ============================================

  const handleSaveSupplier = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Email, Số điện thoại)");
      return;
    }

    try {
      const request: SupplierRequest = {
        name: form.name,
        taxcode: form.taxcode,
        email: form.email,
        phone: form.phone,
        address: form.address,
        note: form.note,
        website: form.website,
        representative: form.representative,
      };

      if (editingSupplier) {
        await SupplierService.update(editingSupplier.id, request, logoFile || undefined);
        alert("Cập nhật nhà cung cấp thành công!");
      } else {
        await SupplierService.create(request, logoFile || undefined);
        alert("Thêm nhà cung cấp thành công!");
      }

      await loadSuppliers();
      setOpenModal(false);
      setForm(emptyForm);
      setLogoFile(null);
      setEditingSupplier(null);
    } catch (error) {
      console.error("Save error", error);
      alert("Có lỗi xảy ra khi lưu nhà cung cấp");
    }
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Bạn có chắc muốn xóa nhà cung cấp này?");
    if (!confirmDelete) return;

    try {
      await SupplierService.delete(id);
      alert("Xóa nhà cung cấp thành công!");
      await loadSuppliers();
    } catch (error) {
      console.error("Delete error", error);
      alert("Không thể xóa nhà cung cấp");
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quản lý nhà cung cấp
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý thông tin nhà cung cấp sản phẩm
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <MdAdd className="h-5 w-5" />
          Thêm nhà cung cấp
        </button>
      </div>

      {/* SEARCH */}
      <Card extra="p-5">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Tìm kiếm nhà cung cấp..."
          className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
        />
      </Card>

      {/* TABLE */}
      <Card extra="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  ID
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Nhà cung cấp
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Liên hệ
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Mã số thuế
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Người đại diện
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Website
                </th>
                <th className="px-3 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  {/* ID */}
                  <td className="px-3 py-4">
                    <p className="text-sm text-gray-500">#{supplier.id}</p>
                  </td>

                  {/* SUPPLIER */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={supplier.logo || "/placeholder.png"}
                        alt={supplier.name}
                        className="h-12 w-12 rounded-lg object-contain border border-gray-200 p-1"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {supplier.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {supplier.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-3 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Phone className="h-4 w-4" />
                        {supplier.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Mail className="h-4 w-4" />
                        {supplier.email}
                      </div>
                    </div>
                  </td>

                  {/* TAX CODE */}
                  <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {supplier.taxcode || "-"}
                  </td>

                  {/* REPRESENTATIVE */}
                  <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {supplier.representative || "-"}
                  </td>

                  {/* WEBSITE */}
                  <td className="px-3 py-4">
                    {supplier.website ? (
                      <a
                        href={supplier.website}
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

                  {/* ACTIONS */}
                  <td className="px-3 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* DETAIL */}
                      <button
                        onClick={() => setPreviewSupplier(supplier)}
                        className="rounded-lg bg-green-500 p-2 text-white transition hover:opacity-80"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() => handleOpenEdit(supplier)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(supplier.id)}
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
      </Card>

      {/* ============================================ */}
      {/* CREATE / EDIT MODAL */}
      {/* ============================================ */}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 dark:bg-navy-900">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingSupplier
                  ? "Chỉnh sửa nhà cung cấp"
                  : "Thêm nhà cung cấp"}
              </h2>

              <button
                onClick={() =>
                  setOpenModal(false)
                }
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="name"
                  text="Tên nhà cung cấp"
                  required
                />

                <input
                  value={form.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Nhập tên nhà cung cấp"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="taxcode"
                  text="Mã số thuế"
                />

                <input
                  value={form.taxcode}
                  onChange={(e) =>
                    handleChange(
                      "taxcode",
                      e.target.value
                    )
                  }
                  placeholder="Nhập mã số thuế"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="representative"
                  text="Người đại diện"
                />

                <input
                  value={form.representative}
                  onChange={(e) =>
                    handleChange(
                      "representative",
                      e.target.value
                    )
                  }
                  placeholder="Nhập tên người đại diện"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  text="Email"
                  required
                />

                <input
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="Nhập email"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  text="Số điện thoại"
                  required
                />

                <input
                  value={form.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                  placeholder="Nhập số điện thoại"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="website"
                  text="Website"
                />

                <input
                  value={form.website}
                  onChange={(e) =>
                    handleChange(
                      "website",
                      e.target.value
                    )
                  }
                  placeholder="https://example.com"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="address"
                  text="Địa chỉ"
                />

                <input
                  value={form.address}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Nhập địa chỉ"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <Label
                  htmlFor="logo"
                  text="Logo nhà cung cấp"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full rounded-xl border border-gray-200 p-3 dark:border-white/10"
                />

                {form.logo && (
                  <div className="mt-4 flex h-32 w-32 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4">
                    <img
                      src={form.logo}
                      alt="Preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* NOTE */}
              <div className="md:col-span-2">
                <Label
                  htmlFor="note"
                  text="Ghi chú"
                />

                <textarea
                  value={form.note}
                  onChange={(e) =>
                    handleChange(
                      "note",
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="Nhập ghi chú"
                  className="w-full rounded-2xl border border-gray-200 p-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() =>
                  setOpenModal(false)
                }
                className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Hủy
              </button>

              <button
                onClick={handleSaveSupplier}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingSupplier
                  ? "Cập nhật"
                  : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================ */}
      {/* DETAIL MODAL */}
      {/* ============================================ */}

      {previewSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 dark:bg-navy-900">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Chi tiết nhà cung cấp
              </h2>

              <button
                onClick={() =>
                  setPreviewSupplier(null)
                }
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="space-y-5">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-gray-200 bg-white p-5">
                  <img
                    src={previewSupplier.logo || "/placeholder.png"}
                    alt={previewSupplier.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {previewSupplier.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {previewSupplier.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <Phone className="h-4 w-4" />
                    Số điện thoại
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.phone}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <Building2 className="h-4 w-4" />
                    Mã số thuế
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.taxcode}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <User className="h-4 w-4" />
                    Người đại diện
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.representative || "-"}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <MapPin className="h-4 w-4" />
                    Địa chỉ
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.address}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <Globe className="h-4 w-4" />
                    Website
                  </div>

                  <a
                    href={previewSupplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block text-blue-600 hover:underline"
                  >
                    {previewSupplier.website}
                  </a>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10 md:col-span-2">
                  <div className="text-sm font-semibold text-gray-500">
                    Ghi chú
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


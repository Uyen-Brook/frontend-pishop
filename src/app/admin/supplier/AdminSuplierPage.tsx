
import { useMemo, useState, ChangeEvent } from "react";

import Card from "../../../components/card/Card";
import InputField from "../../../components/field/InputField";
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
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface Supplier {
  id: number;
  name: string;
  taxcode: string;
  email: string;
  phone: string;
  logo: string;
  address: string;
  note: string;
  website: string;
  totalProducts: number;
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
}

// ============================================
// MOCK DATA
// ============================================

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Apple Supplier Ltd",
    taxcode: "VN00123456",
    email: "contact@apple-supplier.com",
    phone: "0988888888",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    address: "Ha Noi, Viet Nam",
    note: "Premium electronic supplier",
    website: "https://apple.com",
    totalProducts: 125,
  },

  {
    id: 2,
    name: "Samsung Global",
    taxcode: "VN00987654",
    email: "support@samsung.com",
    phone: "0977777777",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    address: "Ho Chi Minh City, Viet Nam",
    note: "Samsung official supplier",
    website: "https://samsung.com",
    totalProducts: 89,
  },
];

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
};

// ============================================
// MAIN PAGE
// ============================================

export default function SupplierManagementPage() {
  // ============================================
  // STATES
  // ============================================

  const [suppliers, setSuppliers] =
    useState<Supplier[]>(initialSuppliers);

  const [search, setSearch] =
    useState("");

  const [openModal, setOpenModal] =
    useState(false);

  const [previewSupplier, setPreviewSupplier] =
    useState<Supplier | null>(null);

  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null);

  const [form, setForm] =
    useState<SupplierForm>(emptyForm);

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

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      logo: imageUrl,
    }));
  };

  // ============================================
  // OPEN CREATE
  // ============================================

  const handleOpenCreate = () => {
    setEditingSupplier(null);
    setForm(emptyForm);
    setOpenModal(true);
  };

  // ============================================
  // OPEN EDIT
  // ============================================

  const handleOpenEdit = (
    supplier: Supplier
  ) => {
    setEditingSupplier(supplier);

    setForm({
      name: supplier.name,
      taxcode: supplier.taxcode,
      email: supplier.email,
      phone: supplier.phone,
      logo: supplier.logo,
      address: supplier.address,
      note: supplier.note,
      website: supplier.website,
    });

    setOpenModal(true);
  };

  // ============================================
  // SAVE SUPPLIER
  // ============================================

  const handleSaveSupplier = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill required fields");
      return;
    }

    // EDIT
    if (editingSupplier) {
      setSuppliers((prev) =>
        prev.map((supplier) =>
          supplier.id === editingSupplier.id
            ? {
                ...supplier,
                ...form,
              }
            : supplier
        )
      );
    }

    // CREATE
    else {
      const newSupplier: Supplier = {
        id: Date.now(),
        ...form,
        totalProducts: 0,
      };

      setSuppliers((prev) => [
        newSupplier,
        ...prev,
      ]);
    }

    setOpenModal(false);
    setForm(emptyForm);
    setEditingSupplier(null);
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    setSuppliers((prev) =>
      prev.filter((supplier) => supplier.id !== id)
    );
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
            Supplier Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage supplier information
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Supplier
        </button>
      </div>

      {/* SEARCH */}
      <Card extra="p-5">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search supplier..."
          className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
        />
      </Card>

      {/* TABLE */}
      <Card extra="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1600px]">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Supplier
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Tax Code
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Website
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">
                  Products
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900">
              {filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* SUPPLIER */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white p-2">
                        <img
                          src={supplier.logo}
                          alt={supplier.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

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
                  <td className="px-6 py-5">
                    <div className="space-y-2 text-sm">
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
                  <td className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
                    {supplier.taxcode}
                  </td>

                  {/* WEBSITE */}
                  <td className="px-6 py-5">
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Visit
                    </a>
                  </td>

                  {/* PRODUCTS */}
                  <td className="px-6 py-5">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                      {supplier.totalProducts} products
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {/* DETAIL */}
                      <button
                        onClick={() =>
                          setPreviewSupplier(supplier)
                        }
                        className="rounded-lg p-2 text-green-600 transition hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleOpenEdit(supplier)
                        }
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(supplier.id)
                        }
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
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
                  ? "Edit Supplier"
                  : "Add Supplier"}
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
                  text="Supplier Name"
                  required
                />

                <InputField
                  id="name"
                  label=""
                  placeholder="Enter supplier name"
                />

                <input
                  value={form.name}
                  onChange={(e) =>
                    handleChange(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Enter supplier name"
                  className="mt-2 h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="taxcode"
                  text="Tax Code"
                />

                <input
                  value={form.taxcode}
                  onChange={(e) =>
                    handleChange(
                      "taxcode",
                      e.target.value
                    )
                  }
                  placeholder="Enter tax code"
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
                  placeholder="Enter email"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  text="Phone"
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
                  placeholder="Enter phone"
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
                  text="Address"
                />

                <input
                  value={form.address}
                  onChange={(e) =>
                    handleChange(
                      "address",
                      e.target.value
                    )
                  }
                  placeholder="Enter address"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* IMAGE */}
              <div className="md:col-span-2">
                <Label
                  htmlFor="logo"
                  text="Supplier Logo"
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
                  text="Note"
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
                  placeholder="Enter note"
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
                Cancel
              </button>

              <button
                onClick={handleSaveSupplier}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {editingSupplier
                  ? "Update Supplier"
                  : "Create Supplier"}
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
                Supplier Detail
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
                    src={previewSupplier.logo}
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
                    Phone
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.phone}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <Building2 className="h-4 w-4" />
                    Tax Code
                  </div>

                  <p className="mt-2 text-gray-900 dark:text-white">
                    {previewSupplier.taxcode}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                    <MapPin className="h-4 w-4" />
                    Address
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
                    Note
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


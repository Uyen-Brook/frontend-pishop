"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdSearch,
  MdClose,
  MdLaptop,
  MdPhoneIphone,
  MdHeadphones,
  MdWatch,
  MdCameraAlt,
  MdHome,
  MdSportsEsports,
  MdRestaurant,
  MdPets,
  MdBook,
  MdMusicNote,
  MdMovie,
  MdLocalHospital,
  MdDirectionsCar,
  MdShoppingCart,
  MdStore,
  MdDevices,
  MdComputer,
  MdKeyboard,
  MdMouse,
  MdMonitor,
  MdFavorite,
  MdStar,
  MdSchool,
  MdWork,
  MdLocalCafe,
  MdFastfood,
  MdFlight,
  MdFitnessCenter,
  MdRouter,
  MdWifi,
  MdLan,
  MdSdCard,
  MdStorage,
  MdUsb,
  MdBatteryFull,
  MdChargingStation,
  MdBluetooth,
  MdCable,
  MdTablet,

} from "react-icons/md";

import { IconType } from "react-icons";

import {
  CategoryRequest,
  CategoryResponse,
  CategoryService,
} from "../../../service/admin/CategoryService";

type IconOption = {
  label: string;
  value: string;
  icon: IconType;
};

const ICON_OPTIONS: IconOption[] = [
  // ================= DEVICE =================
  {
    label: "Laptop",
    value: "MdLaptop",
    icon: MdLaptop,
  },
  {
    label: "Phone",
    value: "MdPhoneIphone",
    icon: MdPhoneIphone,
  },
  {
    label: "Tablet",
    value: "MdTablet",
    icon: MdTablet,
  },
  {
    label: "Computer",
    value: "MdComputer",
    icon: MdComputer,
  },

  // ================= NETWORK =================
  {
    label: "WiFi",
    value: "MdWifi",
    icon: MdWifi,
  },
  {
    label: "Router",
    value: "MdRouter",
    icon: MdRouter,
  },
  {
    label: "Network",
    value: "MdLan",
    icon: MdLan,
  },

  // ================= ACCESSORIES =================
  {
    label: "Headphones",
    value: "MdHeadphones",
    icon: MdHeadphones,
  },
  {
    label: "Keyboard",
    value: "MdKeyboard",
    icon: MdKeyboard,
  },
  {
    label: "Mouse",
    value: "MdMouse",
    icon: MdMouse,
  },
  {
    label: "Cable",
    value: "MdCable",
    icon: MdCable,
  },
  {
    label: "Bluetooth",
    value: "MdBluetooth",
    icon: MdBluetooth,
  },

  // ================= STORAGE =================
  {
    label: "USB",
    value: "MdUsb",
    icon: MdUsb,
  },
  {
    label: "Storage",
    value: "MdStorage",
    icon: MdStorage,
  },
  {
    label: "SD Card",
    value: "MdSdCard",
    icon: MdSdCard,
  },

  // ================= POWER =================
  {
    label: "Battery",
    value: "MdBatteryFull",
    icon: MdBatteryFull,
  },
  {
    label: "Charging",
    value: "MdChargingStation",
    icon: MdChargingStation,
  },

  // ================= SCREEN / DISPLAY =================
  {
    label: "Monitor",
    value: "MdMonitor",
    icon: MdMonitor,
  },

  // ================= GENERAL =================
  {
    label: "Store",
    value: "MdStore",
    icon: MdStore,
  },
  {
    label: "Shopping",
    value: "MdShoppingCart",
    icon: MdShoppingCart,
  },
];

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState<CategoryResponse | null>(null);

  const [iconSearch, setIconSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    note: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await CategoryService.getAll();

      setCategories(data);
    } catch (error) {
      console.error(error);
      alert("Lỗi tải category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const filteredIcons = useMemo(() => {
    return ICON_OPTIONS.filter((icon) =>
      icon.label.toLowerCase().includes(iconSearch.toLowerCase())
    );
  }, [iconSearch]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      note: "",
    });

    setEditingCategory(null);
    setImageFile(null);
    setImagePreview("");
    setIconSearch("");
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (category: CategoryResponse) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      note: category.note || "",
    });

    setImagePreview(category.image || "");

    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa category này?"
    );

    if (!confirmDelete) return;

    try {
      await CategoryService.delete(id);

      alert("Xóa thành công");

      await loadCategories();
    } catch (error) {
      console.error(error);
      alert("Xóa thất bại");
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Tên category không được để trống");
      return;
    }

    try {
      const request: CategoryRequest = {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        note: formData.note,
      };

      if (editingCategory) {
        await CategoryService.update(
          editingCategory.id,
          request,
          imageFile || undefined
        );

        alert("Cập nhật thành công");
      } else {
        await CategoryService.create(
          request,
          imageFile || undefined
        );

        alert("Thêm mới thành công");
      }

      await loadCategories();

      setOpenModal(false);

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Lưu thất bại");
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const renderIcon = (iconName?: string) => {
    const found = ICON_OPTIONS.find(
      (item) => item.value === iconName
    );

    if (!found) return null;

    const IconComponent = found.icon;

    return <IconComponent className="text-2xl" />;
  };

  return (
    <div className="w-full p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold dark:text-white">
            Category Management
          </h2>

          <p className="mt-1 text-gray-500">
            Quản lý danh mục sản phẩm
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white"
        >
          <MdAdd className="text-xl" />
          Thêm Category
        </button>
      </div>

      {/* SEARCH */}
      <Card extra="mb-6 p-5">
        <div className="relative">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

          <input
            type="text"
            placeholder="Tìm category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
          />
        </div>
      </Card>

      {/* TABLE */}
      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-navy-900">
              <tr>
                <th className="px-5 py-4 text-left">ID</th>
                <th className="px-5 py-4 text-left">
                  Image
                </th>
                <th className="px-5 py-4 text-left">
                  Icon
                </th>
                <th className="px-5 py-4 text-left">
                  Name
                </th>
                <th className="px-5 py-4 text-left">
                  Description
                </th>
                <th className="px-5 py-4 text-left">
                  Note
                </th>
                <th className="px-5 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-100 dark:border-white/10"
                >
                  <td className="px-5 py-4">
                    #{category.id}
                  </td>

                  <td className="px-5 py-4">
                    <img
                      src={category.image || "/placeholder.png"}
                      alt={category.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  </td>

                  <td className="px-5 py-4">
                    {renderIcon(category.icon)}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {category.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {category.description}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {category.note}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          handleEdit(category)
                        }
                        className="rounded-lg bg-yellow-400 p-2 text-white"
                      >
                        <MdEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(category.id)
                        }
                        className="rounded-lg bg-red-500 p-2 text-white"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading &&
                filteredCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-gray-500"
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card extra="max-h-[95vh] w-full max-w-4xl overflow-y-auto p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold dark:text-white">
                {editingCategory
                  ? "Edit Category"
                  : "Add Category"}
              </h3>

              <button
                onClick={() => setOpenModal(false)}
              >
                <MdClose className="text-3xl text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* NAME */}
              <div>
                <Label
                  htmlFor="name"
                  text="Category Name"
                  required
                />

                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* IMAGE */}
              <div>
                <Label
                  htmlFor="image"
                  text="Image"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* ICON */}
              <div>
  <Label text="Choose Icon" />

  <select
    value={formData.icon}
    onChange={(e) =>
      setFormData({
        ...formData,
        icon: e.target.value,
      })
    }
    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
  >
    <option value="">-- Chọn icon --</option>

    {ICON_OPTIONS.map((item) => (
      <option
        key={item.value}
        value={item.value}
      >
        {item.label}
      </option>
    ))}
  </select>
</div>
              <div className="lg:col-span-2">
                <Label text="Choose Icon" />

                <input
                  type="text"
                  placeholder="Search icon..."
                  value={iconSearch}
                  onChange={(e) =>
                    setIconSearch(e.target.value)
                  }
                  className="mb-4 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />

                <div className="grid max-h-[300px] grid-cols-3 gap-3 overflow-y-auto rounded-2xl border border-gray-200 p-4 dark:border-white/10 lg:grid-cols-6">
                  {filteredIcons.map((item) => {
                    const IconComponent = item.icon;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            icon: item.value,
                          })
                        }
                        className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition ${
                          formData.icon === item.value
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-gray-200 hover:border-brand-400 dark:border-white/10"
                        }`}
                      >
                        <IconComponent className="text-3xl" />

                        <span className="text-xs">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PREVIEW */}
              <div className="lg:col-span-2">
                <Label text="Preview" />

                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-gray-300 p-5 dark:border-white/10">
                  {(imagePreview ||
                    editingCategory?.image) && (
                    <img
                      src={
                        imagePreview ||
                        editingCategory?.image
                      }
                      alt="Preview"
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                  )}

                  <div className="flex items-center gap-3">
                    {renderIcon(formData.icon)}

                    <div>
                      <h4 className="font-bold dark:text-white">
                        {formData.name || "Category Name"}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {formData.description ||
                          "Description preview"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="lg:col-span-2">
                <Label
                  htmlFor="description"
                  text="Description"
                />

                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              {/* NOTE */}
              <div className="lg:col-span-2">
                <Label htmlFor="note" text="Note" />

                <textarea
                  id="note"
                  rows={3}
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      note: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-gray-300 px-5 py-3"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white"
              >
                {editingCategory
                  ? "Cập nhật"
                  : "Thêm mới"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
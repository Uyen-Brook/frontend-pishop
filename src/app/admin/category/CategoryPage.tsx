
import React, { useMemo, useState } from "react";
import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";
import Select from "../../../components/select/Select";
import { MdAdd, MdDelete, MdEdit, MdSearch } from "react-icons/md";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  note: string;
  createdAt: string;
}

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Laptop",
    description: "Danh mục laptop",
    icon: "💻",
    image: "https://via.placeholder.com/100",
    note: "High-end",
    createdAt: "2026-04-25",
  },
  {
    id: 2,
    name: "Phone",
    description: "Danh mục điện thoại",
    icon: "📱",
    image: "https://via.placeholder.com/100",
    note: "Best seller",
    createdAt: "2026-04-26",
  },
];

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<"name" | "date">("name");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [openModal, setOpenModal] = useState(false);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    image: "",
    note: "",
  });

  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      return sortOrder === "asc"
        ? new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime();
    });

    return filtered;
  }, [categories, search, sortField, sortOrder]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      image: "",
      note: "",
    });

    setEditingCategory(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      image: category.image,
      note: category.note,
    });

    setOpenModal(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert("Tên category không được để trống");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingCategory.id
            ? {
                ...item,
                ...formData,
              }
            : item
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      setCategories((prev) => [...prev, newCategory]);
    }

    setOpenModal(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa category này không?"
    );

    if (!confirmDelete) return;

    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
            Category Management
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Quản lý danh mục sản phẩm
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <MdAdd className="text-xl" />
          Thêm Category
        </button>
      </div>

      <Card extra="mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />

            <input
              type="text"
              placeholder="Tìm kiếm category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <Select
            options={[
              {
                label: "Sort by Name",
                value: "name",
              },
              {
                label: "Sort by Date",
                value: "date",
              },
            ]}
            value={sortField}
            onChange={(value) =>
              setSortField(value as "name" | "date")
            }
            className="!mb-0"
          />

          <Select
            options={[
              {
                label: "Ascending",
                value: "asc",
              },
              {
                label: "Descending",
                value: "desc",
              },
            ]}
            value={sortOrder}
            onChange={(value) =>
              setSortOrder(value as "asc" | "desc")
            }
            className="!mb-0"
          />
        </div>
      </Card>

      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-navy-900">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Icon
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Description
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Note
                </th>

                <th className="px-5 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Created Date
                </th>

                <th className="px-5 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-white">
                    #{category.id}
                  </td>

                  <td className="px-5 py-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                  </td>

                  <td className="px-5 py-4 text-2xl">
                    {category.icon}
                  </td>

                  <td className="px-5 py-4 font-semibold text-navy-700 dark:text-white">
                    {category.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {category.note}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>

                      <button
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                      >
                        <MdDelete className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    Không có dữ liệu category
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card extra="w-full max-w-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                {editingCategory
                  ? "Chỉnh sửa Category"
                  : "Thêm Category"}
              </h3>

              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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

              <div>
                <Label htmlFor="icon" text="Icon" />

                <input
                  id="icon"
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icon: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="description" text="Description" />

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

              <div className="lg:col-span-2">
                <Label htmlFor="image" text="Image URL" />

                <input
                  id="image"
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

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

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Hủy
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-brand-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
              >
                {editingCategory ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

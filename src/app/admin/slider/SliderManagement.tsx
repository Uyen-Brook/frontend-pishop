import React, { useState, useEffect } from "react";
import Card from "../../../components/card/Card";
import Label from "../../../components/field/LabelField";
import Switch from "../../../components/field/Switch";
import { sliderService, SliderResponse, SliderRequest } from "../../../service/admin/SliderService";

import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdSearch,
} from "react-icons/md";

export default function SliderManagement() {
  const [sliders, setSliders] = useState<SliderResponse[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredSliders, setFilteredSliders] = useState<SliderResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editingSlider, setEditingSlider] = useState<SliderResponse | null>(null);

  const [formData, setFormData] = useState<SliderRequest>({
    title: "",
    redirectUrl: "",
    sortOrder: 0,
    active: true,
    image: undefined,
  });

  // Load sliders
  const loadSliders = async () => {
    setLoading(true);
    try {
      const data = await sliderService.getAll();
      setSliders(data);
      setFilteredSliders(data);
    } catch (error) {
      console.error("Error loading sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchKeyword) {
      sliderService.search(searchKeyword).then((data) => {
        setFilteredSliders(data);
      });
    } else {
      setFilteredSliders(sliders);
    }
  }, [searchKeyword, sliders]);

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleEdit = (slider: SliderResponse) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      redirectUrl: slider.redirectUrl,
      sortOrder: slider.sortOrder,
      active: slider.active,
      image: undefined,
    });
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa slider này không?"
    );
    if (!confirmDelete) return;

    try {
      await sliderService.delete(id);
      await loadSliders();
    } catch (error) {
      console.error("Error deleting slider:", error);
    }
  };

  const handleToggleActive = async (id: number, checked: boolean) => {
    try {
      const slider = sliders.find((s) => s.id === id);
      if (!slider) return;

      await sliderService.update(id, {
        title: slider.title,
        redirectUrl: slider.redirectUrl,
        sortOrder: slider.sortOrder,
        active: checked,
      });

      await loadSliders();
    } catch (error) {
      console.error("Error toggling slider status:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.redirectUrl) {
        alert("Vui lòng nhập tiêu đề và URL chuyển hướng");
        return;
      }

      if (editingSlider) {
        await sliderService.update(editingSlider.id, formData);
      } else {
        await sliderService.create(formData);
      }

      await loadSliders();
      setOpenModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving slider:", error);
    }
  };

  const resetForm = () => {
    setEditingSlider(null);
    setFormData({
      title: "",
      redirectUrl: "",
      sortOrder: 0,
      active: true,
      image: undefined,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  return (
    <div className="w-full">
      <div className="pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
            Quản lý Slider
          </h2>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center text-xs gap-2 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <MdAdd className="text-lg" />
          Thêm Slider
        </button>
      </div>

      {/* Search */}
      <Card extra="mb-6 p-5">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm slider..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
          />
        </div>
      </Card>

      {/* Slider Table */}
      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-navy-900">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Hình ảnh
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Tiêu đề
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  URL chuyển hướng
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Thứ tự
                </th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">
                  Trạng thái
                </th>
                <th className="px-3 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredSliders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                    Không có slider nào
                  </td>
                </tr>
              ) : (
                filteredSliders.map((slider) => (
                  <tr
                    key={slider.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                  >
                    <td className="px-3 py-4">
                      <img
                        src={slider.imageUrl}
                        alt={slider.title}
                        className="h-20 w-32 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {slider.title}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {slider.redirectUrl}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {slider.sortOrder}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={slider.active}
                          onChange={(checked) =>
                            handleToggleActive(slider.id, checked)
                          }
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {slider.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(slider)}
                          className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(slider.id)}
                          className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                        >
                          <MdDelete className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card extra="w-full max-w-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                {editingSlider ? "Cập nhật Slider" : "Thêm Slider"}
              </h3>
              <button
                onClick={() => setOpenModal(false)}
                className="text-2xl text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" text="Tiêu đề" required />
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="redirectUrl" text="URL chuyển hướng" required />
                <input
                  id="redirectUrl"
                  type="text"
                  value={formData.redirectUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, redirectUrl: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="sortOrder" text="Thứ tự" />
                <input
                  id="sortOrder"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, sortOrder: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="image" text="Hình ảnh" />
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <div>
                  <h4 className="font-bold text-navy-700 dark:text-white">
                    Trạng thái hoạt động
                  </h4>
                  <p className="text-sm text-gray-500">
                    Bật/tắt trạng thái hiển thị slider
                  </p>
                </div>
                <Switch
                  checked={formData.active}
                  onChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-gray-300 px-3 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="rounded-xl bg-blue-100 text-blue-500 px-3 py-3 font-semibold transition hover:opacity-90"
              >
                {editingSlider ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import {
  Pencil,
  Trash2,
  MapPin,
  Building2,
  Star,
  Plus,
  X,
} from 'lucide-react';

import InputField from '../../../../components/field/InputField';
import Label from '../../../../components/field/LabelField';
import Select from '../../../../components/select/Select';

import locationService, {
  Province,
  Ward,
} from '../../../../service/custommer/locationService';

import {
  Address,
  AddressPayload,
  profileService,
} from '../../../../service/user/profileService';

const emptyForm: AddressPayload & { isDefault: boolean } = {
  fullName: '',
  phone: '',
  specificAddress: '',
  provinceCode: '',
  wardCode: '',
  isDefault: false,
};

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] =
    useState<AddressPayload & { isDefault: boolean }>(emptyForm);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loadingWards, setLoadingWards] =
    useState(false);
  const [loadedProvinceCode, setLoadedProvinceCode] =
  useState('');
  // ================= FETCH ADDRESS =================

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const data = await profileService.getAddresses();

      setAddresses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH PROVINCES =================

  const fetchProvinces = async () => {
    const data = await locationService.getProvinces();

    setProvinces(data);
  };

  // ================= FETCH WARDS =================

const fetchWards = async (provinceCode: string) => {
  if (!provinceCode) {
    setWards([]);
    return;
  }

  try {
    setLoadingWards(true);

    const data =
      await locationService.getWardsByProvinceCode(
        provinceCode
      );

    setWards(data);
    setLoadedProvinceCode(provinceCode);
  } catch (error) {
    console.error(error);
    setWards([]);
  } finally {
    setLoadingWards(false);
  }
};

  useEffect(() => {
    fetchAddresses();
    fetchProvinces();
  }, []);

useEffect(() => {
  if (!formData.provinceCode) {
    setWards([]);
    setLoadedProvinceCode('');
    return;
  }

  if (formData.provinceCode !== loadedProvinceCode) {
    fetchWards(formData.provinceCode);
  }
}, [formData.provinceCode, loadedProvinceCode]);
  // ================= FORM =================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsEdit(false);
    setWards([]);
  };

  const handleOpenAdd = () => {
    resetForm();
    setOpenModal(true);
  };

 const handleEdit = async (address: Address) => {
  setIsEdit(true);
  setEditingId(address.id);

  // Reset wards cũ
  setWards([]);

  // Load wards trước
  await fetchWards(address.provinceCode);

  // Sau khi load xong, set full formData (bao gồm wardCode)
  setFormData({
    fullName: address.fullName,
    phone: address.phone,
    specificAddress: address.specificAddress,
    provinceCode: address.provinceCode,
    wardCode: address.wardCode,
    isDefault: address.isDefault,
  });

  setOpenModal(true);
};

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      if (isEdit && editingId) {
        await profileService.updateAddress(
          editingId,
          formData
        );
      } else {
        await profileService.addAddress(formData);
      }

      await fetchAddresses();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa địa chỉ này không?'
    );

    if (!confirmed) return;

    try {
      await profileService.deleteAddress(id);

      await fetchAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DEFAULT =================

  const handleSetDefault = async (id: number) => {
    try {
      await profileService.setDefaultAddress(id);

      await fetchAddresses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Address Management
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Đang tải địa chỉ...
          </div>
        ) : addresses.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <h3 className="text-xl font-medium text-gray-600 mb-2 dark:text-white">
              Chưa có địa chỉ nào
            </h3>

            <p className="text-gray-500 mb-6">
              Thêm địa chỉ giao hàng để dễ dàng mua sắm hơn
            </p>

            <button
              onClick={handleOpenAdd}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Thêm địa chỉ đầu tiên
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-2xl p-6 transition-all duration-200 ${address.isDefault
                ? 'border-red-200 bg-red-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  <div
                    className={`mt-1 p-2 rounded-xl ${address.isDefault
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                      }`}
                  >
                    {address.isDefault ? (
                      <MapPin className="w-6 h-6 text-red-500" />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-lg text-gray-900 dark:text-white">
                        {address.fullName}
                      </span>

                      {address.isDefault && (
                        <span className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                          MẶC ĐỊNH
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                      {address.phone}
                    </p>

                    <p className="text-gray-700 dark:text-gray-200">
                      {address.specificAddress}
                    </p>

                    <p className="text-gray-600 dark:text-gray-400">
                      {address.provinceName}, {address.wardName}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-900 w-full max-w-2xl rounded-3xl p-6 relative">
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {isEdit
                ? 'Cập nhật địa chỉ'
                : 'Thêm địa chỉ mới'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <InputField
                  label="Họ và tên"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />

                <input
                  hidden
                  value={formData.fullName}
                  onChange={() => { }}
                />
              </div>

              <div>
                <InputField
                  label="Số điện thoại"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
                <input
                  hidden
                  value={formData.phone}
                  onChange={() => { }}
                />
              </div>
            </div>

            {/* Custom Input */}
            <div className="mt-5">
              <Label
                htmlFor="specificAddress"
                text="Địa chỉ cụ thể"
                required
              />

              <input
                id="specificAddress"
                value={formData.specificAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    specificAddress: e.target.value,
                  }))
                }
                placeholder="Số nhà, tên đường..."
                className="mt-2 flex h-12 w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            {/* Province */}
            <div className="mt-5">
              <Label
                htmlFor="province"
                text="Tỉnh / Thành phố"
                required
              />

              <Select
                options={provinces.map((item) => ({
                  value: item.code,
                  label: item.fullName,
                }))}
                value={formData.provinceCode}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    provinceCode: String(value),
                    wardCode: '',
                  }));
                }}
                placeholder="Chọn tỉnh / thành phố"
                className="justify-start"
              />
            </div>

            {/* Ward */}
            <div>
              <Label
                htmlFor="ward"
                text="Phường / Xã"
                required
              />

              <Select
  options={wards.map((item) => ({
    value: item.code,
    label: item.fullName,
  }))}
  value={formData.wardCode}
  onChange={(value) => {
    setFormData((prev) => ({
      ...prev,
      wardCode: String(value),
    }));
  }}
  placeholder={
    !formData.provinceCode
      ? 'Vui lòng chọn tỉnh trước'
      : loadingWards
      ? 'Đang tải phường / xã...'
      : 'Chọn phường / xã'
  }
  disabled={!formData.provinceCode || loadingWards}
  className="justify-start"
/>
            </div>

            {/* Controlled Inputs */}
            <div className="hidden">
              <input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />

              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            </div>

            {/* Default Address */}
            <div className="mt-5 flex items-center gap-3">
              <input
                id="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-gray-300"
              />

              <Label
                htmlFor="isDefault"
                text="Đặt làm địa chỉ mặc định"
                className="mb-0"
              />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Hủy
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
              >
                {isEdit ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 flex justify-center">
        <div className="text-sm text-gray-500 bg-gray-100 px-6 py-3 rounded-2xl dark:bg-white/5 dark:text-gray-300">
          Cần hỗ trợ? Gọi ngay{' '}
          <span className="font-semibold text-blue-600">
            0888 888 888
          </span>
        </div>
      </div>
    </div>
  );
}


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
} from '../../../../service/public/locationService';

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
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <MapPin className="w-7 h-7 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Sổ địa chỉ
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý địa chỉ giao hàng của bạn
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-2xl font-medium transition-all shadow-lg shadow-blue-500/30 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Thêm địa chỉ mới
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Đang tải địa chỉ...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-gray-400" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Chưa có địa chỉ nào
            </h3>

            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Thêm địa chỉ giao hàng để quá trình mua sắm và vận chuyển diễn ra nhanh chóng hơn
            </p>

            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-medium transition-all shadow-lg shadow-blue-500/30"
            >
              <Plus className="w-5 h-5" />
              Thêm địa chỉ đầu tiên
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl p-6 transition-all duration-300 ${address.isDefault
                ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/10'
                : 'border border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex gap-4 flex-1">
                  <div
                    className={`mt-1 p-3 rounded-2xl flex-shrink-0 ${address.isDefault
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                      : 'bg-gray-100'
                      }`}
                  >
                    {address.isDefault ? (
                      <MapPin className="w-6 h-6 text-white" />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-semibold text-lg text-gray-900">
                        {address.fullName}
                      </span>

                      {address.isDefault && (
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-500 text-white rounded-full">
                          MẶC ĐỊNH
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 font-medium">
                      {address.phone}
                    </p>

                    <p className="text-gray-700">
                      {address.specificAddress}
                    </p>

                    <p className="text-gray-500 text-sm">
                      {address.provinceName}, {address.wardName}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all text-sm font-medium"
                  >
                    <Pencil className="w-4 h-4" />
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all text-sm font-medium"
                    >
                      <Star className="w-4 h-4" />
                      Mặc định
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl">
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEdit
                  ? 'Cập nhật địa chỉ'
                  : 'Thêm địa chỉ mới'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label
                  htmlFor="fullName"
                  text="Họ và tên"
                  required
                />
                <input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Nhập họ và tên"
                  className="mt-2 flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  text="Số điện thoại"
                  required
                />
                <input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="Nhập số điện thoại"
                  className="mt-2 flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
                className="mt-2 flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
            <div className="mt-5">
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

            {/* Default Address */}
            <div className="mt-6 flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
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
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <Label
                htmlFor="isDefault"
                text="Đặt làm địa chỉ mặc định"
                className="mb-0 text-gray-700"
              />
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium transition-all"
              >
                Hủy
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all shadow-lg shadow-blue-500/30"
              >
                {isEdit ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


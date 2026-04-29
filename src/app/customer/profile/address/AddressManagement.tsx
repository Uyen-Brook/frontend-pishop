'use client';

import React, { useState } from 'react';
import { Pencil, Trash2, MapPin, Building2, Star, Plus } from 'lucide-react';

interface AddressResponse {
  id: number;
  fullName: string;
  phone: string;
  specificAddress: string;
  provinceName: string;
  wardName?: string;
  isDefault: boolean;
}

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<AddressResponse[]>([
    {
      id: 1,
      fullName: "Chu Văn A",
      phone: "09888765486",
      specificAddress: "Nhà số 3, Hẻm 113/0",
      provinceName: "Nam Từ Liêm, Hà Nội",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "",
      phone: "",
      specificAddress: "8th Floor, Main St",
      provinceName: "San Francisco, CA 94105",
      isDefault: false,
    },
  ]);

  // Mở form thêm/sửa (bạn có thể thay bằng modal sau)
  const handleAddNew = () => {
    alert("Mở form thêm địa chỉ mới");
    // TODO: Mở Modal thêm địa chỉ
  };

  const handleEdit = (id: number) => {
    alert(`Chỉnh sửa địa chỉ ID: ${id}`);
    // TODO: Mở Modal chỉnh sửa
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Address Management</h1>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      {/* Danh sách địa chỉ */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          // Empty State
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Chưa có địa chỉ nào
            </h3>
            <p className="text-gray-500 mb-6">
              Thêm địa chỉ giao hàng để dễ dàng mua sắm hơn
            </p>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Thêm địa chỉ đầu tiên
            </button>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-2xl p-6 transition-all duration-200 ${
                address.isDefault
                  ? 'border-red-200 bg-red-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`mt-1 p-2 rounded-xl ${
                    address.isDefault ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {address.isDefault ? (
                      <MapPin className="w-6 h-6 text-red-500" />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-500" />
                    )}
                  </div>

                  {/* Thông tin địa chỉ */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg text-gray-900">
                        {address.fullName || "Văn phòng"}
                      </span>
                      {address.isDefault && (
                        <span className="px-3 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                          MẶC ĐỊNH
                        </span>
                      )}
                    </div>

                    {address.phone && (
                      <p className="text-gray-600 font-medium">{address.phone}</p>
                    )}

                    <p className="text-gray-700 leading-relaxed">
                      {address.specificAddress}
                    </p>
                    <p className="text-gray-600">
                      {address.provinceName}
                      {address.wardName && `, ${address.wardName}`}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(address.id)}
                    className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    title="Xóa"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="p-3 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      title="Đặt làm mặc định"
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

      {/* Footer Info */}
      <div className="mt-10 flex justify-center">
        <div className="text-sm text-gray-500 bg-gray-100 px-6 py-3 rounded-2xl">
          Cần hỗ trợ? Gọi ngay <span className="font-semibold text-blue-600">0888 888 888</span>
        </div>
      </div>
    </div>
  );
}
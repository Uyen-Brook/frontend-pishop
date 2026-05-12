import { apiClient } from "../api";
import { useAuthStore } from "../../store/authStore";

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: string;
  point: number;
  rank: string;
  phone: string;
  email: string;
  gender: boolean;
  dob?: string;
}

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: boolean;
  dob?: string;
}

export interface Address {
  id: number;
  fullName: string;
  phone: string;
  specificAddress: string;

  provinceCode: string;
  wardCode: string;

  provinceName: string;
  wardName: string;
  isDefault: boolean;
}
export interface AddressPayload {
  fullName: string;
  phone: string;
  specificAddress: string;
  provinceCode: string;
  wardCode: string;
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

const getAccountId = () => {
  const accountId = useAuthStore.getState().user?.accountId;

  if (!accountId) {
    throw new Error("accountId is undefined");
  }

  return accountId;
};

export const profileService = {
  // ================= PROFILE =================

  async getUserProfile(): Promise<UserProfile> {
    const accountId = getAccountId();

    const response = await apiClient.get<UserProfile>(
      `/user/profile/infor/${accountId}`
    );

    return response.data;
  },

  async updateProfile(
    id: number,
    data: UpdateProfilePayload
  ) {
    const response = await apiClient.put(
      `/user/profile/infor/update/${id}`,
      data
    );

    return response.data;
  },

  async uploadAvatar(id: number, file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post(
      `/user/profile/avatar/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  //============== change password =========
  async changePassword(
    id: number,
    data: ChangePasswordPayload
  ) {
    const response = await apiClient.put(
      `/user/profile/password/update/${id}`,
      data
    );

    return response.data;
  },

  // ================= ADDRESS =================

  async getAddresses(): Promise<Address[]> {
    const accountId = getAccountId();

    const response = await apiClient.get<Address[]>(
      `/user/profile/address/${accountId}`
    );

    return response.data;
  },

  async addAddress(data: AddressPayload) {
    const accountId = getAccountId();

    const response = await apiClient.post(
      `/user/profile/address/${accountId}`,
      data
    );

    return response.data;
  },

  async updateAddress(
    id: number,
    data: AddressPayload
  ) {
    const response = await apiClient.put(
      `/user/profile/address/${id}`,
      data
    );

    return response.data;
  },

  async setDefaultAddress(id: number) {
    const accountId = getAccountId();

    const response = await apiClient.put(
      `/user/profile/address/${id}/default`,
      null,
      {
        params: {
          accountId,
        },
      }
    );

    return response.data;
  },

  async deleteAddress(id: number) {
    const response = await apiClient.delete(
      `/user/profile/address/${id}`
    );

    return response.data;
  },

  async deleteMultipleAddress(ids: number[]) {
    const response = await apiClient.delete(
      `/user/profile/address/multi`,
      {
        data: ids,
      }
    );

    return response.data;
  },
};
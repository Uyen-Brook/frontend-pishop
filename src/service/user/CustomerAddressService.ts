import { apiClient } from "../api";
import { useAuthStore } from "../../store/authStore";
export interface AddressResponse {
  id: BigInt;
  fullName: string;
  phone: string;
  specificAddress: string;
  provinceName: string;
  wardName: string;
  isDefault: boolean;
}

// // Mock data for testing
// const MOCK_ADDRESSES: AddressResponse[] = [
//   {
//     id: 1 as unknown as BigInt,
//     fullName: "Nguyễn Văn A",
//     phone: "0997864743",
//     specificAddress: "123 Đường Nguyễn Huệ, Quận 1",
//     provinceName: "Hồ Chí Minh",
//     wardName: "Phường 1",
//     isDefault: true,
//   },
//   {
//     id: 2 as unknown as BigInt,
//     fullName: "Nguyễn Văn A",
//     phone: "0987654321",
//     specificAddress: "456 Đường Lê Lợi",
//     provinceName: "Hà Nội",
//     wardName: "Phường Hàng Trống",
//     isDefault: false,
//   },
//   {
//     id: 3 as unknown as BigInt,
//     fullName: "Trần Thị B",
//     phone: "0912345678",
//     specificAddress: "789 Đường Tôn Đức Thắng",
//     provinceName: "Đà Nẵng",
//     wardName: "Phường Hòa Cường Nam",
//     isDefault: false,
//   },
// ];

export const  CustomerAddressService = {
  /**
   * Fetch all addresses for current customer
   */
  async getAddresses(): Promise<AddressResponse[]> {
    try {
      const accountId = useAuthStore.getState().user?.accountId;
      const addresses = await apiClient.get<AddressResponse[]>(`/user/profile/address/${accountId}`);
      return addresses.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      return [];
    }
  },

  /**
   * Fetch single address by ID
   */
  async getAddressById(id: BigInt): Promise<AddressResponse | null> {
    try {
      const response = await apiClient.get<AddressResponse>(`/customer/addresses/${id}`);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  },

  /**
   * Create new address
   */
  async createAddress(address: Omit<AddressResponse, "id" | "isDefault">): Promise<AddressResponse | null> {
    try {
      const response = await apiClient.post<AddressResponse>("/customer/addresses", address);
      return response.data || null;
    } catch (error) {
      console.error("Error creating address:", error);
      return null;
    }
  },

  /**
   * Update existing address
   */
  async updateAddress(id: BigInt, address: Partial<AddressResponse>): Promise<AddressResponse | null> {
    try {
      const response = await apiClient.put<AddressResponse>(`/customer/addresses/${id}`, address);
      return response.data || null;
    } catch (error) {
      console.error("Error updating address:", error);
      return null;
    }
  },

  /**
   * Delete address
   */
  async deleteAddress(id: BigInt): Promise<boolean> {
    try {
      await apiClient.delete(`/customer/addresses/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting address:", error);
      return false;
    }
  },

  /**
   * Set address as default
   */
  async setDefaultAddress(id: BigInt): Promise<boolean> {
    try {
      await apiClient.put(`/customer/addresses/${id}/set-default`);
      return true;
    } catch (error) {
      console.error("Error setting default address:", error);
      return false;
    }
  }
};


  
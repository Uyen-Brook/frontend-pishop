// MOCK DATA
import { Category } from "../../types";
export const mockCategories: Category[] = [
  {
    id: 1,
    name: "Laptop",
    description: "Laptop văn phòng, gaming, đồ họa",
    image: "https://picsum.photos/seed/laptop/400/300",
    icon: "FaLaptop"
  },
  {
    id: 2,
    name: "Điện thoại",
    description: "Smartphone Android, iOS mới nhất",
    image: "https://picsum.photos/seed/phone/400/300",
    icon: "MdPhoneIphone"
  },
  {
    id: 3,
    name: "Tablet",
    description: "Máy tính bảng phục vụ học tập, giải trí",
    image: "https://picsum.photos/seed/tablet/400/300",
    icon: "FaTabletAlt"
  },
  {
    id: 4,
    name: "Tai nghe",
    description: "Tai nghe bluetooth, gaming, chống ồn",
    image: "https://picsum.photos/seed/headphone/400/300",
    icon: "FaHeadphones"
  },
  {
    id: 5,
    name: "Đồng hồ thông minh",
    description: "Smartwatch theo dõi sức khỏe",
    image: "https://picsum.photos/seed/watch/400/300",
    icon: "FaClock"
  },
  {
    id: 6,
    name: "Phụ kiện",
    description: "Sạc, cáp, ốp lưng, pin dự phòng",
    image: "https://picsum.photos/seed/accessory/400/300",
    icon: "FaPlug"
  },
  {
    id: 7,
    name: "PC - Máy tính bàn",
    description: "PC gaming, workstation, build sẵn",
    image: "https://picsum.photos/seed/pc/400/300",
    icon: "FaDesktop"
  },
  {
    id: 8,
    name: "Màn hình",
    description: "Màn hình gaming, đồ họa, văn phòng",
    image: "https://picsum.photos/seed/monitor/400/300",
    icon: "MdMonitor"
  },
  {
    id: 9,
    name: "Bàn phím - Chuột",
    description: "Gaming gear, cơ, không dây",
    image: "https://picsum.photos/seed/keyboard/400/300",
    icon: "FaKeyboard"
  },
  {
    id: 10,
    name: "Thiết bị mạng",
    description: "Router, modem, wifi mesh",
    image: "https://picsum.photos/seed/network/400/300",
    icon: "FaWifi"
  }
];

export const categoryService = {
  async getAll() {
    return Promise.resolve(mockCategories);
  }
};


// import  apiClient from "../api";
// import type { Category } from "../../types/index";

// export const categoryService = {
//   getAll(): Promise<Category[]> {
//     return apiClient.get("/categories").then((res) => res.data);
//   },
// };

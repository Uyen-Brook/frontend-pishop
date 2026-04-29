import { useLocation, useNavigate } from "react-router-dom";
import ProfileMenuItem, { MenuItem } from "./MenuItem";
import { ROUTES } from "../../../../config/routes";
import { useAuthStore } from "../../../../store/authStore";

export const profileMenuData: MenuItem[] = [
  {
    name: "Đơn hàng hiện tại",
    icon: "MdOrder",
    path: ROUTES.HOME,
  },
  {
    name: "Thông tin cá nhân",
    icon: "MdPerson",
    path: ROUTES.CUSTOMER_PROFILE_INFO,
  },
  {
    name: "Đơn hàng",
    icon: "MdShoppingBag",
    path: ROUTES.CUSTOMER_PROFILE_ORDERS,
  },
  {
    name: "Địa chỉ",
    icon: "MdLocationOn",
    path: ROUTES.CUSTOMER_PROFILE_ADDRESS,
  },
];

const ProfileMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useAuthStore((state) => state.logout);

  const handleItemClick = (path: string) => {
    // Logout
    if (path === "/logout") {
      logout();
      navigate("/");
      return;
    }

    navigate(path);
  };

  return (
    <ul className="bg-white rounded-lg shadow overflow-hidden">
      {profileMenuData.map((item) => (
        <ProfileMenuItem
          key={item.path}
          item={item}
          active={location.pathname === item.path}
          onClick={() => handleItemClick(item.path)}
        />
      ))}
    </ul>
  );
};

export default ProfileMenu;
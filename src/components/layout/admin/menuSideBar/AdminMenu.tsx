import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./menuItem";
import { adminMenus } from "./menu";

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("AdminMenu rendering, current location:", location.pathname);

  const handleMenuClick = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <div className="w-full bg-white h-full border-r border-gray-200 flex flex-col">
      {/* Logo/Title Section */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Management System</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {adminMenus.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              active={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
            />
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>System Online</span>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
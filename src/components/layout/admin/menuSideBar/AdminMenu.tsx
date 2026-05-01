// AdminMenu.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarItem from "./menuItem";
import { adminMenus } from "./menu";
import Card from "../../../../components/card/Card";
import {
  MdLogout,
} from "react-icons/md";
import { useAuthStore } from "../../../../store/authStore";
import { FiMenu } from "react-icons/fi";


type Props = {
  onLogout: () => void;
};

const AdminMenu: React.FC<Props> = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-200 bg-white dark:border-white/10 dark:bg-navy-900">

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
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

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 dark:border-white/10">

        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          <MdLogout className="text-xl" />
          <span className="font-semibold">Logout</span>
        </button>

      </div>
    </div>
  );
};

export default AdminMenu;
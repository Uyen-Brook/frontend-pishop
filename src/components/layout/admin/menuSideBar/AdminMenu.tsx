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

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout, user } = useAuthStore();

  const [openLogoutModal, setOpenLogoutModal] =
    useState(false);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();

    setOpenLogoutModal(false);

    // ADMIN → login
    if (user?.role === "ADMIN") {
      navigate("/login");
      return;
    }

    // USER → homepage
    navigate("/");
  };

  return (
    <>
      <div className="flex h-full w-full flex-col border-r border-gray-200 bg-white dark:border-white/10 dark:bg-navy-900">
        
        {/* <div className="border-b border-gray-200 p-6 dark:border-white/10">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
            
            <img
              src={
                "https://i.pravatar.cc/100"
              }
              alt="avatar"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1 overflow-hidden">
                         <p className="truncate text-xs text-gray-500">
              </p>
            </div>
          </div>
        </div> */}

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
          
          {/* Logout Button */}
          <button
            onClick={() => setOpenLogoutModal(true)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <MdLogout className="text-xl" />

            <span className="font-semibold">
              Logout
            </span>
          </button>

          {/* System Status */}
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>

            <span>System Online</span>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {openLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          
          <Card extra="w-full max-w-md p-6">
            
            <div className="text-center">
              
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <MdLogout className="text-4xl text-red-500" />
              </div>

              <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
                Đăng xuất?
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              
              <button
                onClick={() =>
                  setOpenLogoutModal(false)
                }
                className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Hủy
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminMenu;
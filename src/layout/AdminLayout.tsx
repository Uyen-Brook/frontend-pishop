import React, { useState } from "react";
import { AdminMenu } from "../components/layout/admin/menuSideBar";
import { FiMenu } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import Card from "../components/card/Card";
import { useAuthStore } from "../store/authStore";
import {ROUTES} from "../config/routes";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    setOpenLogoutModal(false);

    if (user?.role === "ADMIN") {
      window.location.href = ROUTES.LOGIN;
    } else {
      window.location.href = ROUTES.PRODUCT;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-44 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <AdminMenu onLogout={() => setOpenLogoutModal(true)} />
      </div>

      {/* Overlay sidebar mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-navy-700">Admin Panel</h1>
        </header>

        {/* IMPORTANT: relative wrapper */}
        <main className="flex-1 overflow-y-auto p-6 bg-white relative">
          <div className="max-w-7xl mx-auto">{children}</div>

          {/* ===== LOGOUT MODAL (CENTER CHILDREN AREA) ===== */}
          {openLogoutModal && (
            <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
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
                    onClick={() => setOpenLogoutModal(false)}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold"
                  >
                    Hủy
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white"
                  >
                    Đăng xuất
                  </button>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
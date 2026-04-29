// AdminLayout.tsx
import React, { useState } from "react";
import { AdminMenu } from "../components/layout/admin/menuSideBar";
import { FiMenu } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-44 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <AdminMenu />
      </div>

      {/* Overlay khi mở sidebar trên mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header với nút trigger */}
        <header className="flex items-center justify-between p-4 bg-white border-b md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-bold text-navy-700">Admin Panel</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

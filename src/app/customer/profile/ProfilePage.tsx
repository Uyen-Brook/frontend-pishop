// app/customer/profile/ProfilePage.tsx  (hoặc ProfileLayout.tsx)

import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../../components/layout/custommer/menu/MennuProfile"; // menu bên trái

export default function ProfileLayout() {
  return (
    <div className="min-h-screen bg-gray-50 py-3">
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Menu Profile */}
          <div className="lg:w-50 flex-shrink-0">
            <ProfileSidebar />
          </div>

          {/* Nội dung chính (info, address, orders...) */}
          <div className="flex-1">
            <Outlet />        {/* ← Rất quan trọng */}
          </div>
        </div>
      </div>
    </div>
  );
}
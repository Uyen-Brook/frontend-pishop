// app/customer/profile/ProfilePage.tsx  (hoặc ProfileLayout.tsx)

import { Outlet } from "react-router-dom";
import ProfileSidebar from "../../../components/layout/custommer/menu/MennuProfile"; // menu bên trái
import { useAuthStore } from "../../../store/authStore";

export default function ProfileLayout() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 pt-10">
      {/* Header Banner */}
      <div className="text-black">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <p className="text-black-100">
            Chào mừng, {user?.email || 'Khách hàng'}!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Menu Profile */}
          <div className="lg:w-64 flex-shrink-0">
            <ProfileSidebar />
          </div>
          {/* Nội dung chính (info, address, orders...) */}
          <div className="flex-1">
            <Outlet />        
          </div>
        </div>
      </div>
    </div>
  );
}
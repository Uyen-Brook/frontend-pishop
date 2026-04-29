import { useEffect } from "react";

import { Routes, Route ,  Navigate } from "react-router-dom";
import { publicRoutes, userRoutes, adminRoutes, authRoutes } from "./config/RouteGroup";
// Public pages
import { RoleRoute } from "./components/layout/RoleRule";
import UserLayout from "./layout/UserLayout";
import { useAuthStore } from "./store/authStore";
import AdminLayout from "./layout/AdminLayout";

import ProfileLayout from "./app/customer/profile/ProfilePage";
import ProfileInfoPage from "./app/customer/profile/info/ProfileManagement";
import ProfileOrdersPage from "./app/customer/profile/orders/ProfileOrdersPage";
import ProfileAddressPage from "./app/customer/profile/address/AddressManagement"

export default function App() {
  // Initialize auth from localStorage on app mount
  useEffect(() => {
    const initAuth = useAuthStore.getState().initFromStorage;
    initAuth();
  }, []);
  
  return (
    <Routes>
      {/* AuthRoutes */}
      {authRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}

      {/* ADMIN ROUTES */}
      {adminRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <RoleRoute allowRoles={["ADMIN"]}>
              <AdminLayout>{r.element}</AdminLayout>
            </RoleRoute>
          }
        />
      ))}

      {/* PUBLIC ROUTES */}
       {publicRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={<UserLayout>{r.element}</UserLayout>}
        />
      ))}

      {/* USER ROUTES */}
      {userRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <RoleRoute allowRoles={["USER"]}>
              <UserLayout>{r.element}</UserLayout>
            </RoleRoute>
          }
        />
      ))}
      
    {/* PROFILE - MINI LAYOUT */}
    {/* Profile cha sẽ nằm trong UserLayout + có ProfileLayout bên trong */}
      <Route
        path="/profile"
        element={
          <RoleRoute allowRoles={["USER"]}>
            <UserLayout>
              <ProfileLayout />          {/* ← Đây là layout chứa sidebar menu */}
            </UserLayout>
          </RoleRoute>
        }
      >
        {/* Các trang con của Profile */}
        <Route path="info" element={<ProfileInfoPage />} />
        <Route path="address" element={<ProfileAddressPage />} />
        <Route path="orders" element={<ProfileOrdersPage />} />
        
        {/* Nếu muốn trang /profile mặc định là Info */}
        <Route index element={<Navigate to="info" replace />} />
      </Route>
  
    </Routes>
  );
}

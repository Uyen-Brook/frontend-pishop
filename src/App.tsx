import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { publicRoutes, userRoutes, adminRoutes, authRoutes } from "./config/RouteGroup";
// Public pages
import { RoleRoute } from "./components/layout/RoleRule";
import UserLayout from "./layout/UserLayout";
import { useAuthStore } from "./store/authStore";
import AdminLayout from "./layout/AdminLayout";

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
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import { publicRoutes, userRoutes, adminRoutes } from "./config/RouteGroup";
// Public pages
import { RoleRoute } from "./components/layout/RoleRule";


export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      {publicRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}

      {/* USER ROUTES */}
      {userRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <RoleRoute allowRoles={["USER"]}>{r.element}</RoleRoute>
          }
        />
      ))}

      {/* ADMIN ROUTES */}
      {adminRoutes.map((r) => (
        <Route
          key={r.path}
          path={r.path}
          element={
            <RoleRoute allowRoles={["ADMIN"]}>{r.element}</RoleRoute>
          }
        />
      ))}
    </Routes>
  );
}

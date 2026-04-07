import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { ReactNode } from "react";
import {ROUTES} from "../../config/routes";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
}

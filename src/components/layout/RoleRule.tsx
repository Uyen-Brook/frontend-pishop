import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { UserRole } from "../../types/index";
import type { ReactNode } from "react";
import {ROUTES} from "../../config/routes";
export function RoleRoute({
  children,
  allowRoles,
}: {
  children: ReactNode;
  allowRoles: UserRole[];
}) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  if (!user || !allowRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}

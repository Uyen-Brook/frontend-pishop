import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import type { ReactNode } from "react";
import {ROUTES} from "../../config/routes";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useAuthStore();

  // Wait for auth initialization to complete
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;

  return children;
}

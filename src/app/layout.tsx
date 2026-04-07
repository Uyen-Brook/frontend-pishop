import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import type { AuthState } from "../store/authStore";

export default function RootLayout({ children }: { children: ReactNode }) {
  const initFromStorage = useAuthStore((s: AuthState) => s.initFromStorage);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  return <>{children}</>;
}

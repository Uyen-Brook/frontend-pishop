import HomePage from "../app/public/homePage";
import LoginPage from "../app/auth/login/page";
import RegisterPage from "../app/auth/register/page";
import ProductListPage from "../components/product/ProductListPage";

import CustomerProfilePage from "../app/customer/profile/page";
import AdminDashboardPage from "../app/admin/dashboard/page";

import { ROUTES } from "./routes";

import type { ReactNode } from "react";

export interface AppRoute {
  path: string;
  element: ReactNode;
}

export const publicRoutes: AppRoute[] = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
  { path: ROUTES.PRODUCT, element: <ProductListPage /> }
];

export const userRoutes: AppRoute[] = [
  { path: ROUTES.CUSTOMER_PROFILE, element: <CustomerProfilePage /> }
];

export const adminRoutes: AppRoute[] = [
  { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboardPage /> }
];

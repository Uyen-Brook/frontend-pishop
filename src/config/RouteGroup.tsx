import HomePage from "../app/public/homePage";
import LoginPage from "../app/auth/login/page";
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
  { path: "/", element: <HomePage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/products", element: <ProductListPage /> }
];

export const userRoutes: AppRoute[] = [
  { path: "/customer/profile", element: <CustomerProfilePage /> }
];

export const adminRoutes: AppRoute[] = [
  { path: "/admin/dashboard", element: <AdminDashboardPage /> }
];

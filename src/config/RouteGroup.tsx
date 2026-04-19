import HomePage from "../app/public/home/homePage";
import LoginPage from "../app/auth/login/page";
import RegisterPage from "../app/auth/register/page";
import ProductListPage from "../components/product/ProductListPage";
import ProductDetailPage from "../app/customer/product/page";
import AboutPage from "../app/public/about/AboutPage";
import ReturnPolicyPage from "../app/public/policy/ReturnPolicyPage";

import CustomerProfilePage from "../app/customer/profile/page";
import CartPage from "../app/customer/cart/CartPage";
import CheckoutPage from "../app/customer/checkout/CheckoutPage";
import AdminDashboardPage from "../app/admin/dashboard/page";

import { ROUTES } from "./routes";

import type { ReactNode } from "react";


export interface AppRoute {
  path: string;
  element: ReactNode;
}

export const authRoutes: AppRoute[]=[
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },
]
export const publicRoutes: AppRoute[] = [
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.PRODUCT, element: <ProductListPage /> },
  { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailPage /> },
  { path: ROUTES.ABOUT, element: <AboutPage /> },
  { path: ROUTES.RETURN_POLICY, element: <ReturnPolicyPage /> }
];

export const userRoutes: AppRoute[] = [
  { path: ROUTES.CUSTOMER_PROFILE, element: <CustomerProfilePage /> },
  { path: ROUTES.CART, element: <CartPage /> },
  { path: ROUTES.CHECKOUT, element: <CheckoutPage /> }
];

export const adminRoutes: AppRoute[] = [
  { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboardPage /> }
];

import HomePage from "../app/public/home/homePage";
import LoginPage from "../app/auth/login/page";
import RegisterPage from "../app/auth/register/page";

import ProductDetailPage from "../app/customer/product/page";
import AboutPage from "../app/public/about/AboutPage";
import ReturnPolicyPage from "../app/public/policy/ReturnPolicyPage";

import CustomerProfilePage from "../app/customer/profile/ProfilePage";
import CartPage from "../app/customer/cart/CartPage";
import CheckoutPage from "../app/customer/checkout/CheckoutPage";
import AdminDashboardPage from "../app/admin/dashboard/page";

import { ROUTES } from "./routes";

import type { ReactNode } from "react";
import AdminProductsPage from "../app/admin/product/ProductPage";
import OrderManagement from "../app/admin/order/Order";
import AdminBrandsPage from "../app/admin/brand/BrandPage";
import SupplierManagementPage from "../app/admin/supplier/AdminSuplierPage";
import CategoryPage from "../app/admin/category/CategoryPage";
import AccountPage from "../app/admin/account/AccountPage";
import ProfileAddressPage from "../app/customer/profile/address/AddressManagement";


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
  { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailPage /> },
  { path: ROUTES.ABOUT, element: <AboutPage /> },
  { path: ROUTES.RETURN_POLICY, element: <ReturnPolicyPage /> }
];

export const userRoutes: AppRoute[] = [
  { path: ROUTES.CART, element: <CartPage /> },
  { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
];

export const adminRoutes: AppRoute[] = [
  { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboardPage /> },
  { path: ROUTES.ADMIN_PRODUCTS, element: <AdminProductsPage /> },
  { path: ROUTES.ADMIN_ORDERS, element: <OrderManagement /> },
  { path: ROUTES.ADMIN_BRANDS, element: <AdminBrandsPage /> },
  { path: ROUTES.ADMIN_SUPPLIER, element: <SupplierManagementPage /> },
  { path: ROUTES.ADMIN_CATEGORY, element: <CategoryPage/> },
  { path: ROUTES.ADMIN_ACCOUNT, element: < AccountPage/>}
  // { path: ROUTES.ADMIN_ORDERS, element: <AdminOrdersPage /> },
  // { path: ROUTES.ADMIN_CUSTOMERS, element: <AdminCustomersPage /> }
];

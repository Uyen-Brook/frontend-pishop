import {ROUTES} from "../../../../config/routes";

export const adminMenus = [
  { name: "Dashboard", icon: "MdDashboard", path: ROUTES.ADMIN_DASHBOARD},
  { name: "Brand", icon: "MdBusiness", path: ROUTES.ADMIN_BRAND },
  { name: "Supplier", icon: "MdLocalShipping", path: ROUTES.ADMIN_SUPPLIER},
  { name: "Category", icon: "MdCategory", path: ROUTES.ADMIN_CATEGORY },
  { name: "Product", icon: "MdInventory", path: ROUTES.ADMIN_PRODUCTS},
  { name: "Order", icon: "MdShoppingCart", path: ROUTES.ADMIN_ORDERS },
  { name: "Account", icon: "MdPerson", path: ROUTES.ADMIN_ACCOUNT} ,
  { name: "Setting", icon: "MdSettings", path: ROUTES.ADMIN_SETTING },
  { name: "Customer", icon: "MdPeople", path: ROUTES.ADMIN_CUSTOMERS }
];

export default adminMenus;
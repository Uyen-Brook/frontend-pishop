"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import Card from "../../../components/card/Card";
import Widget from "../../../components/widget/Widget";
import SearchInput from "../../../components/search/SearchInput";
import Select from "../../../components/select/Select";
import StatsCard from "../../../components/card/StatsCard";
import AddNewProduct from "../../../components/layout/admin/product/AddProductForm";
import { ProductService } from "../../../service/admin/ProductService";
import {
  Package,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Product, Category, Brand, SupplierResponse } from "../../../types/index";
import { productService } from "../../../service/custommer/productService";

// ======================================
// MOCK DATA
// ======================================

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    sku: "IP15PM-128",
    category: "Electronics",
    price: 1199,
    stock: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    sku: "MBP-M3-512",
    category: "Electronics",
    price: 2499,
    stock: 10,
    status: "Active",
  },
  {
    id: 3,
    name: "Nike Air Jordan",
    sku: "NK-AJ-001",
    category: "Fashion",
    price: 220,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    name: "Atomic Habits",
    sku: "BOOK-001",
    category: "Books",
    price: 25,
    stock: 120,
    status: "Inactive",
  },
];

// ======================================
// SELECT OPTIONS
// ======================================

const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Electronics", value: "Electronics" },
  { label: "Fashion", value: "Fashion" },
  { label: "Books", value: "Books" },
];

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Out of Stock", value: "Out of Stock" },
];

// ======================================
// MAIN PAGE
// ======================================

export default function AdminProductsPage() {

  // ======================================
  // STATES
  // ======================================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  // ======================================
  // FILTER PRODUCTS
  // ======================================

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || product.category === category;

      const matchStatus =
        status === "all" || product.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [search, category, status]);

  // ======================================
  // STATS
  // ======================================

  const totalProducts = products.length;

  const totalOrders = 567;

  const lowStock = products.filter((p) => p.stock < 20).length;

  const revenue = "$45,780";


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await ProductService.getAll(0, 10);
      setProducts(res.content); // ✅ lấy content

    } catch (error) {
      alert("Có lỗi xảy ra, không thể kết nối API");
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // RENDER
  // ======================================

  return (
    <div className="space-y-6">
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your store products and inventory
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          Add New Product
        </button>
      </div>

      {/* ====================================== */}
      {/* STATS */}
      {/* ====================================== */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Package}
          title="Total Products"
          value="1,234"
          growth="+12.5%"
          trend="up"
        />

        <StatsCard
          icon={AlertTriangle}
          title="Low Stock"
          value="12"
          growth="-3.1%"
          trend="down"
        />

        <StatsCard
          icon={Users}
          title="Visitors"
          value="890"
          growth="0%"
          trend="neutral"
        />

        <StatsCard
          icon={DollarSign}
          title="Revenue"
          value={revenue}
          growth="+24.3%"
          color="bg-purple-100 text-purple-600"
        />
      </div>

      {/* ====================================== */}
      {/* FILTERS */}
      {/* ====================================== */}

      <Card extra="p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* SEARCH */}
          <div className="w-full xl:w-[320px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search products..."
            />
          </div>

          {/* FILTERS */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Select
              value={category}
              onChange={(value) => setCategory(String(value))}
              options={categoryOptions}
            />

            <Select
              value={status}
              onChange={(value) => setStatus(String(value))}
              options={statusOptions}
            />
          </div>
        </div>
      </Card>

      {/* ====================================== */}
      {/* TABLE */}
      {/* ====================================== */}

      <Card extra="overflow-hidden">
        {/* TABLE HEADER */}
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Products List
              </h2>
              <AddNewProduct />
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredProducts.length} products
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* PRODUCT */}
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-5 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {product.category}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-5 text-sm font-semibold text-gray-900 dark:text-white">
                    ${product.price}
                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock < 20
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                        }`}
                    >
                      {product.stock} items
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Inactive"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50">
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button className="rounded-lg p-2 text-red-600 transition hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300" />

            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No products found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
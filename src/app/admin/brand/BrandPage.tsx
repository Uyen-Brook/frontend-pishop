"use client";

import { useMemo, useState } from "react";

import Card from "../../../components/card/Card";
import StatsCard from "../../../components/card/StatsCard";
import SearchInput from "../../../components/search/SearchInput";
import Select from "../../../components/select/Select";

import {
  Building2,
  Globe,
  Package,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

// ============================================
// TYPES
// ============================================

interface Brand {
  id: number;
  name: string;
  image: string;
  website: string;
  note: string;
  totalProducts: number;

  // soft delete
  deleted: boolean;
}

// ============================================
// MOCK DATA
// ============================================

const initialBrands: Brand[] = [
  {
    id: 1,
    name: "Apple",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    website: "https://apple.com",
    note: "Premium electronics brand",
    totalProducts: 120,
    deleted: false,
  },

  {
    id: 2,
    name: "Samsung",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    website: "https://samsung.com",
    note: "Mobile and electronics",
    totalProducts: 90,
    deleted: false,
  },

  {
    id: 3,
    name: "Nike",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    website: "https://nike.com",
    note: "Sportswear brand",
    totalProducts: 75,
    deleted: true,
  },
];

// ============================================
// FILTER OPTIONS
// ============================================

const statusOptions = [
  {
    label: "All",
    value: "all",
  },

  {
    label: "Active",
    value: "active",
  },

  {
    label: "Deleted",
    value: "deleted",
  },
];

// ============================================
// MAIN PAGE
// ============================================

export default function AdminBrandsPage() {
  // ============================================
  // STATES
  // ============================================

  const [brands, setBrands] =
    useState<Brand[]>(initialBrands);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  // ============================================
  // FILTER
  // ============================================

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const matchSearch =
        brand.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === "all"
          ? true
          : status === "active"
          ? !brand.deleted
          : brand.deleted;

      return matchSearch && matchStatus;
    });
  }, [brands, search, status]);

  // ============================================
  // ACTIONS
  // ============================================

  const handleSoftDelete = (id: number) => {
    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === id
          ? {
              ...brand,
              deleted: !brand.deleted,
            }
          : brand
      )
    );
  };

  // ============================================
  // STATS
  // ============================================

  const totalBrands =
    brands.length;

  const activeBrands =
    brands.filter((b) => !b.deleted)
      .length;

  const deletedBrands =
    brands.filter((b) => b.deleted)
      .length;

  const totalProducts =
    brands.reduce(
      (sum, brand) =>
        sum + brand.totalProducts,
      0
    );

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="space-y-6">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Brand Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage product brands and suppliers
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            rounded-xl
            bg-blue-600
            px-5 py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Plus className="h-5 w-5" />

          Add Brand
        </button>
      </div>

      {/* ============================================ */}
      {/* STATS */}
      {/* ============================================ */}

      {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          icon={Building2}
          title="Total Brands"
          value={String(totalBrands)}
          growth="+12.5%"
          trend="up"
          color="bg-blue-100 text-blue-600"
        />

        <StatsCard
          icon={Eye}
          title="Active Brands"
          value={String(activeBrands)}
          growth="+8.1%"
          trend="up"
          color="bg-green-100 text-green-600"
        />

        <StatsCard
          icon={EyeOff}
          title="Deleted Brands"
          value={String(deletedBrands)}
          growth="-2.5%"
          trend="down"
          color="bg-red-100 text-red-600"
        />

        <StatsCard
          icon={Package}
          title="Products"
          value={String(totalProducts)}
          growth="+18.2%"
          trend="up"
          color="bg-purple-100 text-purple-600"
        />
      </div> */}

      {/* ============================================ */}
      {/* FILTER */}
      {/* ============================================ */}

      <Card extra="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}
          <div className="w-full lg:w-[320px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search brands..."
            />
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-3">
            <Select
              value={status}
              onChange={(value) =>
                setStatus(String(value))
              }
              options={statusOptions}
            />
          </div>
        </div>
      </Card>

      {/* ============================================ */}
      {/* TABLE */}
      {/* ============================================ */}

      <Card extra="overflow-hidden">
        {/* HEADER */}
        <div className="border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Brands List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredBrands.length} brands
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* HEAD */}
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Brand
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Website
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Products
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Note
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-gray-100 bg-white dark:bg-gray-900">
              {filteredBrands.map((brand) => (
                <tr
                  key={brand.id}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {/* BRAND */}
                  <td className="whitespace-nowrap px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex h-14 w-14 items-center justify-center
                          rounded-xl border border-gray-200 bg-white p-2
                        "
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {brand.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          ID: #{brand.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* WEBSITE */}
                  <td className="px-6 py-5">
                    <a
                      href={brand.website}
                      target="_blank"
                      className="
                        flex items-center gap-2
                        text-sm font-medium text-blue-600
                        hover:underline
                      "
                    >
                      <Globe className="h-4 w-4" />

                      Visit
                    </a>
                  </td>

                  {/* PRODUCTS */}
                  <td className="px-6 py-5">
                    <span
                      className="
                        rounded-full
                        bg-blue-100
                        px-3 py-1
                        text-xs font-semibold text-blue-600
                      "
                    >
                      {brand.totalProducts} products
                    </span>
                  </td>

                  {/* NOTE */}
                  <td className="max-w-[250px] px-6 py-5 text-sm text-gray-600">
                    {brand.note}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
                    <span
                      className={`
                        rounded-full
                        px-3 py-1
                        text-xs font-semibold

                        ${
                          brand.deleted
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }
                      `}
                    >
                      {brand.deleted
                        ? "Deleted"
                        : "Active"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {/* EDIT */}
                      <button
                        className="
                          rounded-lg
                          p-2
                          text-blue-600
                          transition
                          hover:bg-blue-50
                        "
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      {/* SOFT DELETE */}
                      <button
                        onClick={() =>
                          handleSoftDelete(
                            brand.id
                          )
                        }
                        className={`
                          rounded-lg
                          p-2
                          transition

                          ${
                            brand.deleted
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                          }
                        `}
                      >
                        {brand.deleted ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {filteredBrands.length === 0 && (
          <div className="py-16 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-300" />

            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No brands found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing filters or adding a new brand
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
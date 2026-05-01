"use client";

import { useMemo, useState, useEffect } from "react";
import Card from "../../../components/card/Card";
import Select from "../../../components/select/Select";
import { ProductService } from "../../../service/admin/ProductService";
import { CategoryService, CategoryResponse } from "../../../service/admin/CategoryService";
import {
  ProductResponse,
  SupplierResponse,
  ProductStatus,
  productStatusLabels,
} from "../../../types/index";
import { brandService, BrandResponse } from "../../../service/admin/BrandService";
import { SupplierService } from "../../../service/admin/SupplierService";
import AddProductForm from "../../../components/layout/admin/product/AddProductForm";

import {
  Package,
  Search,
} from "lucide-react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

// ======================================
// MAIN PAGE
// ======================================

export default function AdminProductsPage() {
  // ======================================
  // STATES
  // ======================================
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Category, Brand, Supplier
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [brands, setBrands] = useState<BrandResponse[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierResponse[]>([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortField, setSortField] = useState<"name" | "price" | "quantity">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(null);

  // ======================================
  // EFFECTS
  // ======================================
  useEffect(() => {
    loadProducts();
    loadCategories();
    loadBrands();
    loadSuppliers();
  }, []);

  // ======================================
  // API CALLS
  // ======================================
  const loadProducts = async (pageNumber = 0) => {
    try {
      setLoading(true);
      const res = await ProductService.getAll(pageNumber, size);
      setProducts(res.content || []);
      setPage(res.number);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements || 0);
    } catch (error) {
      console.error(error);
      alert("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await CategoryService.getAll();
      setCategories(res);
    } catch (error) {
      console.error("Cannot load categories", error);
    }
  };

  const loadBrands = async () => {
    try {
      const res = await brandService.getAll();
      setBrands(res);
    } catch (error) {
      console.error("Cannot load brands", error);
    }
  };

  const loadSuppliers = async () => {
    try {
      const res = await SupplierService.getAll();
      setSuppliers(res);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================================
  // FILTER PRODUCTS
  // ======================================
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchSearch =
        product.modelName?.toLowerCase().includes(search.toLowerCase()) ||
        product.brandName?.toLowerCase().includes(search.toLowerCase()) ||
        product.modelNumber?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "all" ||
        product.categoryName === categories.find((c) => c.id === Number(category))?.name;

      const matchStatus = status === "all" || product.productStatus === status;

      return matchSearch && matchCategory && matchStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? (a.modelName || "").localeCompare(b.modelName || "")
          : (b.modelName || "").localeCompare(a.modelName || "");
      }
      if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortField === "quantity") {
        return sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity;
      }
      return 0;
    });

    return filtered;
  }, [products, search, category, status, sortField, sortOrder, categories]);

  // ======================================
  // STATS
  // ======================================
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.quantity < 20).length;
  const outOfStock = products.filter((p) => p.productStatus === "OUT_OF_STOCK").length;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleEdit = (product: ProductResponse) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!confirmDelete) return;

    try {
      await ProductService.softDelete(id);
      await loadProducts();
      alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.error(error);
      alert("Không thể xóa sản phẩm");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleSuccess = () => {
    loadProducts();
  };

  // ======================================
  // RENDER
  // ======================================
  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý sản phẩm và tồn kho cửa hàng
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <MdAdd className="text-lg" />
          Thêm sản phẩm
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card extra="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalProducts}</p>
            </div>
          </div>
        </Card>

        <Card extra="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sắp hết hàng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowStock}</p>
            </div>
          </div>
        </Card>

        <Card extra="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hết hàng</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{outOfStock}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* FILTERS */}
      <Card extra="mb-6 p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* SEARCH */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-500 dark:border-white/10 dark:bg-navy-800 dark:text-white"
            />
          </div>

          {/* CATEGORY FILTER */}
          <Select
            value={category}
            onChange={(value) => setCategory(String(value))}
            options={[
              { label: "Tất cả danh mục", value: "all" },
              ...categories.map((c) => ({ label: c.name, value: String(c.id) })),
            ]}
          />

          {/* STATUS FILTER */}
          <Select
            value={status}
            onChange={(value) => setStatus(String(value))}
            options={[
              { label: "Tất cả trạng thái", value: "all" },
              ...Object.entries(productStatusLabels).map(([key, label]) => ({
                label,
                value: key,
              })),
            ]}
          />

          {/* SORT */}
          <Select
            value={sortField}
            onChange={(value) => setSortField(value as "name" | "price" | "quantity")}
            options={[
              { label: "Sắp xếp theo tên", value: "name" },
              { label: "Sắp xếp theo giá", value: "price" },
              { label: "Sắp xếp theo số lượng", value: "quantity" },
            ]}
          />
        </div>
      </Card>

      {/* TABLE */}
      <Card extra="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-navy-900">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">ID</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Ảnh</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Tên sản phẩm</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Danh mục</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Thương hiệu</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Giá</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Tồn kho</th>
                <th className="px-3 py-4 text-left text-sm font-bold text-gray-600 dark:text-gray-300">Trạng thái</th>
                <th className="px-3 py-4 text-center text-sm font-bold text-gray-600 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="px-3 py-4">
                    <p className="text-sm text-gray-500">#{product.id}</p>
                  </td>
                  <td className="px-3 py-4">
                    <img
                      src={product.thumbnail || "/placeholder.png"}
                      alt={product.modelName}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-3 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.modelName}</p>
                      <p className="text-xs text-gray-500">{product.modelNumber}</p>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-300">{product.categoryName}</td>
                  <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-300">{product.brandName}</td>
                  <td className="px-3 py-4 text-sm font-semibold text-navy-700 dark:text-white">
                    {product.price?.toLocaleString("vi-VN")}đ
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.quantity < 20
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.productStatus === "OUT_OF_STOCK"
                          ? "bg-red-100 text-red-600"
                          : product.productStatus === "NEW"
                          ? "bg-blue-100 text-blue-600"
                          : product.productStatus === "HOT"
                          ? "bg-orange-100 text-orange-600"
                          : product.productStatus === "SALE"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {productStatusLabels[product.productStatus as ProductStatus]}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg bg-yellow-400 p-2 text-white transition hover:opacity-80"
                      >
                        <MdEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-red-500 p-2 text-white transition hover:opacity-80"
                      >
                        <MdDelete className="text-lg" />
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
            <h3 className="mt-4 text-lg font-semibold text-gray-700">Không tìm thấy sản phẩm</h3>
            <p className="mt-2 text-sm text-gray-500">Thử thay đổi bộ lọc tìm kiếm</p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị {products.length > 0 ? (page) * size + 1 : 0} - {(page) * size + products.length} trên {totalElements} sản phẩm
              </span>
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(0);
                  loadProducts(0);
                }}
                className="rounded-lg border border-gray-300 px-2 py-1 text-sm dark:border-white/10 dark:bg-navy-800 dark:text-white"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newPage = Math.max(0, page - 1);
                  setPage(newPage);
                  loadProducts(newPage);
                }}
                disabled={page === 0}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Trước
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i;
                  } else if (page <= 2) {
                    pageNum = i;
                  } else if (page >= totalPages - 3) {
                    pageNum = totalPages - 5 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setPage(pageNum);
                        loadProducts(pageNum);
                      }}
                      className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium ${
                        page === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  const newPage = Math.min(totalPages - 1, page + 1);
                  setPage(newPage);
                  loadProducts(newPage);
                }}
                disabled={page >= totalPages - 1}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/10 dark:text-white dark:hover:bg-white/10"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* MODAL */}
      <AddProductForm
        isOpen={openModal}
        initialProduct={editingProduct}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
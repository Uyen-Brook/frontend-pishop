import { useMemo, useState, useEffect } from "react";
import Card from "../../../components/card/Card";
import InputField from "../../../components/field/InputField";
import Select from "../../../components/select/Select";
import { OrderService, OrderResponse } from "../../../service/admin/OrderService";
import {
  OrderStatus, OrderStatusLabel, PaymentMethod, PaymentMethodLabel,
  PayStatus,
  PayStatusLabel,
} from "../../../types/index";
import { Search, Package, Truck, CheckCircle, XCircle, Clock, MapPin, Phone, User, CreditCard, Calendar, ChevronLeft, ChevronRight, Eye, Trash2, RefreshCw, Filter } from "lucide-react";

/* ================= FLOW - GHN Style ================= */
const nextStatusOptions = (status: OrderStatus): OrderStatus[] => {
  switch (status) {
    case "PENDING":
      return ["PAID", "CANCELLED"];
    case "CONFIRMATION":
      return ["CONFIRMED", "CANCELLED"];
    case "PAID":
      return ["CONFIRMED", "CANCELLED"];

    case "CONFIRMED":
      return ["SHIPPING"];

    case "SHIPPING":
      return ["DELIVERED"];

    default:
      return [];
  }
};
const timelineFlow: OrderStatus[] = [
  "PENDING",
  "CONFIRMATION",
  "PAID",
  "CONFIRMED",
  "SHIPPING",
  "DELIVERED",
];
const orderStatusConfig: Record<OrderStatus, { color: string; bg: string; icon: React.ElementType }> = {
  PENDING: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Clock },
  CONFIRMATION: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Clock },
  PAID: { color: "text-blue-600", bg: "bg-blue-100", icon: CreditCard },
  CONFIRMED: { color: "text-indigo-600", bg: "bg-indigo-100", icon: Package },
  SHIPPING: { color: "text-orange-600", bg: "bg-orange-100", icon: Truck },
  DELIVERED: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  CANCELLED: { color: "text-red-600", bg: "bg-red-100", icon: XCircle },
};

/* ================= PAGE ================= */
export default function OrderPage() {
  // Data states
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Modal states
  const [selected, setSelected] = useState<OrderResponse | null>(null);
  const [updateStatus, setUpdateStatus] = useState<OrderStatus | "">("");
  const [cancelReason, setCancelReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  // API calls
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await OrderService.getAll();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {
        keyword: search || undefined,
        status: status === "ALL" ? undefined : status,
      };
      const data = await OrderService.search(params);
      setOrders(data || []);
      setPage(0);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Tìm kiếm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selected || !updateStatus) return;

    try {
      setIsUpdating(true);
      await OrderService.changeStatus(selected.id, updateStatus);

      // Update local state
      setOrders(prev => prev.map(o =>
        o.id === selected.id ? { ...o, orderStatus: updateStatus } : o
      ));

      setSelected(prev => prev ? { ...prev, orderStatus: updateStatus } : null);
      setUpdateStatus("");
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Cập nhật thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!selected) return;

    if (!cancelReason.trim()) {
      alert("Vui lòng nhập lý do hủy đơn");
      return;
    }

    try {
      setIsUpdating(true);
      await OrderService.cancel(selected.id);

      // Update local state
      // setOrders(prev => prev.map(o => 
      //   o.id === selected.id ? { ...o, orderStatus: OrderStatusLabel } : o
      // ));

      setSelected(prev => prev ? { ...prev, orderStatus: "CANCELLED" } : null);
      setCancelReason("");
      alert("Đã hủy đơn hàng thành công!");
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Hủy đơn thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;

    try {
      await OrderService.delete(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      alert("Xóa đơn hàng thành công!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Xóa đơn hàng thất bại");
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setFromDate("");
    setToDate("");
    loadOrders();
  };

  /* FILTER */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !search ||
        (o.toName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
        (o.toPhone?.includes(search) ?? false) ||
        String(o.id).includes(search);

      const matchStatus =
        status === "ALL" ? true : o.orderStatus === status;

      const matchDate =
        (!fromDate || (o.createAt && new Date(o.createAt) >= new Date(fromDate))) &&
        (!toDate || (o.createAt && new Date(o.createAt) <= new Date(toDate)));

      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, search, status, fromDate, toDate]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const start = page * size;
    return filteredOrders.slice(start, start + size);
  }, [filteredOrders, page, size]);

  const totalPages = Math.ceil(filteredOrders.length / size);



  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "0 ₫";
    return amount.toLocaleString("vi-VN") + " ₫";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Package className="w-6 h-6" />
            Quản lý đơn hàng
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng số: <span className="font-semibold">{filteredOrders.length}</span> đơn hàng
          </p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Làm mới
        </button>
      </div>

      <Card extra="p-4 space-y-4">
        {/* FILTER BAR */}
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <InputField
              id="search"
              label="Tìm kiếm"
              placeholder="ID, tên khách, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              extra=""
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>

          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            Tìm kiếm
          </button>

          <button
            onClick={handleResetFilters}
            className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Đặt lại
          </button>
        </div>

        {/* ADVANCED FILTERS */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl">



            <div className="flex flex-col gap-2 rounded-xl">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                Trạng thái đơn hàng
              </label>

              <Select
                value={status}
                onChange={(v) => setStatus(v as OrderStatus | "ALL")}
                placeholder="-- Trạng thái --"
                options={[
                  { value: "ALL", label: "Tất cả trạng thái" },

                  ...Object.entries(OrderStatusLabel).map(([key, label]) => ({
                    value: key,
                    label,
                  })),
                ]}
              />
            </div>




            <InputField
              id="from"
              label="Từ ngày"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              extra=""
            />

            <InputField
              id="to"
              label="Đến ngày"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              extra=""
            />
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Mã đơn</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Khách hàng</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Liên hệ</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Tổng tiền</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Thanh toán</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Ngày tạo</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {paginatedOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                        Không tìm thấy đơn hàng nào
                      </td>
                    </tr>
                  ) : (
                    paginatedOrders.map((o) => {
                      const statusConfig = o.orderStatus ? orderStatusConfig[o.orderStatus] : null;
                      const StatusIcon = statusConfig?.icon || Clock;

                      return (
                        <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="px-4 py-3 font-medium">#{o.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium">{o.toName || "-"}</div>
                            <div className="text-xs text-gray-500">{o.provinceName}</div>
                          </td>
                          <td className="px-4 py-3">{o.toPhone || "-"}</td>
                          <td className="px-4 py-3 font-medium text-indigo-600">
                            {formatCurrency(o.totalAmount)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-xs">
                              <span className="font-medium">{o.paymentMethod ? PaymentMethodLabel[o.paymentMethod as keyof typeof PaymentMethodLabel] || o.paymentMethod : "-"}</span>
                              <div className={`text-xs ${o.payStatus === "PAID" ? "text-green-600" : "text-orange-600"}`}>
                                {o.payStatus ? PayStatusLabel[o.payStatus] || o.payStatus : "-"}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {statusConfig && (
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                                <StatusIcon className="w-3 h-3" />
                                {o.orderStatus ? OrderStatusLabel[o.orderStatus] : "-"}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-500">{formatDate(o.createAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelected(o);
                                  setUpdateStatus(o.orderStatus || "");
                                  setCancelReason("");
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Xem chi tiết"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(o.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Xóa đơn hàng"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-500">
                  Hiển thị {page * size + 1} - {Math.min((page + 1) * size, filteredOrders.length)} / {filteredOrders.length}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 bg-indigo-600 text-white rounded-lg">
                    {page + 1}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={page >= totalPages - 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            {/* MODAL HEADER */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Chi tiết đơn hàng #{selected.id}
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* TIMELINE - GHN STYLE */}
              <OrderTimeline status={selected.orderStatus} />

              {/* INFO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Thông tin khách hàng
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-2 text-sm">
                    <p><span className="text-gray-500">Tên:</span> <span className="font-medium">{selected.toName || "-"}</span></p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selected.toPhone || "-"}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>{selected.toAddress || "-"}, {selected.wardName || "-"}, {selected.provinceName || "-"}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Thông tin thanh toán
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-2 text-sm">
                    <p><span className="text-gray-500">Phương thức:</span> <span className="font-medium">{selected.paymentMethod ? PaymentMethodLabel[selected.paymentMethod as keyof typeof PaymentMethodLabel] || selected.paymentMethod : "-"}</span></p>
                    <p><span className="text-gray-500">Trạng thái:</span> <span className={`font-medium ${selected.payStatus === "PAID" ? "text-green-600" : "text-orange-600"}`}>{selected.payStatus ? PayStatusLabel[selected.payStatus] || selected.payStatus : "-"}</span></p>
                    <p><span className="text-gray-500">Phí ship:</span> <span className="font-medium">{formatCurrency(selected.shipFee)}</span></p>
                    <p><span className="text-gray-500">Giảm giá:</span> <span className="font-medium text-red-600">-{formatCurrency(selected.discountAmount)}</span></p>
                    <p className="pt-2 border-t">
                      <span className="text-gray-500">Tổng tiền:</span> <span className="font-bold text-lg text-indigo-600">{formatCurrency(selected.totalAmount)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Sản phẩm trong đơn ({selected.items?.length || 0})
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left">Sản phẩm</th>
                        <th className="px-4 py-2 text-right">Đơn giá</th>
                        <th className="px-4 py-2 text-center">Số lượng</th>
                        <th className="px-4 py-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selected.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product?.thumbnail || "https://via.placeholder.com/50"}
                                alt={item.product?.modelName}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <div className="font-medium">{item.product?.modelName || "-"}</div>
                                <div className="text-xs text-gray-500">
                                  {item.product?.brandName} - {item.product?.categoryName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className={item.discountPrice && item.discountPrice < (item.price || 0) ? "line-through text-gray-400" : ""}>
                              {formatCurrency(item.price)}
                            </div>
                            {item.discountPrice && item.discountPrice < (item.price || 0) && (
                              <div className="text-red-600 font-medium">{formatCurrency(item.discountPrice)}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">x{item.quantity}</td>
                          <td className="px-4 py-3 text-right font-medium">
                            {formatCurrency((item.discountPrice || item.price || 0) * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* UPDATE STATUS */}
              {selected.orderStatus !== "DELIVERED" && selected.orderStatus !== "CANCELLED" && (
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Cập nhật trạng thái
                  </h3>

                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Select
                        value={updateStatus}
                        onChange={(v) => setUpdateStatus(v as OrderStatus)}
                        placeholder="-- Chọn trạng thái mới --"
                        options={nextStatusOptions(selected.orderStatus || "PENDING").map((s) => ({
                          value: s,
                          label: OrderStatusLabel[s],
                        }))}
                      />
                    </div>
                    <button
                      onClick={handleUpdateStatus}
                      disabled={!updateStatus || isUpdating}
                      className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                  </div>

                  {/* CANCEL REASON */}
                  <div className="pt-2">
                    <label className="text-sm text-gray-600">Lý do hủy đơn (nếu muốn hủy):</label>
                    <textarea
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none"
                      rows={2}
                      placeholder="Nhập lý do hủy đơn hàng..."
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    <button
                      onClick={handleCancelOrder}
                      disabled={!cancelReason.trim() || isUpdating}
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isUpdating ? "Đang hủy..." : "Hủy đơn hàng"}
                    </button>
                  </div>
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= TIMELINE - GHN STYLE ================= */
function OrderTimeline({ status }: { status?: OrderStatus }) {
  // Define order flow inside component to access OrderStatus

  const timelineStatusConfig: Record<OrderStatus, { color: string; bg: string; icon: React.ElementType }> = {
    PENDING: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Clock },
    CONFIRMATION: { color: "text-yellow-600", bg: "bg-yellow-100", icon: Clock },
    PAID: { color: "text-blue-600", bg: "bg-blue-100", icon: CreditCard },
    CONFIRMED: { color: "text-indigo-600", bg: "bg-indigo-100", icon: Package },
    SHIPPING: { color: "text-orange-600", bg: "bg-orange-100", icon: Truck },
    DELIVERED: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
    CANCELLED: { color: "text-red-600", bg: "bg-red-100", icon: XCircle },
  };

  const currentIndex = status ? timelineFlow.indexOf(status) : -1;
  const isCancelled = status === "CANCELLED";

  return (
    <div className="py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
        {!isCancelled && currentIndex >= 0 && (
          <div
            className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex / (timelineFlow.length - 1)) * 100}%` }}
          />
        )}

        {/* Steps */}
        <div className="relative flex justify-between w-full">
          {timelineFlow.map((s: OrderStatus, i: number) => {
            const isActive = i <= currentIndex;
            const isCurrent = i === currentIndex;
            const StatusIcon = timelineStatusConfig[s].icon;

            return (
              <div key={s} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive
                    ? "bg-green-500 border-green-500 text-white"
                    : isCurrent
                      ? "bg-white border-green-500 text-green-500"
                      : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  <StatusIcon className="w-5 h-5" />
                </div>
                <span className={`mt-2 text-xs font-medium text-center max-w-[80px] ${isActive ? "text-gray-800" : "text-gray-400"}`}>
                  {OrderStatusLabel[s]}
                </span>
                {isCurrent && (
                  <span className="mt-1 text-xs text-green-600 font-medium">Hiện tại</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancelled status message */}
      {isCancelled && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-center text-sm">
          <XCircle className="w-5 h-5 inline-block mr-2" />
          Đơn hàng đã bị hủy
        </div>
      )}
    </div>
  );
}
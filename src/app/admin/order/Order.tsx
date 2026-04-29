import { useState, useMemo } from "react";

type PaymentStatus = "PAID" | "COD_PENDING" | "REFUNDED" | "PENDING";
type OrderStatus = "DELIVERING" | "WAITING_PICKUP" | "DELIVERED" | "CANCELLED" | "PICKING";
type ShippingPartner = "GHN Express" | "GHTK Fast" | "Ninja Van" | "None" | "ViettelPost";

interface Order {
  id: string;
  date: string;
  customer: {
    name: string;
    phone: string;
  };
  product: {
    name: string;
    qty: number;
    image: string;
  };
  totalPrice: number;
  payment: PaymentStatus;
  shippingPartner: ShippingPartner;
  status: OrderStatus;
}

const MOCK_ORDERS: Order[] = [
  { id: "TP-20934", date: "Oct 24, 2023 · 14:30", customer: { name: "Le Minh Hoang", phone: "+84 902 345 678" }, product: { name: "Nike Air Zoom Pegasus", qty: 1, image: "👟" }, totalPrice: 120, payment: "PAID", shippingPartner: "GHN Express", status: "DELIVERING" },
  { id: "TP-20935", date: "Oct 24, 2023 · 15:10", customer: { name: "Nguyen Thi Lan", phone: "+84 938 112 233" }, product: { name: "SmartWatch Series 8", qty: 1, image: "⌚" }, totalPrice: 399, payment: "COD_PENDING", shippingPartner: "GHTK Fast", status: "WAITING_PICKUP" },
  { id: "TP-20936", date: "Oct 23, 2023 · 09:15", customer: { name: "David Pham", phone: "+84 987 654 321" }, product: { name: "Wireless Noise Cancelling", qty: 2, image: "🎧" }, totalPrice: 540, payment: "PAID", shippingPartner: "Ninja Van", status: "DELIVERED" },
  { id: "TP-20937", date: "Oct 23, 2023 · 08:20", customer: { name: "Tran Van Tu", phone: "+84 911 223 344" }, product: { name: "Athletic Tech Shorts", qty: 3, image: "👕" }, totalPrice: 75, payment: "REFUNDED", shippingPartner: "None", status: "CANCELLED" },
  { id: "TP-20938", date: "Oct 22, 2023 · 11:45", customer: { name: "Mai Thi Hoa", phone: "+84 903 456 789" }, product: { name: "Laptop Stand Pro", qty: 1, image: "💻" }, totalPrice: 89, payment: "PAID", shippingPartner: "GHN Express", status: "DELIVERED" },
  { id: "TP-20939", date: "Oct 22, 2023 · 13:00", customer: { name: "Nguyen Van Binh", phone: "+84 912 345 678" }, product: { name: "Mechanical Keyboard", qty: 1, image: "⌨️" }, totalPrice: 220, payment: "PAID", shippingPartner: "ViettelPost", status: "PICKING" },
  { id: "TP-20940", date: "Oct 22, 2023 · 16:30", customer: { name: "Le Thi Thu", phone: "+84 908 765 432" }, product: { name: "USB-C Hub 7-in-1", qty: 2, image: "🔌" }, totalPrice: 118, payment: "COD_PENDING", shippingPartner: "GHTK Fast", status: "WAITING_PICKUP" },
  { id: "TP-20941", date: "Oct 21, 2023 · 10:20", customer: { name: "Pham Duc Anh", phone: "+84 934 567 890" }, product: { name: "Gaming Mouse G Pro", qty: 1, image: "🖱️" }, totalPrice: 165, payment: "PAID", shippingPartner: "Ninja Van", status: "DELIVERING" },
  { id: "TP-20942", date: "Oct 21, 2023 · 14:55", customer: { name: "Hoang Thi Minh", phone: "+84 971 234 567" }, product: { name: "Portable SSD 1TB", qty: 1, image: "💾" }, totalPrice: 130, payment: "PAID", shippingPartner: "GHN Express", status: "DELIVERED" },
  { id: "TP-20943", date: "Oct 20, 2023 · 09:00", customer: { name: "Vu Thi Linh", phone: "+84 916 789 012" }, product: { name: "Webcam HD 1080p", qty: 1, image: "📷" }, totalPrice: 65, payment: "REFUNDED", shippingPartner: "None", status: "CANCELLED" },
];

const STATUS_TABS = [
  { label: "All Orders", key: "ALL", count: 2450 },
  { label: "Waiting for Pickup", key: "WAITING_PICKUP", count: 124 },
  { label: "Picking", key: "PICKING", count: 42 },
  { label: "Delivering", key: "DELIVERING", count: 385 },
  { label: "Delivered", key: "DELIVERED", count: 1850 },
  { label: "Cancelled", key: "CANCELLED", count: 34 },
  { label: "Returned", key: "RETURNED", count: 15 },
] as const;

const PAYMENT_LABEL: Record<PaymentStatus, { label: string; bg: string; color: string }> = {
  PAID: { label: "PAID", bg: "#e6f9f0", color: "#0f6e56" },
  COD_PENDING: { label: "COD (PENDING)", bg: "#fdf3e3", color: "#854f0b" },
  REFUNDED: { label: "REFUNDED", bg: "#f1efef", color: "#5f5e5a" },
  PENDING: { label: "PENDING", bg: "#e6f1fb", color: "#185fa5" },
};

const STATUS_LABEL: Record<OrderStatus, { label: string; bg: string; color: string }> = {
  DELIVERING: { label: "DELIVERING", bg: "#e6f1fb", color: "#185fa5" },
  WAITING_PICKUP: { label: "WAITING PICKUP", bg: "#faeeda", color: "#854f0b" },
  DELIVERED: { label: "DELIVERED", bg: "#e6f9f0", color: "#0f6e56" },
  CANCELLED: { label: "CANCELLED", bg: "#fbeaf0", color: "#993556" },
  PICKING: { label: "PICKING", bg: "#eeedfe", color: "#534ab7" },
};

const PARTNER_ICON: Record<ShippingPartner, string> = {
  "GHN Express": "🚚",
  "GHTK Fast": "⚡",
  "Ninja Van": "🥷",
  "ViettelPost": "📮",
  "None": "✖",
};

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shippingFilter, setShippingFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      const matchTab = activeTab === "ALL" || o.status === activeTab;
      const matchSearch =
        !searchQuery ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.phone.includes(searchQuery);
      const matchShipping = shippingFilter === "ALL" || o.shippingPartner === shippingFilter;
      const matchPayment = paymentFilter === "ALL" || o.payment === paymentFilter;
      return matchTab && matchSearch && matchShipping && matchPayment;
    });
  }, [activeTab, searchQuery, shippingFilter, paymentFilter]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === filteredOrders.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredOrders.map((o) => o.id)));
    }
  };

  const totalRevenue = 12450;
  const avgDelivery = 1.2;
  const successRate = 98.4;
  const activeShipments = 527;

  return (
    <div className="min-h-screen bg-[#f8f7f4] font-['DM_Sans','Segoe_UI',sans-serif]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e3dd] px-6 py-3 flex items-center justify-between">
        <div className="flex-1 max-w-[480px]">
          <div className="flex items-center gap-2 bg-[#f8f7f4] border border-[#d3d1c7] rounded-lg px-3.5 py-2">
            <span className="text-sm text-[#888780]">🔍</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for order ID, customer name, phone number..."
              className="border-none outline-none bg-transparent text-sm text-[#2c2c2a] flex-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl cursor-pointer">🔔</span>
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-sm font-medium text-[#2c2c2a]">Alex Nguyen</div>
              <div className="text-xs text-[#888780]">Logistics Admin</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e85d2f] to-[#f5a623] flex items-center justify-center text-white font-semibold text-sm">AN</div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-6">
        {/* Title row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-[#e85d2f] mb-1">Order Management</h1>
            <p className="text-sm text-[#888780]">Monitor and manage all customer orders across your logistics network.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#d3d1c7] rounded-lg text-sm font-medium text-[#444441] cursor-pointer hover:bg-gray-50">
              ⬇ Export Excel
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-[#e85d2f] border-none rounded-lg text-sm font-medium text-white cursor-pointer hover:bg-orange-600">
              + Create New Order
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-0 border-b border-[#d3d1c7] mb-5">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
              className={`px-4 py-2.5 border-b-2 cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-[#e85d2f] text-[#e85d2f]"
                  : "border-transparent text-[#888780] hover:text-[#444441]"
              }`}
            >
              {tab.label} ({tab.count.toLocaleString()})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#e5e3dd] rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 border border-[#d3d1c7] rounded-lg text-sm text-[#444441] bg-[#f8f7f4]">
              📅 Oct 20, 2023 – Oct 27, 2023
            </div>
            <select
              value={shippingFilter}
              onChange={(e) => setShippingFilter(e.target.value)}
              className="px-3.5 py-2 border border-[#d3d1c7] rounded-lg text-sm text-[#444441] bg-[#f8f7f4] cursor-pointer"
            >
              <option value="ALL">🚚 All Shipping Partners</option>
              <option value="GHN Express">GHN Express</option>
              <option value="GHTK Fast">GHTK Fast</option>
              <option value="Ninja Van">Ninja Van</option>
              <option value="ViettelPost">ViettelPost</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3.5 py-2 border border-[#d3d1c7] rounded-lg text-sm text-[#444441] bg-[#f8f7f4] cursor-pointer"
            >
              <option value="ALL">💳 Payment Status</option>
              <option value="PAID">Paid</option>
              <option value="COD_PENDING">COD Pending</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            <div className="ml-auto flex gap-2">
              <span className="text-xs text-[#888780] self-center">BATCH ACTIONS:</span>
              <button className="px-3.5 py-1.5 border-1.5 border-[#e85d2f] rounded-lg bg-transparent text-xs text-[#e85d2f] font-medium cursor-pointer hover:bg-orange-50">Print Labels</button>
              <button className="px-3.5 py-1.5 border-1.5 border-[#e85d2f] rounded-lg bg-transparent text-xs text-[#e85d2f] font-medium cursor-pointer hover:bg-orange-50">Confirm Pickup</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e3dd] rounded-xl overflow-hidden mb-6">
          <table className="w-full border-collapse table-fixed">
            <colgroup>
              <col className="w-10" />
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-48" />
              <col className="w-24" />
              <col className="w-24" />
              <col className="w-28" />
              <col className="w-32" />
              <col className="w-20" />
            </colgroup>
            <thead>
              <tr className="border-b border-[#e5e3dd]">
                <th className="p-3 text-left">
                  <input type="checkbox" checked={selectedRows.size === filteredOrders.length && filteredOrders.length > 0} onChange={toggleAll} />
                </th>
                {["ORDER ID", "CUSTOMER", "PRODUCT", "TOTAL PRICE", "PAYMENT", "SHIPPING PARTNER", "STATUS", "ACTIONS"].map((h) => (
                  <th key={h} className="p-3 text-left text-xs font-semibold text-[#888780] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => {
                const payment = PAYMENT_LABEL[order.payment];
                const status = STATUS_LABEL[order.status];
                const isSelected = selectedRows.has(order.id);
                return (
                  <tr
                    key={order.id}
                    className={`border-b border-[#f1efe9] ${isSelected ? "bg-[#fef9f7]" : i % 2 === 0 ? "bg-white" : "bg-[#fafaf8]"}`}
                  >
                    <td className="p-4">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleRow(order.id)} />
                    </td>
                    <td className="p-2">
                      <div className="text-sm font-semibold text-[#e85d2f]">#{order.id}</div>
                      <div className="text-xs text-[#b4b2a9] mt-0.5">{order.date}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-sm font-medium text-[#2c2c2a]">{order.customer.name}</div>
                      <div className="text-xs text-[#888780] mt-0.5">{order.customer.phone}</div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-[#f1efe9] flex items-center justify-center text-lg flex-shrink-0">{order.product.image}</div>
                        <div>
                          <div className="text-xs text-[#2c2c2a] truncate max-w-[130px]">{order.product.name}</div>
                          <div className="text-xs text-[#888780]">Qty: {String(order.product.qty).padStart(2, "0")}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`text-sm font-semibold ${order.status === "CANCELLED" ? "text-[#888780] line-through" : "text-[#2c2c2a]"}`}>
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className="inline-block px-2 py-1 rounded-md text-xs font-semibold" style={{ background: payment.bg, color: payment.color }}>
                        {payment.label}
                      </span>
                    </td>
                    <td className="p-2">
                      {order.shippingPartner !== "None" ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{PARTNER_ICON[order.shippingPartner]}</span>
                          <span className="text-xs text-[#444441]">{order.shippingPartner}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#b4b2a9]">— None</span>
                      )}
                    </td>
                    <td className="p-2">
                      <span className="inline-block px-2 py-1 rounded-md text-[10px] font-bold tracking-wider" style={{ background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2 text-[#888780] ">
                        <span className="cursor-pointer" title="View">👁</span>
                        <span className="cursor-pointer" title="Print">🖨</span>
                        {order.status === "CANCELLED" ? (
                          <span className="cursor-pointer" title="Restore">↩</span>
                        ) : (
                          <span className="cursor-pointer" title="Edit">✏️</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-sm text-[#888780]">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#e5e3dd]">
            <span className="text-[#888780]">Showing 1 to {Math.min(10, filteredOrders.length)} of 2,450 orders</span>
            <div className="flex gap-1">
              {["‹", "1", "2", "3", "...", "245", "›"].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof p === "string" && !isNaN(Number(p)) && setCurrentPage(Number(p))}
                  className={`w-8 h-8 border border-[#d3d1c7] rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                    (p === "1" && currentPage === 1)
                      ? "bg-[#e85d2f] text-white"
                      : "bg-white text-[#444441] hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-4 pb-8">
          {[
            { label: "TOTAL REVENUE TODAY", value: `$${totalRevenue.toLocaleString()}`, sub: "↑12%", subColor: "#0f6e56" },
            { label: "AVG. DELIVERY TIME", value: `${avgDelivery} Days`, sub: "↓0.4d", subColor: "#0f6e56" },
            { label: "SUCCESS RATE", value: `${successRate}%`, sub: "↗0.8%", subColor: "#e85d2f" },
            { label: "ACTIVE SHIPMENTS", value: activeShipments.toString(), sub: "Live tracking", subColor: "#888780" },
          ].map((card) => (
            <div key={card.label} className="bg-white border border-[#e5e3dd] rounded-xl p-4">
              <div className="text-[10px] font-bold text-[#b4b2a9] uppercase tracking-wider mb-2">{card.label}</div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-[#2c2c2a]">{card.value}</span>
                <span className="text-xs font-medium" style={{ color: card.subColor }}>{card.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
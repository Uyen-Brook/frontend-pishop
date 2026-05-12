import Card from "../../../components/card/Card";
import InputField from "../../../components/field/InputField";
import Label from "../../../components/field/LabelField";
import SwitchField from "../../../components/field/SwichField";
import StatsCard from "../../../components/card/StatsCard";
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  DollarSign,
} from "lucide-react";
import MiniCalendar from "../../../components/calendar/MiniCalendar";
import { useState } from "react";
import { useOverviewData } from "../../../hooks/useDashboardData";
import RevenueChart from "../../../components/chart/RevenueChart";
import OrdersByMonthChart from "../../../components/chart/OrdersByMonthChart";
import OrdersLast7DaysChart from "../../../components/chart/OrdersLast7DaysChart";
import RevenueLast7DaysChart from "../../../components/chart/RevenueLast7DaysChart";
import RevenueByCategoryChart from "../../../components/chart/RevenueByCategoryChart";
import RevenueByBrandChart from "../../../components/chart/RevenueByBrandChart";
import RevenueBySupplierChart from "../../../components/chart/RevenueBySupplierChart";

// =========================
// MAIN PAGE
// =========================
export default function AdminDashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { data: overview } = useOverviewData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const statsData = [
    {
      id: 1,
      title: "Total Products",
      value: overview?.basicStats?.totalProducts?.toLocaleString() || "0",
      growth: "+12.5%",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Total Orders",
      value: overview?.basicStats?.totalOrders?.toLocaleString() || "0",
      growth: "+8.2%",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "Customers",
      value: overview?.basicStats?.totalAccounts?.toLocaleString() || "0",
      growth: "+18.1%",
      icon: Users,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 4,
      title: "Revenue",
      value: formatCurrency(overview?.basicStats?.totalRevenue || 0),
      growth: "+24.3%",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "New product added",
      description: "iPhone 15 Pro Max added to inventory",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Order completed",
      description: "Order #1234 has been delivered",
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "New customer registered",
      description: "Nguyen Van A created new account",
      time: "5 hours ago",
    },
    {
      id: 4,
      title: "Payment received",
      description: "Received payment for Order #5678",
      time: "7 hours ago",
    },
  ];


  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back, Admin 👋
          </p>
        </div>

        <div className="w-full md:w-[320px]">
          <InputField
            label="Search"
            id="search"
            placeholder="Search products, customers..."
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            value={item.value}
            growth={item.growth}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* REVENUE CHART */}
      <RevenueChart />

      {/* ORDERS BY MONTH CHART */}
      <OrdersByMonthChart />

      {/* LAST 7 DAYS CHARTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OrdersLast7DaysChart />
        <RevenueLast7DaysChart />
      </div>

      {/* PIE CHARTS - REVENUE BREAKDOWN */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RevenueByCategoryChart />
        <RevenueByBrandChart />
        <RevenueBySupplierChart />
      </div>


      {/* ACTIVITY + FORM */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* RECENT ACTIVITY */}
        <Card extra="p-5">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h3>

            <p className="text-sm text-gray-500">
              Latest actions from your store
            </p>
          </div>

          <div className="space-y-5">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b border-gray-100 pb-4 last:border-none"
              >
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* QUICK FORM */}
        <Card extra="p-5">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Add New Product
            </h3>

            <p className="text-sm text-gray-500">
              Quick product creation form
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <Label
                htmlFor="product-name"
                text="Product Name"
                required
              />

              <input
                id="product-name"
                type="text"
                placeholder="Enter product name"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="price"
                text="Price"
                required
              />

              <input
                id="price"
                type="number"
                placeholder="Enter product price"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                text="Description"
              />

              <textarea
                id="description"
                rows={4}
                placeholder="Write product description..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Create Product
            </button>
          </form>
        </Card>
      </div>
      <div className="space-y-4">
      <MiniCalendar
        value={selectedDate}
        onChange={setSelectedDate}
      />

      <div className="rounded-xl bg-white p-4 shadow">
        <p className="font-semibold">
          Selected Date:
        </p>

        <p className="text-gray-500">
          {selectedDate?.toDateString()}
        </p>
      </div>
    </div>
    </div>
  );
}


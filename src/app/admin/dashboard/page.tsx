import Card from "../../../components/card/Card";
import LineChart from "../../../components/chart/LineChart";
import InputField from "../../../components/field/InputField";
import Label from "../../../components/field/LabelField";
import SwitchField from "../../../components/field/SwichField";
import StatsCard from "../../../components/card/StatsCard";
import {
  ShoppingBag,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import MiniCalendar from "../../../components/calendar/MiniCalendar";
import { ApexOptions } from "apexcharts";
import { useState } from "react";

// =========================
// MOCK DATA
// =========================
const statsData = [
  {
    id: 1,
    title: "Total Products",
    value: "1,234",
    growth: "+12.5%",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Total Orders",
    value: "567",
    growth: "+8.2%",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Customers",
    value: "890",
    growth: "+18.1%",
    icon: Users,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    title: "Revenue",
    value: "$12,345",
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

// =========================
// CHART DATA
// =========================
const revenueSeries = [
  {
    name: "Revenue",
    data: [1200, 1800, 1500, 2800, 2100, 3500, 4000],
  },
];

const revenueOptions: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "smooth",
    width: 4,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  grid: {
    borderColor: "#E5E7EB",
  },
  tooltip: {
    theme: "light",
  },
};

// =========================
// REUSABLE STAT CARD
// =========================
// interface StatsCardProps {
//   title: string;
//   value: string;
//   growth: string;
//   icon: React.ElementType;
//   color: string;
// }

// const StatsCard: React.FC<StatsCardProps> = ({
//   title,
//   value,
//   growth,
//   icon: Icon,
//   color,
// }) => {
//   return (
//     <Card extra="p-5">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">{title}</p>

//           <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
//             {value}
//           </h3>

//           <div className="mt-2 flex items-center gap-1 text-sm text-green-500">
//             <TrendingUp className="h-4 w-4" />
//             {growth}
//           </div>
//         </div>

//         <div className={`rounded-xl p-3 ${color}`}>
//           <Icon className="h-6 w-6" />
//         </div>
//       </div>
//     </Card>
//   );
// };

// =========================
// MAIN PAGE
// =========================
export default function AdminDashboardPage() {
   const [selectedDate, setSelectedDate] =
   useState<Date | null>(new Date());
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

      {/* CHART + SETTINGS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* CHART */}
        <Card extra="col-span-2 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Revenue Overview
              </h3>

              <p className="text-sm text-gray-500">
                Weekly revenue statistics
              </p>
            </div>

            <div className="rounded-lg bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
              +24.3%
            </div>
          </div>

          <div className="h-[350px]">
            <LineChart
              series={revenueSeries}
              options={revenueOptions}
            />
          </div>
        </Card>

        {/* SETTINGS */}
        <Card extra="p-5">
          <div className="mb-5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Settings
            </h3>

            <p className="text-sm text-gray-500">
              Manage your dashboard settings
            </p>
          </div>

          <div className="space-y-4">
            <SwitchField
              id="email"
              label="Email Notifications"
              desc="Receive email updates"
            />

            <SwitchField
              id="darkmode"
              label="Dark Mode"
              desc="Enable dark theme"
            />

            <SwitchField
              id="analytics"
              label="Analytics"
              desc="Track visitor analytics"
            />
          </div>
        </Card>
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

// ```tsx
// import Widget from "@/components/widget/Widget";

// <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
//   <Widget
//     icon={<ShoppingBag className="h-6 w-6" />}
//     title="Total Products"
//     subtitle="1,234"
//   />

//   <Widget
//     icon={<ShoppingCart className="h-6 w-6" />}
//     title="Orders"
//     subtitle="567"
//   />

//   <Widget
//     icon={<Users className="h-6 w-6" />}
//     title="Customers"
//     subtitle="890"
//   />

//   <Widget
//     icon={<DollarSign className="h-6 w-6" />}
//     title="Revenue"
//     subtitle="$12,345"
//   />
// </div>
// ```

// ---

// ### SearchInput

// Thay cho input search cũ:

// ```tsx
// const [search, setSearch] = useState("");

// <SearchInput
//   value={search}
//   onChange={setSearch}
//   placeholder="Search products..."
// />
// ```

// ---

// ### Select

// Dùng filter dữ liệu dashboard:

// ```tsx
// const [filter, setFilter] = useState("week");

// <Select
//   value={filter}
//   onChange={(value) => setFilter(String(value))}
//   options={[
//     { label: "This Week", value: "week" },
//     { label: "This Month", value: "month" },
//     { label: "This Year", value: "year" },
//   ]}
// />
// ```

// ---

// ### Radio

// Dùng chọn loại báo cáo:

// ```tsx
// <div className="flex items-center gap-4">
//   <div className="flex items-center gap-2">
//     <Radio
//       id="sales"
//       name="report"
//       defaultChecked
//     />

//     <label htmlFor="sales">Sales</label>
//   </div>

//   <div className="flex items-center gap-2">
//     <Radio
//       id="orders"
//       name="report"
//     />

//     <label htmlFor="orders">Orders</label>
//   </div>
// </div>
// ```

// ---

// ### MiniCalendar

// Dùng cho event/schedule dashboard:

// ```tsx
// <Card extra="p-5">
//   <h3 className="mb-4 text-xl font-bold">
//     Calendar
//   </h3>

//   <MiniCalendar />
// </Card>
// ```

// ---

// ### PieChart

// Thống kê category:

// ```tsx
// const pieSeries = [44, 55, 13, 33];

// const pieOptions = {
//   labels: ["Electronics", "Fashion", "Sports", "Others"],
//   legend: {
//     position: "bottom",
//   },
// };

// <div className="h-[350px]">
//   <PieChart
//     series={pieSeries}
//     options={pieOptions}
//   />
// </div>
// ```

// ---

// ### BarChart

// Thống kê đơn hàng:

// ```tsx
// const barChartData = [
//   {
//     name: "Orders",
//     data: [44, 55, 41, 67, 22, 43],
//   },
// ];

// const barChartOptions: ApexOptions = {
//   chart: {
//     toolbar: {
//       show: false,
//     },
//   },
//   xaxis: {
//     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   },
// };

// <div className="h-[350px]">
//   <BarChart
//     chartData={barChartData}
//     chartOptions={barChartOptions}
//   />
// </div>
// ```

// ---

// # Dashboard layout đề xuất nâng cấp

// ```tsx
// <div className="space-y-6">
//   <Header />

//   <Widgets />

//   <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//     <RevenueChart />
//     <QuickSettings />
//   </div>

//   <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//     <PieAnalytics />
//     <BarAnalytics />
//   </div>

//   <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//     <RecentActivity />
//     <ProductForm />
//     <CalendarSection />
//   </div>
// </div>

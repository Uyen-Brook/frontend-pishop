import LineChart from "./LineChart";
import Card from "../card/Card";
import { useOrdersData } from "../../hooks/useDashboardData";
import { ApexOptions } from "apexcharts";

interface OrdersByMonthChartProps {
  height?: string;
}

export default function OrdersByMonthChart({ height = "350px" }: OrdersByMonthChartProps) {
  const { byMonth, isLoading } = useOrdersData();

  const options: ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: byMonth.map(d => d.period),
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Đơn hàng",
      data: byMonth.map(d => d.value),
    },
  ];

  return (
    <Card extra="p-5">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Thống kê đơn hàng theo tháng
        </h3>
        <p className="text-sm text-gray-500">
          Từ trước đến nay
        </p>
      </div>
      <div style={{ height }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">Loading...</div>
        ) : (
          <LineChart series={series} options={options} />
        )}
      </div>
    </Card>
  );
}

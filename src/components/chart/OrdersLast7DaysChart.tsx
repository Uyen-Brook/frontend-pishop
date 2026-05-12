import BarChart from "./BarChart";
import Card from "../card/Card";
import { useOrdersData } from "../../hooks/useDashboardData";
import { ApexOptions } from "apexcharts";

interface OrdersLast7DaysChartProps {
  height?: string;
}

export default function OrdersLast7DaysChart({ height = "300px" }: OrdersLast7DaysChartProps) {
  const { last7Days, isLoading } = useOrdersData();

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
      categories: last7Days.map(d => d.period),
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    tooltip: {
      theme: "light",
    },
  };

  const chartData = [
    {
      name: "Đơn hàng",
      data: last7Days.map(d => d.value),
    },
  ];

  return (
    <Card extra="p-5">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Đơn hàng 7 ngày gần nhất
        </h3>
        <p className="text-sm text-gray-500">
          Số lượng đơn hàng trong 7 ngày qua
        </p>
      </div>
      <div style={{ height }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">Loading...</div>
        ) : (
          <BarChart chartData={chartData} chartOptions={options} />
        )}
      </div>
    </Card>
  );
}

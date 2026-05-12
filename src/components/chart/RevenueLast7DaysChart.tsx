import LineChart from "./LineChart";
import Card from "../card/Card";
import { useRevenueLast7Days } from "../../hooks/useDashboardData";
import { ApexOptions } from "apexcharts";

interface RevenueLast7DaysChartProps {
  height?: string;
}

export default function RevenueLast7DaysChart({ height = "300px" }: RevenueLast7DaysChartProps) {
  const { data, isLoading } = useRevenueLast7Days();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

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
      categories: data.map(d => d.period),
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => formatCurrency(value as number),
      },
    },
  };

  const series = [
    {
      name: "Doanh thu",
      data: data.map(d => d.value),
    },
  ];

  return (
    <Card extra="p-5">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Doanh thu 7 ngày gần nhất
        </h3>
        <p className="text-sm text-gray-500">
          Doanh thu trong 7 ngày qua
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

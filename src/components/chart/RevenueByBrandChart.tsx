import PieChart from "./PieChart";
import Card from "../card/Card";
import { useRevenueByBrand } from "../../hooks/useDashboardData";

interface RevenueByBrandChartProps {
  height?: string;
}

export default function RevenueByBrandChart({ height = "350px" }: RevenueByBrandChartProps) {
  const { data, isLoading } = useRevenueByBrand();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const options = {
    labels: data.map(d => d.period),
    legend: {
      position: 'bottom' as const,
    },
    tooltip: {
      y: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
  };

  const series = data.map(d => d.value);

  return (
    <Card extra="p-5">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Cơ cấu doanh thu theo nhãn hiệu
        </h3>
        <p className="text-sm text-gray-500">
          Phân bổ doanh thu theo từng nhãn hiệu
        </p>
      </div>
      <div style={{ height }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">Loading...</div>
        ) : data.length > 0 ? (
          <PieChart series={series} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Không có dữ liệu
          </div>
        )}
      </div>
    </Card>
  );
}

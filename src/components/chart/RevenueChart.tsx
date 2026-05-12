import { useState } from "react";
import LineChart from "./LineChart";
import Card from "../card/Card";
import { useRevenueData } from "../../hooks/useDashboardData";
import { ApexOptions } from "apexcharts";

interface RevenueChartProps {
  height?: string;
}

export default function RevenueChart({ height = "350px" }: RevenueChartProps) {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [year, setYear] = useState(new Date().getFullYear());
  const { data, isLoading } = useRevenueData(period, year);

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
      width: 4,
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
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Thống kê doanh thu
          </h3>
          <p className="text-sm text-gray-500">
            Doanh thu theo {period === 'month' ? 'tháng' : period === 'quarter' ? 'quý' : 'năm'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'month' | 'quarter' | 'year')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="month">Theo tháng</option>
            <option value="quarter">Theo quý</option>
            <option value="year">Theo năm</option>
          </select>
          {period !== 'year' && (
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="Năm"
            />
          )}
        </div>
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

import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface BarChartProps {
  chartData: { name: string; data: number[] }[];
  chartOptions: ApexOptions;
}

const BarChart: React.FC<BarChartProps> = ({ chartData, chartOptions }) => {
  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;

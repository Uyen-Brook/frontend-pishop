import Chart from "react-apexcharts";
import { ApexOptions, ApexAxisChartSeries } from "apexcharts";

interface LineChartProps {
  series: ApexAxisChartSeries; // kiểu dữ liệu cho series
  options: ApexOptions;        // kiểu dữ liệu cho options
}

const LineChart: React.FC<LineChartProps> = ({ series, options }) => {
  return (
    <Chart
      options={options}
      type="line"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default LineChart;

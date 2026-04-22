import Chart from "react-apexcharts";

interface PieChartProps {
  series: number[];
  options: ApexCharts.ApexOptions;
}

const PieChart: React.FC<PieChartProps> = ({ series, options }) => {
  return (
    <Chart
      options={options}
      type="pie"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default PieChart;

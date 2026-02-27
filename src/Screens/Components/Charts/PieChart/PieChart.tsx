import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const series = [65, 20, 10, 5];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Completed", "In Progress", "Pending", "Cancelled"],

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "diagonal1",
        shadeIntensity: 0.4,
        gradientToColors: [
          "#34d399",
          "#60a5fa",
          "#fbbf24",
          "#f87171",
        ],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },

    colors: ["#059669", "#2563eb", "#f59e0b", "#dc2626"],

    legend: {
      position: "bottom",
    },

    dataLabels: {
      enabled: false,
      formatter: (val:any) => `${val?.toFixed(1)}%`,
    },

    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => "100%",
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" width="350" />
    </div>
  );
};

export default PieChart;

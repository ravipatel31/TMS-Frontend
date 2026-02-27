import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const LineChart = () => {
  const series = [
    {
      name: "Logged-in Hours",
      data: [32, 45, 28, 50], // Week 1 to Week 4
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // This makes it spline
      width: 3,
    },
    markers: {
      size: 5,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      title: {
        text: "",
      },
    },
    yaxis: {
      // title: {
      //   text: "Logged-in Hours",
      // },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical", // vertical | horizontal
        gradientToColors: ["#3570FF"], // End color
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    colors: ["#3570FF"],
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} hrs`,
      },
    },
  };

  return (
    <div className="w-100">
      <Chart options={options} series={series} type="area" width={'100%'} />
    </div>
  );
};

export default LineChart;

import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ stockData }) {
  if (!stockData || !stockData.values || stockData.values.length === 0) {
    return <div></div>;
  }

  const sortedValues = [...stockData.values].sort(
    (a, b) => new Date(a.datetime) - new Date(b.datetime)
  );
  const dateOptions = { month: "short", day: "numeric" };
  const formattedLabels = sortedValues.map((entry) =>
    new Date(entry.datetime).toLocaleDateString("en-US", dateOptions)
  );
  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Stock Price (Close)",
        data: sortedValues.map((entry) => parseFloat(entry.close)),
        fill: true,
        backgroundColor: "rgba(184, 161, 79, 0.2)",
        borderColor: "#b8a14f",
        borderWidth: 2,
        pointBackgroundColor: "#b8a14f",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#b8a14f",
        tension: 0.4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
    },
  };

  return (
    <div>
      <h2>{stockData.meta.symbol} Stock Price (Close)</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

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

  const chartData = {
    labels: stockData.values.map((entry) => entry.datetime),
    datasets: [
      {
        label: "Stock Price (Close)",
        data: stockData.values.map((entry) => parseFloat(entry.close)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>{stockData.meta.symbol} Stock Price (Close)</h2>
      <Line data={chartData} />
    </div>
  );
}

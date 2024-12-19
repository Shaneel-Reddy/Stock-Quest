import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import Clock from "../components/Clock";
import "../css/Dashboard.css";

const Stock_key = import.meta.env.VITE_DASHSTOCKNAPI_KEY;

export default function Dashboard() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const fetchStockData = async () => {
    if (!symbol) return;
    try {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=7&apikey=${Stock_key}`
      );
      const data = await response.json();
      if (data.values) {
        setStockData(data);
        setError(null);
      } else {
        setError("Invalid symbol or data not available.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }
  };

  return (
    <div className="dashboard">
      <div className="timedisplay">
        <div className="welcome-message">
          <h1>Welcome back!</h1>
          <p>
            Here’s a quick overview of your stock portfolio performance today.
          </p>
          <p>
            The stock market is seeing positive growth today. Keep an eye on key
            stocks.
          </p>
        </div>
        <div className="chartdisplay">
          <StockChart stockData={stockData} />
        </div>
        <div className="clock1">
          <h2 className="text-white">Major Market Time Zones</h2>
          <Clock />
        </div>
      </div>

      <div className="watchlist">
        <h2 className="watchlist-heading text-white">Watchlist</h2>

        <div className="add-stock text-white">
          <input
            type="text"
            placeholder="Enter stock symbol"
            className="watchlist-input bg-black text-white"
            value={symbol}
            onChange={handleSymbolChange}
          />
          <button className="add-button" onClick={fetchStockData}>
            Add
          </button>
        </div>

        {error && <p className="text-red">{error}</p>}

        <table className="watchlist-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData && stockData.values && stockData.values.length > 0 ? (
              <tr>
                <td>{stockData.meta.symbol}</td>
                <td>{stockData.values[0].open}</td>
                <td>{stockData.values[0].high}</td>
                <td>{stockData.values[0].low}</td>
                <td>{stockData.values[0].close}</td>
                <td>{stockData.values[0].volume || "N/A"}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="7">No data available for this symbol</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

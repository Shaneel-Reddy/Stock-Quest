import React, { useState, useEffect } from "react";
import StockChart from "../components/StockChart";
import Clock from "../components/Clock";
import "../css/Dashboard.css";
import axios from "axios";

const Stock_key = import.meta.env.VITE_DASHSTOCKNAPI_KEY;

export default function Dashboard() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [assets, setAssets] = useState([]);

  const API_BASE_URL = "http://3.110.166.85:7000/api/portfolio";
  const token = localStorage.getItem("jwt");

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  useEffect(() => {
    fetchAssets();
    fetchTotalValue();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allAssets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
      alert("Failed to load assets. Please try again.");
    }
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
  const fetchTotalValue = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolioValue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalValue(response.data);
    } catch (error) {
      console.error("Error fetching total value:", error);
      alert("Failed to load total value. Please try again.");
    }
  };
  return (
    <div className="dashboard">
      <div className="timedisplay">
        <div className="welcome-message">
          <h1 class="typing-effect">Welcome Back, Investor!</h1>
          <p>
            Your portfolio’s ready to shine! The market’s buzzing—time to
            capitalize on those opportunities and make your next big move.
          </p>
        </div>
        <div className="portfolio-container">
          <div className="portfolio-value">
            <h3>Your Portfolio</h3>
            <h3>Total Value</h3>
            <h3>${totalValue.toFixed(2)}</h3>
          </div>

          <div className="portfolio-details">
            <h1>Top Performing Stocks</h1>
            <table className="assets-table">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Ticker</th>
                  <th>Current Price</th>
                  <th>Gain (%)</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {assets
                  .sort((a, b) => b.gainPercent - a.gainPercent)
                  .slice(0, 3)
                  .map((asset, index) => (
                    <tr key={index}>
                      <td>{asset.stockName}</td>
                      <td>{asset.ticker}</td>
                      <td>{asset.currentPrice.toFixed(2)}</td>
                      <td>{asset.gainPercent}</td>
                      <td>{asset.value.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="clock1">
          <h2>Major Market Time Zones</h2>
          <Clock />
        </div>
      </div>

      <div className="watchlist">
        <h2 className="watchlist-heading">TickerView</h2>

        <div className="add-stock text-white">
          <input
            type="text"
            placeholder="Search by stock symbol (e.g., AAPL)"
            className="watchlist-input bg-black text-white placeholder-opacity"
            value={symbol}
            onChange={handleSymbolChange}
          />
          <button className="add-button" onClick={fetchStockData}>
            View
          </button>
        </div>

        {error && <p className="text-red">{error}</p>}

        {stockData && stockData.values && stockData.values.length > 0 ? (
          <>
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
                <tr>
                  <td>{stockData.meta.symbol}</td>
                  <td>{stockData.values[0].open}</td>
                  <td>{stockData.values[0].high}</td>
                  <td>{stockData.values[0].low}</td>
                  <td>{stockData.values[0].close}</td>
                  <td>{stockData.values[0].volume || "N/A"}</td>
                </tr>
              </tbody>
            </table>
            <div className="chartdisplay">
              <StockChart stockData={stockData} />
            </div>
          </>
        ) : (
          <p className="text-animated">Track, Analyze, Conquer the Market!</p>
        )}
      </div>
    </div>
  );
}

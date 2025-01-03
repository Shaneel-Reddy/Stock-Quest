import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Portfolio.css";
import StockChart from "../components/StockChart";

const Stock_key = import.meta.env.VITE_DASHSTOCKNAPI_KEY;
export default function Portfolio() {
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [assets, setAssets] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [stockData, setStockData] = useState(null);
  const [stockName, setStockName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [assetQuantity, setAssetQuantity] = useState("");
  const [ticker, setTicker] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const API_BASE_URL = "http://3.110.166.85:7000/api/portfolio";
  const token = localStorage.getItem("jwt");

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
  const handleAddAssetClick = () => {
    setIsEditMode(false);
    setIsAssetModalOpen(true);
  };

  const handleEditAsset = (index) => {
    const asset = assets[index];
    setStockName(asset.stockName);
    setBuyPrice(asset.buyPrice);
    setAssetQuantity(asset.quantity);
    setTicker(asset.ticker);
    setEditingIndex(index);
    setIsEditMode(true);
    setIsAssetModalOpen(true);
  };

  const handleAssetModalClose = () => {
    setIsAssetModalOpen(false);
    setStockName("");
    setBuyPrice("");
    setAssetQuantity("");
    setTicker("");
    setEditingIndex(null);
  };

  const handleAssetSubmit = async () => {
    if (isEditMode) {
      await handleUpdateAsset();
    } else {
      await handleAddNewAsset();
    }
  };

  const handleAddNewAsset = async () => {
    try {
      const newAsset = {
        stockName,
        ticker,
        quantity: parseFloat(assetQuantity),
        buyPrice: parseFloat(buyPrice),
      };

      const response = await axios.post(`${API_BASE_URL}/addAsset`, newAsset, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAssets([...assets, response.data]);
      await fetchTotalValue();
      handleAssetModalClose();
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("Failed to add asset. Please try again.");
    }
  };

  const handleUpdateAsset = async () => {
    try {
      const updatedAsset = {
        stockName,
        ticker,
        quantity: parseFloat(assetQuantity),
        buyPrice: parseFloat(buyPrice),
      };

      const assetId = assets[editingIndex].id;

      const response = await axios.put(
        `${API_BASE_URL}/updateAsset/${assetId}`,
        updatedAsset,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedAssets = [...assets];
      updatedAssets[editingIndex] = response.data;
      setAssets(updatedAssets);
      await fetchTotalValue();
      handleAssetModalClose();
    } catch (error) {
      console.error("Error updating asset:", error);
      alert("Failed to update asset. Please try again.");
    }
  };

  const handleDeleteAsset = async (index) => {
    const assetToDelete = assets[index];
    try {
      await axios.delete(`${API_BASE_URL}/deleteAsset/${assetToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedAssets = assets.filter((_, i) => i !== index);
      setAssets(updatedAssets);
      await fetchTotalValue();
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset. Please try again.");
    }
  };
  const fetchStockData = async (index) => {
    const symbol = assets[index].ticker;
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
    <div className="portfolio-page">
      <div className="left-column">
        <div className="assets-section">
          <h2 style={{ textAlign: "center" }}>Your Assets</h2>

          <table className="assets-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Ticker</th>
                <th>Buy Price</th>
                <th>Current Price</th>
                <th>Gain (%)</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Actions</th>
                <th>Visualize</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.stockName}</td>
                  <td>{asset.ticker}</td>
                  <td>{asset.buyPrice.toFixed(2)}</td>
                  <td>{asset.currentPrice.toFixed(2)}</td>
                  <td>{asset.gainPercent.toFixed(2)}</td>
                  <td>{asset.quantity}</td>
                  <td>{asset.value.toFixed(2)}</td>
                  <td>
                    <button
                      className="edit-asset"
                      onClick={() => handleEditAsset(index)}
                    >
                      ✎
                    </button>
                    <button
                      className="delete-asset"
                      onClick={() => handleDeleteAsset(index)}
                    >
                      ✖
                    </button>
                  </td>
                  <td>
                    <button
                      className="visualize"
                      onClick={() => fetchStockData(index)}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {stockData && (
            <div className="chart-box">
              <div className="chartdisplay">
                <StockChart stockData={stockData} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-column">
        <div className="total-value-box">
          <h2>My Portfolio</h2>
          <h2>Total Value</h2>
          <h3>${totalValue.toFixed(2)}</h3>
        </div>
        <div className="buy-stocks" onClick={handleAddAssetClick}>
          <h2>Invest Stocks</h2>
        </div>
      </div>

      {isAssetModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditMode ? "Edit Asset" : "Add Asset"}</h2>
            <button className="close-btn" onClick={handleAssetModalClose}>
              &times;
            </button>
            <input
              type="text"
              placeholder="Stock Name (Eg. Apple)"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ticker (Eg. AAPL)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={assetQuantity}
              onChange={(e) => setAssetQuantity(e.target.value)}
            />
            <input
              type="number"
              placeholder="Buy Price"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />

            <button className="submit-btn" onClick={handleAssetSubmit}>
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

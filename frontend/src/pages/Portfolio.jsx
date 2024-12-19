import React, { useState } from "react";
import "../css/Portfolio.css";

export default function Portfolio() {
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [expenseHistory, setExpenseHistory] = useState([]);

  const [stockName, setStockName] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [assetQuantity, setAssetQuantity] = useState("");
  const [ticker, setTicker] = useState(""); // Renamed to Ticker
  const [assetCurrentPrice, setAssetCurrentPrice] = useState("");
  const [assetGainPercent, setAssetGainPercent] = useState("");
  const [assetValue, setAssetValue] = useState("");

  const handleAddAssetClick = () => {
    setIsAssetModalOpen(true);
  };

  const handleAssetModalClose = () => {
    setIsAssetModalOpen(false);
    setStockName("");
    setBuyPrice("");
    setAssetQuantity("");
    setTicker("");
    setAssetCurrentPrice("");
    setAssetGainPercent("");
    setAssetValue("");
  };

  const handleAssetSubmit = async () => {
    try {
      const Stock_key = ""; //import.meta.env.VITE_DASHSTOCKNAPI_KEY;
      const apiUrl = `https://api.twelvedata.com/time_series?symbol=${ticker}&interval=1day&outputsize=7&apikey=${Stock_key}`;

      const response = await fetch(apiUrl);
      const stockData = await response.json();

      if (stockData && stockData.values && stockData.values[0]) {
        const currentPrice = parseFloat(stockData.values[0].close);
        const purchasePrice = parseFloat(buyPrice);
        const quantity = parseFloat(assetQuantity);
        const expenseAmount = purchasePrice * quantity;

        const gainPercent = (
          ((currentPrice - purchasePrice) / purchasePrice) *
          100
        ).toFixed(2);
        const value = (currentPrice * quantity).toFixed(2);

        const newAsset = {
          stockName: stockName,
          ticker: ticker,
          buyPrice: purchasePrice.toFixed(2),
          quantity: quantity.toFixed(2),
          currentPrice: currentPrice.toFixed(2),
          gainPercent: `${gainPercent}%`,
          value: `${value}`,
        };

        setAssets([...assets, newAsset]);

        setExpenseHistory([
          ...expenseHistory,
          {
            description: `Bought ${quantity} of ${stockName}`,
            amount: expenseAmount,
          },
        ]);

        handleAssetModalClose();
      } else {
        console.error("Invalid response from stock API.");
        alert("Unable to fetch stock data. Please check the asset name.");
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      alert("An error occurred while fetching stock data.");
    }
  };

  const handleEditAsset = (index) => {
    const assetToEdit = assets[index];
    setStockName(assetToEdit.stockName);
    setBuyPrice(assetToEdit.buyPrice);
    setAssetQuantity(assetToEdit.quantity);
    setTicker(assetToEdit.ticker);
    setAssetCurrentPrice(assetToEdit.currentPrice);
    setAssetGainPercent(assetToEdit.gainPercent);
    setAssetValue(assetToEdit.value);
    setIsAssetModalOpen(true);
  };

  const handleDeleteAsset = (index) => {
    const updatedAssets = assets.filter((_, i) => i !== index);
    setAssets(updatedAssets);
  };

  return (
    <div className="portfolio-page">
      <div className="left-column">
        <div className="assets-section">
          <h2>Your Assets</h2>
          <button className="buy-stocks" onClick={handleAddAssetClick}>
            Invest Stocks
          </button>
          <table className="assets-table">
            <thead>
              <tr>
                <th>Stock Name</th>
                <th>Ticker</th>
                <th>Buy Price</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Gain %</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.stockName}</td>
                  <td>{asset.ticker}</td>
                  <td>{asset.buyPrice}</td>
                  <td>{asset.quantity}</td>
                  <td>{asset.currentPrice}</td>
                  <td>{asset.gainPercent}</td>
                  <td>{asset.value}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-column">
        <h2>Expense History</h2>
        <ul className="expense-history">
          {expenseHistory.map((expense, index) => (
            <li key={index}>
              {expense.description} - ${expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {isAssetModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Asset</h2>
            <button className="close-btn" onClick={handleAssetModalClose}>
              &times;
            </button>
            <input
              type="text"
              placeholder="Stock Name"
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Ticker"
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
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

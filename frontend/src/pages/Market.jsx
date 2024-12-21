import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Market.css";
import Card from "../components/Card";
import image1 from "../assets/3d-rendering-financial-neon-bull.jpg";
import image2 from "../assets/stock-trading-workplace-background.jpg";

const topStocks = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "BRK.B",
  "NVDA",
  "JPM",
  "JNJ",
  "UNH",
];

const API_KEY = ""; //import.meta.env.VITE_MARKETSTOCKAPI_KEY;
const BASE_URL = "https://finnhub.io/api/v1";
const NEWS_API_KEY = ""; //import.meta.env.VITE_NEWSAPI_KEY;
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=stock&language=en&category=business`;

export default function Market() {
  const [stockData, setStockData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  const fetchStockQuotes = async () => {
    try {
      const responses = await Promise.all(
        topStocks.map((symbol) =>
          axios.get(`${BASE_URL}/quote`, {
            params: {
              symbol: symbol,
              token: API_KEY,
            },
          })
        )
      );
      const data = responses.map((response, index) => ({
        symbol: topStocks[index],
        ...response.data,
      }));
      setStockData(data);
    } catch (err) {
      setError("Error fetching stock quotes");
      console.error(err);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(NEWS_API_URL);
      setNewsData(response.data.results);
    } catch (err) {
      setError("Error fetching news data");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStockQuotes();
    fetchNews();
  }, []);

  return (
    <>
      <div className="market1">
        <h1 className="quote">
          "The stock market is filled with individuals who know the price of
          everything but the value of nothing." – Philip Fisher
        </h1>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src={image2} className="d-block w-100" alt="Slide 2" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="market">
        <div className="d2">
          <h3>Top Stocks</h3>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Current Price</th>
                <th>High Price of the Day</th>
                <th>Low Price of the Day</th>
                <th>Open Price of the Day</th>
                <th>Previous Close Price</th>
              </tr>
            </thead>
            <tbody>
              {stockData.length > 0 ? (
                stockData.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.symbol}</td>
                    <td>${stock.c}</td>
                    <td>${stock.h}</td>
                    <td>${stock.l}</td>
                    <td>${stock.o}</td>
                    <td>${stock.pc}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">{error ? error : "Loading..."}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d3">
          <h3>Top Trending News</h3>
          {newsData.slice(0, 5).map((news, index) => (
            <Card
              key={index}
              title={news.title}
              link={news.link}
              image={news.image_url}
            />
          ))}
        </div>
      </div>
    </>
  );
}

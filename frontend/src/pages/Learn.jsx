import React from "react";
import "../css/Learn.css";

export default function Learn() {
  const youtubeVideos = [
    { id: "GcZW24SkbHM", title: "Why should you invest?" },
    { id: "C7_JHlsqFlM", title: "Market Intermediaries" },
    {
      id: "SV7v5WRDtLE",
      title: "Why and how do companies list, and what is an IPO?",
    },
    { id: "HaiM8jPDEhk", title: "Why do stock prices fluctuate?" },
    { id: "-h1R5oIL0PI", title: "How does a trading platform work?" },
    { id: "z21PrHuEkKg", title: "What is a stock market index?" },
    { id: "1ZrF6GCLDL4", title: "Clearing and settlement process" },
    {
      id: "Mv93KfHcWaQ",
      title:
        "Understanding corporate actions like dividends, bonuses and buybacks",
    },
    { id: "5t5O0MnNJNE", title: "Order Types" },
    { id: "wt6YBnJzbm0", title: "Getting started" },
  ];

  const articles = [
    {
      title: "Stock Market Basics for Beginners",
      link: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
      thumbnail:
        "https://www.investopedia.com/thmb/URyVBcDIQxkKB2e6AVRTNoqiRZA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/stockmarket.asp-d2f34bb1e91444069bc6e9b24cfdf6e8.jpg",
    },
    {
      title: "Stock market basics: 9 tips for beginners",
      link: "https://www.bankrate.com/investing/stock-market-basics-for-beginners/",
      thumbnail:
        "https://www.bankrate.com/brp/2023/10/16124824/Investments-Stock-market-basics_9-tips-for-beginners.jpg?auto=webp&optimize=high&crop=16:9&width=912",
    },
    {
      title: "Stock Market Basics: What Beginner Investors Should Know",
      link: "https://www.nerdwallet.com/article/investing/stock-market-basics-everything-beginner-investors-know",
      thumbnail:
        "https://www.nerdwallet.com/tachyon/2017/06/GettyImages-653901746.jpg?resize=1920%2C1152",
    },
    {
      title: "Stock Market Basics",
      link: "https://groww.in/p/stock-market-basics",
      thumbnail:
        "https://wp-asset.groww.in/wp-content/uploads/2020/06/02185304/for-blog_2june_little-money-03.jpg",
    },
    {
      title: "Best Share Market Tips For Beginners",
      link: "https://www.sharekhan.com/financial-blog/blogs/best-share-market-tips-for-beginners",
      thumbnail:
        "https://www.sharekhan.com/MediaGalary/image/What-is-Online-Trading_H-202403042042557895107.png",
    },
    {
      title: "10 Great Secrets: How to Win the Stock Market Game?",
      link: "https://www.holisticinvestment.in/7-secrets-of-winning/",
      thumbnail:
        "https://www.holisticinvestment.in/wp-content/uploads/2015/07/10-Great-Secrets-How-to-Win-the-Stock-Market-Game-1.png",
    },
  ];

  return (
    <div className="learn">
      <h2 className="youtubeheader">
        Complete Guide to Basics of Stock Market
      </h2>
      <div className="youtube-scroll">
        {youtubeVideos.map((video, index) => (
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="video-card-link"
          >
            <div className="video-card">
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="video-thumbnail"
              />
              <h3>{video.title}</h3>
            </div>
          </a>
        ))}
      </div>

      <h2 className="article-header">Articles for Beginners</h2>
      <div className="article-scroll">
        {articles.map((article, index) => (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="article-card-link"
          >
            <div className="article-card">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="article-thumbnail"
              />
              <h3>{article.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

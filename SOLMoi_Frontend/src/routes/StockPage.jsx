import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CandlestickChart from "../components/CandlestickChart.jsx";
import "../styles/StockPage.css";

const StockPage = () => {
  const { stockCode } = useParams();
  const [duration, setDuration] = useState("1D");

  const timeframes = {
    "1D": "1D",
    "1W": "1W",
    "1M": "1M",
  };

  return (
    <div className="stock-page-container">
      <header className="stock-header">
        <h1>삼성전자 {stockCode}</h1>
        <p>주가 차트</p>
      </header>

      <div className="chart-container">
        <CandlestickChart stockCode={stockCode} duration={duration} />
      </div>

      <div className="timeframe-buttons" style={{ marginTop: "20px" }}>
        {Object.entries(timeframes).map(([key, label]) => (
          <button
            key={key}
            className={`timeframe-button ${duration === key ? "active" : ""}`}
            onClick={() => setDuration(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockPage;

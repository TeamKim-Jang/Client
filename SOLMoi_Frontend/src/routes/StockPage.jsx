import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CandlestickChart from "../components/CandlestickChart.jsx";
import "../styles/StockPage.css";

const StockPage = () => {
  const { stockCode } = useParams();
  const [duration, setDuration] = useState("1D"); 

  const periodMapping = {
    "1D": "D", // 일봉
    "1W": "W", // 주봉
    "1M": "M", // 월봉
  };

  return (
    <div className="stock-page-container">
      <header className="stock-header">
        <h1>{stockCode}</h1>
        <p>주가 차트</p>
      </header>

      {/* 시간 범위 */}
      <div className="chart-container">
        <div className="timeframe-buttons">
          {Object.keys(periodMapping).map((key) => (
            <button
              key={key}
              className={`timeframe-button ${duration === key ? "active" : ""}`}
              onClick={() => {
                console.log(`Duration set to: ${key}`);
                setDuration(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>

        <CandlestickChart
          stockCode={stockCode}
          duration={duration}
          periodType={periodMapping[duration]}
        />
      </div>
    </div>
  );
};

export default StockPage;

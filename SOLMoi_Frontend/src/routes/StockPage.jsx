import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CandlestickChart from "../components/CandlestickChart.jsx";
import "../styles/StockPage.css";
import { useNavigate } from "react-router-dom";

const StockPage = () => {
  const { stockCode } = useParams();
  const [duration, setDuration] = useState("1D");

  const timeframes = {
    "1D": "1D",
    "1W": "1W",
    "1M": "1M",
  };
  const selectedStockName =
    sessionStorage.getItem("selectedStockName") || "주식 이름 없음";

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/investsearch"); // 이전 페이지로 이동
  };

  return (
    <div className="stock-page-container">
      <style>
        {`
      

      .back-button-container {
        position: absolute;
        top: 10%;
        left: 7%;
        transform: translateX(-50%);
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        
        
      }

  

      .back-arrow {
        width: 40px;
        height: 40px;
      }

      
    `}
      </style>
      <div className="back-button-container" onClick={goBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="back-arrow"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.5 19.5L8.5 12l7-7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <header className="stock-header">
        {selectedStockName}
        <h1 style={{ fontSize: 20 }}>{stockCode}</h1>
      </header>

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

      <div className="chart-container">
        <CandlestickChart stockCode={stockCode} duration={duration} />
      </div>
    </div>
  );
};

export default StockPage;

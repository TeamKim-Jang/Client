import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CandlestickChart from "../components/CandlestickChart.jsx";

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
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* 내장 스타일 */}
      <style>
        {`
          @media (max-width: 768px) {
            .back-button-container {
              top: 5%;
              left: 5%;
              width: 35px;
              height: 35px;
            }

            .stock-header h1 {
              font-size: 18px;
              text-align: center;
            }

            .timeframe-buttons button {
              font-size: 12px;
              padding: 8px 12px;
            }

            .chart-container {
              width: 100%;
              padding: 10px;
            }
          }

          @media (min-width: 769px) {
            .back-button-container {
              top: 10%;
              left: 10%;
              width: 50px;
              height: 50px;
            }

            .stock-header h1 {
              font-size: 24px;
              text-align: center;
            }

            .timeframe-buttons button {
              font-size: 14px;
              padding: 10px 16px;
            }

            .chart-container {
              width: 80%;
              padding: 20px;
            }
          }

          .back-button-container {
            position: absolute;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .back-button-container:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
          }

          .back-arrow {
            width: 24px;
            height: 24px;
          }

          .stock-header h1 {
            margin-bottom: 10px;
            color: #007bff;
          }

          .timeframe-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
          }

          .timeframe-button {
            border: 1px solid #007bff;
            background-color: #ffffff;
            color: #007bff;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .timeframe-button:hover {
            background-color: #007bff;
            color: #ffffff;
          }

          .timeframe-button.active {
            background-color: #007bff;
            color: #ffffff;
          }

          .chart-container {
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 20px;
            width: 100%;
          }
        `}
      </style>

      {/* 뒤로가기 버튼 */}
      <div
        className="back-button-container"
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
        }}
        onClick={goBack}
      >
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

      {/* 주식 이름 및 코드 */}
      <header className="stock-header">
        <h1>
          {selectedStockName} {stockCode}
        </h1>
      </header>

      {/* 기간 버튼 */}
      <div className="timeframe-buttons">
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

      {/* 차트 컨테이너 */}
      <div className="chart-container">
        <CandlestickChart stockCode={stockCode} duration={duration} />
      </div>
    </div>
  );
};

export default StockPage;

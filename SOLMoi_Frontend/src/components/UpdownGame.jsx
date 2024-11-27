"use client";

import React, { useState, useEffect } from "react";

export default function UpdownGame() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [userId, setUserId] = useState(null);
  const [yesterdayPrediction, setYesterdayPrediction] = useState(null);
  const [todayPrediction, setTodayPrediction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 실제 애플리케이션에서는 이 부분을 인증 시스템에서 가져와야 합니다.
        setUserId(1);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(
          "사용자 데이터를 가져오는데 실패했습니다. 나중에 다시 시도해주세요."
        );
      }
    };

    const fetchGameStatus = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/predict/game-status/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setYesterdayPrediction(data.data.yesterdayPrediction);
          setTodayPrediction(data.data.todayPrediction);
          setSelectedStock(data.data.randomStock);
        } else {
          throw new Error(
            data.message || "게임 상태를 가져오는데 실패했습니다"
          );
        }
      } catch (error) {
        console.error("Failed to fetch game status:", error);
        setError(
          "게임 상태를 가져오는데 실패했습니다. 나중에 다시 시도해주세요."
        );
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      await fetchUserData();
      await fetchGameStatus();
      setIsLoading(false);
    };

    fetchData();
  }, [userId]);

  const makePrediction = async (prediction) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/predict/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          stockId: selectedStock.stock_id,
          predictionUpOrDown: prediction,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setApiResponse({
          status: "success",
          message: `${prediction === "UP" ? "상승" : "하락"} 예측이 기록되었습니다.`,
        });
        setTodayPrediction(data.data);
      } else {
        throw new Error(data.message || "예측을 등록하는데 실패했습니다");
      }
    } catch (error) {
      console.error("Failed to make prediction:", error);
      setApiResponse({
        status: "error",
        message: error.message || "예측을 등록하는데 실패했습니다.",
      });
      setError("예측을 하는데 실패했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">쓸방울 모으기</h1>
      </header>

      <main className="main">
        <div className="card">
          <h2 className="card-title">주가예측게임</h2>
          <div className="card-content">
            {yesterdayPrediction && yesterdayPrediction.is_correct !== null && (
              <div className="popup">
                <div className="popup-content">
                  <p>
                    {yesterdayPrediction.is_correct
                      ? "포인트 획득!"
                      : "포인트 획득 실패"}
                  </p>
                  <button onClick={() => setYesterdayPrediction(null)}>
                    닫기
                  </button>
                </div>
              </div>
            )}

            {selectedStock && (
              <div className="stock-info">
                <div className="stock-icon">
                  {selectedStock.symbol.charAt(0)}
                </div>
                <h3 className="stock-name">{selectedStock.name}</h3>
                <p className="stock-price">
                  {new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  }).format(selectedStock.current_price)}
                </p>
              </div>
            )}

            {!todayPrediction ? (
              <>
                <p className="question">오를까? 내릴까?</p>
                <div className="button-container">
                  <button
                    onClick={() => makePrediction("UP")}
                    disabled={isLoading || !selectedStock}
                    className="button up-button"
                  >
                    <span className="arrow-up">▲</span>
                    오른다
                  </button>
                  <button
                    onClick={() => makePrediction("DOWN")}
                    disabled={isLoading || !selectedStock}
                    className="button down-button"
                  >
                    <span className="arrow-down">▼</span>
                    내린다
                  </button>
                </div>
              </>
            ) : (
              <p className="today-prediction">
                오늘의 예측:{" "}
                {todayPrediction.prediction_upordown === "UP" ? "상승" : "하락"}
              </p>
            )}

            {apiResponse && (
              <p
                className={`message ${apiResponse.status === "success" ? "success-message" : "error-message"}`}
              >
                {apiResponse.message}
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="nav-container">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`nav-item ${i === 1 ? "active-nav-item" : ""}`}
            />
          ))}
        </div>
      </footer>

      <style>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f0f2f5;
          font-family: Arial, sans-serif;
        }
        .header {
          background-color: white;
          padding: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header-title {
          color: #2d59f7;
          font-size: 18px;
          font-weight: bold;
        }
        .main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 24px;
          width: 100%;
          max-width: 400px;
        }
        .card-title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 24px;
        }
        .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        .stock-info {
          text-align: center;
        }
        .stock-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #2d59f7;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          margin: 0 auto 16px;
        }
        .stock-name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .stock-price {
          font-size: 20px;
          color: #2d59f7;
          font-weight: bold;
        }
        .loading,
        .error {
          text-align: center;
          padding: 20px;
          font-size: 18px;
        }
        .error {
          color: red;
        }
        .question {
          font-size: 20px;
          font-weight: bold;
        }
        .button-container {
          display: flex;
          gap: 16px;
          width: 100%;
        }
        .button {
          flex: 1;
          border: none;
          border-radius: 30px;
          padding: 16px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: background-color 0.3s;
        }
        .up-button {
          background-color: #ff6b6b;
        }
        .down-button {
          background-color: #2d59f7;
        }
        .arrow-up,
        .arrow-down {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .message {
          padding: 12px;
          border-radius: 4px;
          text-align: center;
          font-weight: bold;
        }
        .success-message {
          background-color: #4caf50;
          color: white;
        }
        .error-message {
          background-color: #f44336;
          color: white;
        }
        .footer {
          background-color: white;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }
        .nav-container {
          display: flex;
          justify-content: space-between;
          max-width: 300px;
          margin: 0 auto;
        }
        .nav-item {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #e5e7eb;
        }
        .active-nav-item {
          background-color: #2d59f7;
        }
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .today-prediction {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

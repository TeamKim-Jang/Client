"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdownGame.css";
import game from '../../assets/images/game.png'


export default function UpdownGame() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [userId, setUserId] = useState(null);
  const [yesterdayPrediction, setYesterdayPrediction] = useState(null);
  const [todayPrediction, setTodayPrediction] = useState(null);
  const [error, setError] = useState(null);
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserId(sessionStorage.getItem("user_id"));
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
        const response = await fetch(
          `http://localhost:3001/api/prediction/game-status/${userId}`
        );
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
      const response = await fetch(
        "http://localhost:3001/api/prediction/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            stockId: selectedStock.stock_id,
            predictionUpOrDown: prediction,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setApiResponse({
          status: "success",
          message: `${prediction === "UP" ? "상승" : "하락"} 예측이 기록되었습니다.`,
        });
        setTodayPrediction(data.data); // 오늘의 예측 결과 저장
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
      setIsLoading(false); // 로딩 상태 해제
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
      <main className="main">
        <div className="card">
          <div className="card-content">
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

            <h2 className="game-title">주가예측게임</h2>

            {selectedStock && (
              <div className="stock-info">
                <div className="stock-logo">
                  {selectedStock.symbol.toString().charAt(0)}
                </div>
                <h3 className="stock-name">{selectedStock.name}</h3>
              </div>
            )}

            <div className="prediction-section">
              <h4 className="stock-name-question">{selectedStock?.name}</h4>
              <p className="question">내일 오를까? 내릴까?</p>
            </div>

            <div className="buttons-wrapper">
              <div className="button-container">
                <button
                  onClick={() => makePrediction("UP")}
                  disabled={isLoading || !selectedStock || todayPrediction}
                  className={`button up-button ${
                    todayPrediction?.prediction_upordown === "UP"
                      ? "selected"
                      : ""
                  }`}
                >
                  <span className="arrow-icon">↗</span>
                  <span className="button-text">오른다</span>
                </button>
              </div>
              <div className="button-container">
                <button
                  onClick={() => makePrediction("DOWN")}
                  disabled={isLoading || !selectedStock || todayPrediction}
                  className={`button down-button ${
                    todayPrediction?.prediction_upordown === "DOWN"
                      ? "selected"
                      : ""
                  }`}
                >
                  <span className="arrow-icon">↘</span>
                  <span className="button-text">내린다</span>
                </button>
              </div>
            </div>

            {apiResponse && (
              <p
                className={`message ${
                  apiResponse.status === "success"
                    ? "success-message"
                    : "error-message"
                }`}
              >
                {apiResponse.message}
              </p>
            )}
          </div>
        </div>
      </main>
      <footer className="bottomNav">
        <div className="navItems">
         <div className="navItem" onClick={() => navigate("/stock")}></div>
          <div className="navItem activeNavItem"></div>
          <div className="navItem"
          onClick={() => navigate('/solleafcontent')}>
            <img src={game} alt="game" className="navImage" />
          </div>
        </div>
      </footer>
    </div>
  );
}

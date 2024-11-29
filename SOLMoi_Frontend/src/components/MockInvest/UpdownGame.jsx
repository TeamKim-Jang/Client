"use client";

import React, { useState } from "react";

export default function UpdownPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const makePrediction = async (prediction) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          stockId: 100,
          predictionDate: new Date().toISOString().split("T")[0],
          predictionUpOrDown: prediction,
        }),
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      setApiResponse({ status: "error", message: "예측 등록에 실패했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.collectingDrops}>쓸방울 모으기</div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <h1 style={styles.gameTitle}>주가예측게임</h1>

        {/* Tesla Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.teslaLogo}>
            <svg viewBox="0 0 342 35" style={styles.svg}></svg>
          </div>
        </div>

        {/* Question */}
        <div style={styles.questionContainer}>
          <h2 style={styles.stockName}>테슬라</h2>
          <p style={styles.question}>오를까? 내릴까?</p>
        </div>

        {/* Prediction Buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.upButton}
            onClick={() => makePrediction("UP")}
            disabled={isLoading}
          >
            <div style={styles.arrowUp}></div>
            오른다
          </button>
          <button
            style={styles.downButton}
            onClick={() => makePrediction("DOWN")}
            disabled={isLoading}
          >
            <div style={styles.arrowDown}></div>
            내린다
          </button>
        </div>

        {/* API Response Message */}
        {apiResponse && (
          <div
            style={
              apiResponse.status === "success"
                ? styles.successMessage
                : styles.errorMessage
            }
          >
            {apiResponse.message}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={styles.bottomNav}>
        <div style={styles.navItems}>
          <div style={styles.navItem}>
            <div style={styles.navIcon}></div>
          </div>
          <div style={styles.navItem}>
            <div
              style={{ ...styles.navIcon, backgroundColor: "#2D59F7" }}
            ></div>
          </div>
          <div style={styles.navItem}>
            <div style={styles.navIcon}></div>
          </div>
          <div style={styles.navItem}>
            <div style={styles.navIcon}></div>
          </div>
          <div style={styles.navItem}>
            <div style={styles.navIcon}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8F9FB",
    color: "black",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    padding: "16px 20px",
    backgroundColor: "white",
  },
  collectingDrops: {
    color: "#2D59F7",
    fontSize: "18px",
    fontWeight: "600",
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  gameTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  teslaLogo: {
    width: "200px",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#E31937",
  },
  svg: {
    width: "100%",
    height: "auto",
  },
  questionContainer: {
    textAlign: "center",
    marginBottom: "60px",
  },
  stockName: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  question: {
    fontSize: "24px",
    marginTop: "10px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginTop: "auto",
    padding: "0 20px",
  },
  upButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "20px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  downButton: {
    flex: 1,
    backgroundColor: "#2D59F7",
    color: "white",
    border: "none",
    borderRadius: "30px",
    padding: "20px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  arrowUp: {
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "15px solid white",
  },
  arrowDown: {
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "15px solid white",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTop: "1px solid #E5E7EB",
    padding: "16px 24px",
  },
  navItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navItem: {
    width: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navIcon: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#E5E7EB",
  },
  successMessage: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#F44336",
    color: "white",
    borderRadius: "5px",
    textAlign: "center",
  },
};

"use client";

import React, { useState, useEffect } from "react";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [userId, setUserId] = useState(1); // Assuming user ID 1 for this example

  useEffect(() => {
    const fetchSelectedStock = async () => {
      try {
        // In a real application, you would fetch this from your API
        const mockData = {
          id: 1,
          name: "NVIDIA",
          symbol: "NVDA",
          current_price: 450000,
        };
        setSelectedStock(mockData);
      } catch (error) {
        console.error("Failed to fetch selected stock:", error);
      }
    };

    fetchSelectedStock();
  }, []);

  const makePrediction = async (prediction) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          stock_id: selectedStock.id,
          prediction_date: new Date().toISOString().split("T")[0],
          prediction_upordown: prediction,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setApiResponse({
          status: "success",
          message: `Your ${prediction} prediction has been recorded.`,
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setApiResponse({
        status: "error",
        message: error.message || "Failed to register prediction.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>쓸방울 모으기</h1>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>주가예측게임</h2>
          <div style={styles.cardContent}>
            {selectedStock ? (
              <div style={styles.stockInfo}>
                <div style={styles.stockIcon}>
                  {selectedStock.symbol.charAt(0)}
                </div>
                <h3 style={styles.stockName}>{selectedStock.name}</h3>
                <p style={styles.stockPrice}>
                  {new Intl.NumberFormat("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  }).format(selectedStock.current_price)}
                </p>
              </div>
            ) : (
              <p style={styles.loading}>주식 정보 로딩 중...</p>
            )}

            <p style={styles.question}>오를까? 내릴까?</p>

            <div style={styles.buttonContainer}>
              <button
                onClick={() => makePrediction("UP")}
                disabled={isLoading || !selectedStock}
                style={{ ...styles.button, ...styles.upButton }}
              >
                <span style={styles.arrowUp}>▲</span>
                오른다
              </button>
              <button
                onClick={() => makePrediction("DOWN")}
                disabled={isLoading || !selectedStock}
                style={{ ...styles.button, ...styles.downButton }}
              >
                <span style={styles.arrowDown}>▼</span>
                내린다
              </button>
            </div>

            {apiResponse && (
              <p
                style={{
                  ...styles.message,
                  ...(apiResponse.status === "success"
                    ? styles.successMessage
                    : styles.errorMessage),
                }}
              >
                {apiResponse.message}
              </p>
            )}
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.navContainer}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.navItem,
                ...(i === 1 ? styles.activeNavItem : {}),
              }}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F0F2F5",
    fontFamily: "Arial, sans-serif",
    color: "black", // 기본 글자색을 검정으로 설정
  },
  header: {
    backgroundColor: "white",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  headerTitle: {
    color: "#2D59F7",
    fontSize: "18px",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "24px",
    width: "100%",
    maxWidth: "400px",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "24px",
    color: "black", // 카드 제목 색상 명시
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  },
  stockInfo: {
    textAlign: "center",
  },
  stockIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#2D59F7",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 auto 16px",
  },
  stockName: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "black", // 주식 이름 색상 명시
  },
  stockPrice: {
    fontSize: "20px",
    color: "#2D59F7",
    fontWeight: "bold",
  },
  loading: {
    color: "#666",
    fontSize: "16px",
  },
  question: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "black", // 질문 텍스트 색상 명시
  },
  buttonContainer: {
    display: "flex",
    gap: "16px",
    width: "100%",
  },
  button: {
    flex: 1,
    border: "none",
    borderRadius: "30px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 0.3s",
  },
  upButton: {
    backgroundColor: "#FF6B6B",
  },
  downButton: {
    backgroundColor: "#2D59F7",
  },
  arrowUp: {
    fontSize: "24px",
    marginBottom: "8px",
  },
  arrowDown: {
    fontSize: "24px",
    marginBottom: "8px",
  },
  message: {
    padding: "12px",
    borderRadius: "4px",
    textAlign: "center",
    fontWeight: "bold",
  },
  successMessage: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  errorMessage: {
    backgroundColor: "#F44336",
    color: "white",
  },
  footer: {
    backgroundColor: "white",
    padding: "16px",
    borderTop: "1px solid #E5E7EB",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "300px",
    margin: "0 auto",
  },
  navItem: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#E5E7EB",
  },
  activeNavItem: {
    backgroundColor: "#2D59F7",
  },
};

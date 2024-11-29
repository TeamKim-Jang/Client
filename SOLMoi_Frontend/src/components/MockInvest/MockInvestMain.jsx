"use client";

import React, { useState, useEffect, useCallback } from "react";

const formatNumber = (num) => {
  return new Intl.NumberFormat("ko-KR").format(num);
};

const formatPercent = (num) => {
  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);
};

export default function MockInvestMain() {
  const [balanceData, setBalanceData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [balanceResponse, stockResponse] = await Promise.all([
        fetch("http://localhost:3000/api/invest/main/balance/3"),
        fetch("http://localhost:3000/api/invest/main/portfoliostock/3"),
      ]);
      const balanceData = await balanceResponse.json();
      const stockData = await stockResponse.json();
      setBalanceData(balanceData.data[0]);
      setStockData(stockData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up polling interval (e.g., every 5 seconds)
    const intervalId = setInterval(fetchData, 5000);
    console.log("fetched data");
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchData]);

  if (isLoading || !balanceData || !stockData) return null;

  const cashBalance = parseFloat(balanceData.cash_balance);
  const totalInvestment = parseFloat(balanceData.total_investment);
  const totalProfitLoss = parseFloat(balanceData.total_profit_loss);
  const totalBalance = cashBalance + totalInvestment;
  const totalProfitLossRate = (totalProfitLoss / totalInvestment) * 100;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>로고</h1>
      </div>

      {/* Main Balance */}
      <div style={styles.balanceSection}>
        <div style={styles.balanceContainer}>
          <div>
            <div style={styles.totalBalance}>
              {formatNumber(totalBalance)}원
            </div>
            <div style={styles.profitLoss}>
              {formatNumber(totalProfitLoss)}원 (
              {formatPercent(totalProfitLossRate)}%)
            </div>
          </div>
          <div style={styles.investmentCashContainer}>
            <div style={styles.investmentCashItem}>
              <div style={styles.label}>투자</div>
              <div style={styles.value}>{formatNumber(totalInvestment)}원</div>
            </div>
            <div style={styles.investmentCashItem}>
              <div style={styles.label}>현금</div>
              <div style={styles.value}>{formatNumber(cashBalance)}원</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stocks Section */}
      <div style={styles.stocksSection}>
        <h2 style={styles.sectionTitle}>주식</h2>
        <div style={styles.stocksList}>
          {stockData.map((stock) => (
            <div key={stock.portfoliostock_id} style={styles.stockItem}>
              <div style={styles.stockInfo}>
                <div style={styles.logoContainer}>
                  <div style={styles.logo}>{stock.name.charAt(0)}</div>
                </div>
                <div>
                  <div style={styles.stockName}>{stock.name}</div>
                  <div style={styles.stockCode}>{stock.symbol}</div>
                </div>
              </div>
              <div style={styles.stockPriceInfo}>
                <div style={styles.currentPrice}>
                  {formatNumber(stock.current_price)}원
                </div>
                <div
                  style={
                    stock.price_change >= 0
                      ? styles.priceChangePositive
                      : styles.priceChangeNegative
                  }
                >
                  {stock.price_change >= 0 ? "+" : ""}
                  {formatNumber(stock.price_change)}원 (
                  {formatPercent(
                    (stock.price_change /
                      (stock.current_price - stock.price_change)) *
                      100
                  )}
                  %)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer style={styles.bottomNav}>
        <div style={styles.navItems}>
          <div style={{ ...styles.navItem, ...styles.activeNavItem }}></div>
          <div style={styles.navItem}></div>
          <div style={styles.navItem}></div>
          <div style={styles.navItem}></div>
          <div style={styles.navItem}></div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8F9FB",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: "black",
  },
  header: {
    padding: "16px 20px",
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: "18px",
    fontWeight: "500",
    textAlign: "center",
    margin: 0,
  },
  balanceSection: {
    padding: "32px 20px 24px",
    backgroundColor: "white",
  },
  balanceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  totalBalance: {
    fontSize: "40px",
    fontWeight: "bold",
    lineHeight: "1.2",
  },
  profitLoss: {
    color: "#2D59F7",
    fontSize: "18px",
    marginTop: "4px",
  },
  investmentCashContainer: {
    textAlign: "right",
  },
  investmentCashItem: {
    marginBottom: "16px",
  },
  label: {
    color: "#6B7280",
    fontSize: "14px",
    marginBottom: "4px",
  },
  value: {
    fontSize: "18px",
    fontWeight: "500",
  },
  stocksSection: {
    padding: "24px 20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "16px",
  },
  stocksList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  stockItem: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockInfo: {
    display: "flex",
    alignItems: "center",
  },
  logoContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#F3F4F6",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    backgroundColor: "#1428A0",
  },
  stockName: {
    fontWeight: "500",
  },
  stockCode: {
    color: "#6B7280",
    fontSize: "14px",
  },
  stockPriceInfo: {
    textAlign: "right",
  },
  currentPrice: {
    fontSize: "16px",
    fontWeight: "500",
  },
  priceChangePositive: {
    color: "#10B981",
    fontSize: "14px",
  },
  priceChangeNegative: {
    color: "#EF4444",
    fontSize: "14px",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTop: "1px solid #E5E7EB",
    padding: "16px",
  },
  navItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

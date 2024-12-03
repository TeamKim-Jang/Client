"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./MockInvestMain.css";


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
        fetch("http://localhost:3001/api/portfolio/3"),
        fetch("http://localhost:3001/api/portfoliostock/3"),
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
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1 className="headerTitle">로고</h1>
      </div>

      {/* Main Balance */}
      <div className="balanceSection">
        <div className="balanceContainer">
          <div>
            <div className="totalBalance">{formatNumber(totalBalance)}원</div>
            <div className="profitLoss">
              {formatNumber(totalProfitLoss)}원 (
              {formatPercent(totalProfitLossRate)}%)
            </div>
          </div>
          <div className="investmentCashContainer">
            <div className="investmentCashItem">
              <div className="label">투자</div>
              <div className="value">{formatNumber(totalInvestment)}원</div>
            </div>
            <div className="investmentCashItem">
              <div className="label">현금</div>
              <div className="value">{formatNumber(cashBalance)}원</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stocks Section */}
      <div className="stocksSection">
        <h2 className="sectionTitle">주식</h2>
        <div className="stocksList">
          {stockData.map((stock) => (
            <div key={stock.portfoliostock_id} className="stockItem">
              <div className="stockInfo">
                <div className="logoContainer">
                  <div className="logo">{stock.name.charAt(0)}</div>
                </div>
                <div>
                  <div className="stockName">{stock.name}</div>
                  <div className="stockCode">{stock.symbol}</div>
                </div>
              </div>
              <div className="stockPriceInfo">
                <div className="currentPrice">
                  {formatNumber(stock.current_price)}원
                </div>
                <div
                  className={
                    stock.price_change >= 0
                      ? "priceChangePositive"
                      : "priceChangeNegative"
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
      <footer className="bottomNav">
        <div className="navItems">
          <div className="navItem activeNavItem"></div>
          <div className="navItem"></div>
          <div className="navItem"></div>
          <div className="navItem"></div>
          <div className="navItem"></div>
        </div>
      </footer>
    </div>
  );
}

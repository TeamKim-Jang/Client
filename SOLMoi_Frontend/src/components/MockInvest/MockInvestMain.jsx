'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MockInvestMain.css';
import game from '../../assets/images/game.png'

const formatNumber = (num) => {
  return new Intl.NumberFormat('ko-KR').format(num || 0);
};

const formatPercent = (num) => {
  return new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num || 0);
};

export default function MockInvestMain() {
  const navigate = useNavigate();
  const [balanceData, setBalanceData] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutRef = useRef(null);
  const userId = sessionStorage.getItem('user_id');

  const fetchData = useCallback(async () => {
    if (!userId) {
      console.error('User ID not found in sessionStorage');
      return;
    }

    try {
      const [balanceResponse, stockResponse] = await Promise.all([
        fetch(`/api/portfolio/${userId}`),
        fetch(`/api/portfoliostock/${userId}`),
      ]);
      const balanceData = await balanceResponse.json();
      const stockData = await stockResponse.json();
      setBalanceData(balanceData.data[0] || {});
      setStockData(stockData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      setIsUpdating(true);
      fetchData();
      timeoutRef.current = setTimeout(() => setIsUpdating(false), 300);
    }, 5000);

    return () => {
      clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fetchData]);

  // 기본값 설정
  const cashBalance = parseFloat(balanceData?.cash_balance || 0);
  const totalInvestment = parseFloat(balanceData?.total_investment || 0);
  const totalProfitLoss = parseFloat(balanceData?.total_profit_loss || 0);
  const totalBalance = cashBalance + totalInvestment;
  const totalProfitLossRate = totalInvestment
    ? (totalProfitLoss / totalInvestment) * 100
    : 0;

  return (
    <div className="containerMock">
      {/* Header */}

      {/* Main Balance */}
      <div className={`balanceSection ${isUpdating ? 'updating' : ''}`}>
        <div className="balanceContainer">
          <div>
            <div className="totalBalance">{formatNumber(totalBalance)}원</div>
            <div
              className={`profitLoss ${
                totalProfitLoss < 0 ? 'negative' : 'positive'
              }`}
            >
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
        <h2 className="sectionTitle">내 주식</h2>
        <div className="stocksList">
          {stockData.length > 0 ? (
            stockData.map((stock) => (
              <div
                key={stock.portfoliostock_id}
                className={`stockItem ${isUpdating ? 'updating' : ''}`}
              >
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
                        ? 'priceChangePositive'
                        : 'priceChangeNegative'
                    }
                  >
                    {stock.price_change >= 0 ? '+' : ''}
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
            ))
          ) : (
            <div className="noStocksMessage"></div>
          )}
        </div>
      </div>
      <footer className="bottomNav">
        <div className="navItems">
          <div className="navItem activeNavItem"></div>
          <div
            className="navItem"
            onClick={() => navigate('/updowngame')}
          ></div>
          <div className="navItem"
          onClick={() => navigate('/solleafcontent')}>
            <img src={game} alt="game" className="navImage" />
          </div>
        </div>
      </footer>
    </div>
  );
}
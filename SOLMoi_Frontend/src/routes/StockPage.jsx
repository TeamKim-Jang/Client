import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CandlestickChart from "../components/CandlestickChart.jsx";

const StockPage = () => {
  const { stockCode } = useParams();
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/stock/${stockCode}`);
        const apiData = response.data;

        const formattedData = apiData.data.map((item) => ({
          date: new Date(item.date), // Date 객체로 변환
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        console.log("Formatted Data:", formattedData);
        setStockData(formattedData);
      } catch (err) {
        console.error("Error fetching stock data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [stockCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="chart-container">
      <h1>삼성전자 [{stockCode}]</h1>
      <CandlestickChart data={stockData} width={800} height={400} />
    </div>
  );
};

export default StockPage;

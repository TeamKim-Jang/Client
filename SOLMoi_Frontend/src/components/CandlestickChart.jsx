import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ChartCanvas,
  Chart,
  XAxis,
  YAxis,
  CandlestickSeries,
  discontinuousTimeScaleProvider,
  OHLCTooltip,
  EdgeIndicator,
} from "react-financial-charts";

const CandlestickChart = ({ stockCode, duration }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/stock/${stockCode}?duration=${duration}`
      );

      const formattedData = response.data.data.map((item) => ({
        date: new Date(item.date),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
      setData(formattedData);
    } catch (err) {
      console.error("Error fetching stock data:", err.message);
      setError("차트 데이터를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stockCode && duration) {
      fetchData();
    }
  }, [duration, stockCode]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  const margin = { left: 50, right: 80, top: 40, bottom: 50 };
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);
  const xExtents = [xAccessor(chartData[0]), xAccessor(chartData[chartData.length - 1])];

  const highestPoint = Math.max(...data.map((d) => d.high));
  const lowestPoint = Math.min(...data.map((d) => d.low));
  const currentPrice =
    duration === "1D" && data.length > 0 ? data[data.length - 1].close.toLocaleString() : "N/A";

  return (
    <div style={{ background: "#F9FAFB", padding: "20px", borderRadius: "10px" }}>
      {/* 상단 현재가 표시 */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "36px", margin: 0, color: "#333" }}>
          {currentPrice} 원
        </h1>
        <p style={{ fontSize: "16px", margin: 0, color: "#777" }}>
          {duration === "1D" ? "현재가 (일봉 기준)" : "일봉 데이터를 기준으로 표시됩니다"}
        </p>
      </div>

      <ChartCanvas
        height={400}
        width={800}
        ratio={1}
        margin={margin}
        data={chartData}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        seriesName="Candlestick Chart"
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={[lowestPoint * 0.95, highestPoint * 1.05]}>
          <XAxis axisAt="bottom" orient="bottom" stroke="transparent" tickStroke="#333" />
          <YAxis axisAt="left" orient="left" stroke="transparent" tickStroke="#333" />

          <CandlestickSeries
            wickStroke={(d) => (d.close >= d.open ? "#007AFF" : "#FF3B30")}
            fill={(d) => (d.close >= d.open ? "#007AFF" : "#FF3B30")}
            stroke={(d) => (d.close >= d.open ? "#007AFF" : "#FF3B30")}
          />

          <OHLCTooltip origin={[10, 10]} textFill="#333333" fontSize={12} />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            displayFormat={(value) => `최고 ${value.toLocaleString()}`}
            yAccessor={() => highestPoint}
            lineStroke="red"
            textFill="red"
            fill="transparent"
            rectWidth={70}
            rectHeight={20}
          />

          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            displayFormat={(value) => `최저 ${value.toLocaleString()}`}
            yAccessor={() => lowestPoint}
            lineStroke="blue"
            textFill="blue"
            fill="transparent"
            rectWidth={70}
            rectHeight={20}
          />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default CandlestickChart;

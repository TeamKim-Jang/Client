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
} from "react-financial-charts";

const CandlestickChart = ({ stockCode, duration, periodType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(
        `Fetching stock data for ${stockCode} with duration: ${duration}, periodType: ${periodType}`
      );
      const response = await axios.get(
        `http://localhost:3001/api/stock/${stockCode}?duration=${duration}&periodType=${periodType}`
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (stockCode && periodType) {
      fetchData();
    }
  }, [duration, stockCode, periodType]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  const margin = { left: 50, right: 50, top: 10, bottom: 30 };
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);
  const xExtents = [xAccessor(chartData[0]), xAccessor(chartData[chartData.length - 1])];

  return (
    <div style={{ background: "#F9FAFB", padding: "20px", borderRadius: "10px" }}>
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
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            tickStroke="#333333"
            stroke="#E0E0E0"
          />
          <YAxis
            axisAt="left"
            orient="left"
            tickStroke="#333333"
            stroke="#E0E0E0"
          />
          <CandlestickSeries
            wickStroke={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")}
            fill={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")}
            stroke={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")}
            candleStrokeWidth={1}
          />
          <OHLCTooltip origin={[-40, 0]} textFill="#333333" />
        </Chart>
      </ChartCanvas>
    </div>
  );
};

export default CandlestickChart;

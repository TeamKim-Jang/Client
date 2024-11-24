import React, { useEffect, useState } from "react";
import { ChartCanvas, Chart, series, axes, scale } from "react-financial-charts";
import axios from "axios";

const { CandlestickSeries } = series;
const { XAxis, YAxis } = axes;
const { discontinuousTimeScaleProvider } = scale;

const StockChart = (stockCode) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/stock/${stockCode}`);
        const stockData = response.data;
        const formattedData = stockData.map((d) => ({
          date: new Date(d.timestamp),
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
          volume: d.volume,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [stockCode]);

  if (data.length === 0) {
    return <p>Loading chart...</p>;
  }

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);

  return (
    <ChartCanvas
      height={400}
      width={800}
      ratio={3}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      seriesName={stockCode}
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis />
        <YAxis />
        <CandlestickSeries />
      </Chart>
    </ChartCanvas>
  );
};

export default StockChart;

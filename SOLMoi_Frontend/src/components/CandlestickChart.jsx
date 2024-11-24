import React from "react";
import {
  ChartCanvas,
  Chart,
  XAxis,
  YAxis,
  CandlestickSeries,
  discontinuousTimeScaleProvider,
  OHLCTooltip,
} from "react-financial-charts";

const CandlestickChart = ({ data, width, height }) => {
  if (!data || data.length === 0) {
    return <p>No data available to display chart</p>;
  }

  const margin = { left: 50, right: 50, top: 10, bottom: 30 };
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(data);

  const xExtents = [
    xAccessor(chartData[0]),
    xAccessor(chartData[chartData.length - 1]),
  ];

  return (
    <ChartCanvas
      height={height}
      width={width}
      ratio={1}
      margin={margin}
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      seriesName="Candlestick Chart"
      xExtents={xExtents}
      style={{ background: "#F9FAFB" }} // 밝은 배경색
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        <XAxis
          axisAt="bottom"
          orient="bottom"
          tickStroke="#333333" // 축 글자 색상
          stroke="#E0E0E0" // 축 선 색상
        />
        <YAxis
          axisAt="left"
          orient="left"
          tickStroke="#333333" // 축 글자 색상
          stroke="#E0E0E0" // 축 선 색상
        />
        <CandlestickSeries
          wickStroke={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")} // 양봉 빨강, 음봉 파랑
          fill={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")} // 캔들 몸체 색상
          stroke={(d) => (d.close > d.open ? "#FF3B30" : "#007AFF")} // 캔들 테두리
          candleStrokeWidth={1} // 테두리 두께
        />
        <OHLCTooltip
          origin={[-40, 0]} // 위치
          textFill="#333333" // 텍스트 색상
        />
      </Chart>
    </ChartCanvas>
  );
};

export default CandlestickChart;

import React from "react";
import { useParams } from "react-router-dom";

const SellBoard = () => {
  const { stockCode } = useParams();

  return (
    <div>
      <h1>{stockCode} 매도</h1>
      <p>매도할 주식 수를 입력하세요.</p>
      
    </div>
  );
};

export default SellBoard;

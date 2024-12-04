import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BuyBoard = () => {
  const { stockCode } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNumberClick = (number) => {
    setQuantity((prev) => {
      const newValue = prev + number;
      if (newValue.split(".").length > 2) return prev;
      return newValue.length < 10 ? newValue : prev;
    });
  };

  const handleDelete = () => {
    setQuantity((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      setError("유효한 수량을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const response = await axios.post("/api/trade/buy", {
        userId: 1, // 유저 ID로 변경해야댐
        stockId: stockCode,
        quantity: parseFloat(quantity),
      });

      setSuccess(true);
      console.log("매수 성공:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "매수 요청 중 오류가 발생했습니다.");
      console.error("매수 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <div style={{ textAlign: "left", marginBottom: "20px", fontSize: "16px" }}>
        <a
          onClick={() => navigate(`/stock/${stockCode}`)}
          style={{ textDecoration: "none", color: "#007AFF", cursor: "pointer" }}
        >
          ←
        </a>
      </div>
      <h1 style={{ fontSize: "20px", margin: "10px 0" }}>삼성전자 {stockCode}</h1>
      <p style={{ fontSize: "16px", color: "#777", marginBottom: "20px" }}>몇 주 사시겠어요?</p>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#333",
          padding: "10px",
          borderRadius: "8px",
          width: "300px",
          margin: "0 auto 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ flex: 1, textAlign: "right", paddingRight: "5px", overflow: "hidden", whiteSpace: "nowrap" }}>
          {quantity || "0"}
        </span>
        <span style={{ flexShrink: 0 }}>주</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          maxWidth: "300px",
          margin: "0 auto 20px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            style={{
              padding: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "white",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
        <button
          style={{
            padding: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => handleNumberClick(".")}
        >
          .
        </button>
        <button
          style={{
            padding: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            backgroundColor: "white",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => handleNumberClick(0)}
        >
          0
        </button>
        <button
          style={{
            padding: "20px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "8px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          ⬅︎ 삭제
        </button>
      </div>
      {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}
      {success && <p style={{ color: "green", marginBottom: "20px" }}>매수 성공!</p>}
      <button
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "#007AFF",
          color: "#FFF",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100px",
          margin: "0 auto",
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "처리 중..." : "사기"}
      </button>
    </div>
  );
};

export default BuyBoard;

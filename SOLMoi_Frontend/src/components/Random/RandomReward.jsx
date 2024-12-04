import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RandomReward.css";

const rewards = [
  { id: 1, emoji: "💥", text: "꽝", value: 0 },
  { id: 2, emoji: "🌱", text: "1쏠잎", value: 1 },
  { id: 3, emoji: "🌱", text: "2쏠잎", value: 2 },
  { id: 4, emoji: "🌱", text: "1쏠잎", value: 1 },
  { id: 5, emoji: "🎊", text: "10쏠잎", value: 10 },
  { id: 6, emoji: "🌱", text: "3쏠잎", value: 3 },
  { id: 7, emoji: "💥", text: "꽝", value: 0 },
  { id: 8, emoji: "🌱", text: "1쏠잎", value: 1 },
  { id: 9, emoji: "💥", text: "꽝", value: 0 },
];

const RandomReward = () => {
  const [locked, setLocked] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false); // 서버 요청 중 상태

  const today = new Date().toISOString().split("T")[0]; // 오늘 날짜

  useEffect(() => {
    // 새로고침해도 상태 유지: 로컬 스토리지에서 "오늘 뽑기 여부" 확인
    const storedDrawDate = localStorage.getItem("draw_date");
    if (storedDrawDate === today) {
      setLocked(false); // 오늘 이미 뽑기 완료 상태
    }
  }, []);

  const unlockRewards = async () => {
    setLocked(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      setHoverIndex(currentIndex);
      currentIndex = (currentIndex + 1) % rewards.length;
    }, 500);

    setTimeout(async () => {
      clearInterval(interval);
      const randomIndex = Math.floor(Math.random() * rewards.length);
      setHoverIndex(null);
      setSelectedIndex(randomIndex);

      const reward = rewards[randomIndex];
      const value = reward.value;

      try {
        setIsFetching(true);
        const userId = sessionStorage.getItem("user_id"); // 사용자 ID
        const response = await axios.post("/api/rewards/draw", {
          user_id: userId,
          reward_value: value,
        });

        if (response.data.success) {
          setPopupMessage(
            value === 0
              ? "아쉬워요😢 내일 다시 도전해주세요😤"
              : `축하해요👏 ${value}쏠잎을 받으셨습니다!`
          );
          // 오늘 뽑기 완료 기록
          localStorage.setItem("draw_date", today);
          setLocked(false); // 다시 뽑기 비활성화
        } else {
          setPopupMessage("오늘 이미 뽑기를 했습니다! 내일 다시 도전하세요!");
        }
      } catch (error) {
        setPopupMessage("오류가 발생했습니다. 다시 시도해주세요.");
        console.error("Error updating reward:", error);
      } finally {
        setShowPopup(true);
        setIsFetching(false);
      }
    }, 5000);
  };

  return (
    <div className="reward-container">
      <h2 className="reward-title">나와라 쏠잎 ~~ 🌱</h2>
      <div className="reward-grid">
        {rewards.map((reward, index) => (
          <div
            key={reward.id}
            className={`reward-item 
              ${locked ? "locked" : ""}
              ${hoverIndex === index ? "hovered" : ""}
              ${selectedIndex === index ? "selected" : ""}
            `}
          >
            <span className="reward-emoji">{reward.emoji}</span>
            <span className="reward-text">{reward.text}</span>
          </div>
        ))}
      </div>
      <button
        className="unlock-button"
        onClick={unlockRewards}
        disabled={!locked || isFetching}
      >
        {locked ? "뽑기" : "내일 다시 열려요"}
      </button>

      {/* 팝업 */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomReward;

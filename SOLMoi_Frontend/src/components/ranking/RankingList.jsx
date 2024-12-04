import React from "react";
import TierIcon from "./TierIcon";
import { useUser } from "../../contexts/userContext";

const RankingList = ({ rankings }) => {
  const { userId } = useUser();

  return (
    <div className="ranking-list">
      {rankings.map((rank, index) => (
        <div
          key={rank.user_id || index}
          className="ranking-item"
          style={{
            backgroundColor: rank.user_id === parseInt(userId, 10) ? "#E0F7FA" : "transparent",
            borderRadius: "8px", 
            padding: "10px", 
            marginBottom: "10px",
          }}
        >
          <div className="ranking-index">
            {index === 0 && <span className="medal gold">🥇</span>}
            {index === 1 && <span className="medal silver">🥈</span>}
            {index === 2 && <span className="medal bronze">🥉</span>}
            {index > 2 && <span className="rank-circle">{index + 1}</span>}
          </div>
          <div className="ranking-info">
            <span className="ranking-name">{rank.User?.nickname || "익명"}</span>
            <br />
            <span
              className="ranking-profit"
              style={{
                color: rank.total_profit_loss >= 0 ? "red" : "blue",
              }}
            >
              {rank.total_profit_loss >= 0 ? "+" : ""}
              {rank.total_profit_loss.toLocaleString()}원
            </span>
          </div>
          <TierIcon tier={rank.tier} />
        </div>
      ))}
    </div>
  );
};

export default RankingList;

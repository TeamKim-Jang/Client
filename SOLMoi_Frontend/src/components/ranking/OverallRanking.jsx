import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TreeDeciduous } from 'lucide-react';
import '../../styles/OverallRanking.css';

const OverallRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/ranking/overall');
        setRankings(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rankings:", err.message);
        setError('데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="overall-ranking-container">
      <header className="ranking-header">
        <h1>전체 랭킹</h1>
      </header>

      <div className="ranking-list">
        {rankings.map((rank, index) => (
          <div key={rank.user_id} className="ranking-item">
            <div className="ranking-index">
              {index === 0 && <span className="medal gold">🥇</span>}
              {index === 1 && <span className="medal silver">🥈</span>}
              {index === 2 && <span className="medal bronze">🥉</span>}
              {index > 2 && <span>{index + 1}</span>}
            </div>

            <div className="ranking-info">
              <span className="ranking-name">{rank.User.nickname}</span>
              <span className="ranking-profit">+{rank.total_profit_loss.toLocaleString()}원</span>
            </div>

          </div>
        ))}
      </div>

      <footer className="ranking-footer">
        <span className="footer-trophy">🏆</span>
        <p>랭킹은 2주 기준 금액으로 업데이트되며, 반영에 시간이 걸릴 수 있습니다.</p>
      </footer>
    </div>
  );
};

export default OverallRanking;

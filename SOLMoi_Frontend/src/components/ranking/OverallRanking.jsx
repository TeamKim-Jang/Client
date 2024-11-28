import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/OverallRanking.css';
import treeIcon from '../../assets/쏠나무.png';
import coneIcon from '../../assets/쏠방울.png';
import seedIcon from '../../assets/쏠씨.png';

const OverallRanking = () => {
  const [currentTab, setCurrentTab] = useState('overall'); // "전체" or "학교"
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async (endpoint) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/ranking/${endpoint}`);
      const sortedRankings = response.data.data.sort(
        (a, b) => b.total_profit_loss - a.total_profit_loss
      ); // 수익금 기준으로 정렬
      setRankings(sortedRankings);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching rankings:", err.message);
      setError('데이터를 불러오는 데 실패했습니다.');
      setLoading(false);
    }
  };

  const getTierIcon = (index) => {
    const percentage = ((index + 1) / rankings.length) * 100;
    if (percentage <= 10) return treeIcon; // 상위 10%: 쏠나무
    if (percentage <= 55) return coneIcon; // 상위 55%: 쏠방울
    return seedIcon; // 나머지: 쏠씨
  };

  useEffect(() => {
    fetchRankings('overall');
  }, []);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
    fetchRankings(tab === 'overall' ? 'overall' : 'school');
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="overall-ranking-container">
      <div className="ranking-tabs">
        <div
          className={`tab ${currentTab === 'overall' ? 'active' : ''}`}
          onClick={() => handleTabChange('overall')}
        >
          전체
        </div>
        <div
          className={`tab ${currentTab === 'school' ? 'active' : ''}`}
          onClick={() => handleTabChange('school')}
        >
          학교
        </div>
      </div>

      <div className="ranking-list">
        {rankings.map((rank, index) => (
          <div key={rank.user_id || index} className="ranking-item">
            <div className="ranking-index">
              {index === 0 && <span className="medal gold">🥇</span>}
              {index === 1 && <span className="medal silver">🥈</span>}
              {index === 2 && <span className="medal bronze">🥉</span>}
              {index > 2 && (
                <span className="rank-number">
                  <span className="rank-circle">{index + 1}</span>
                </span>
              )}
            </div>
            <div className="ranking-info">
              <span className="ranking-name">{rank.User?.nickname || '익명'}</span>
              <br />
              <span className="ranking-profit">+{rank.total_profit_loss.toLocaleString()}원</span>
            </div>
            <div className="tier-icon">
              <img src={getTierIcon(index)} alt="Tier Icon" className="tier-image" />
            </div>
          </div>
        ))}
      </div>

      <footer className="ranking-footer">
        <span className="footer-icon">🏆</span>
        <p>랭킹은 2주 기준 금액으로 업데이트되며, 반영에 시간이 걸릴 수 있습니다.</p>
      </footer>
    </div>
  );
};

export default OverallRanking;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RankingTabs from './RankingTabs';
import RankingList from './RankingList';
import '../../styles/OverallRanking.css';

const OverallRanking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/ranking/overall');
        setRankings(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching rankings:", err.message);
        setError('전체 랭킹 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="overall-ranking-container">
      <RankingTabs currentTab="overall" />
      <RankingList rankings={rankings} />
      <footer className="ranking-footer">
        <span className="footer-icon">🏆</span>
        <p>랭킹은 2주 기준 금액으로 업데이트되며, 반영에 시간이 걸릴 수 있습니다.</p>
      </footer>
    </div>
  );
};

export default OverallRanking;

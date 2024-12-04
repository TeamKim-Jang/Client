import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RankingTabs from './RankingTabs';
import RankingList from './RankingList';
import SchoolFooter from './SchoolFooter';
import '../../styles/OverallRanking.css';

const SchoolRanking = () => {
  const { schoolId } = useParams();
  const [rankings, setRankings] = useState([]);
  const [schoolRank, setSchoolRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateTier = (rankings) => {
    const totalUsers = rankings.length;
    return rankings.map((rank, index) => {
      const percentage = ((index + 1) / totalUsers) * 100;
      let tier = '쏠씨';
      if (percentage <= 10) tier = '쏠나무';
      else if (percentage <= 55) tier = '쏠방울';
      return { ...rank, tier };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rankingsResponse, schoolRankResponse] = await Promise.all([
          axios.get(`/api/ranking/school/${schoolId}`),
          axios.get(`/api/ranking/schoolrank/${schoolId}`),
        ]);
        
        const rankingsWithTier = calculateTier(rankingsResponse.data.data);
        setRankings(rankingsWithTier);

        //소속 학교의 랭킹
        setSchoolRank(schoolRankResponse.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching school ranking data:", err.message);
        setError('학교 랭킹 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolId]);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="overall-ranking-container">
      <RankingTabs currentTab="school" />
      <RankingList rankings={rankings} />
      {schoolRank && <SchoolFooter schoolRank={schoolRank} />}
    </div>
  );
};

export default SchoolRanking;

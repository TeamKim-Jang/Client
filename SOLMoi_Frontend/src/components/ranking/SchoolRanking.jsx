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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rankingsResponse, schoolRankResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/ranking/school/${schoolId}`),
          axios.get(`http://localhost:3001/api/ranking/schoolrank/${schoolId}`),
        ]);
        setRankings(rankingsResponse.data.data);
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

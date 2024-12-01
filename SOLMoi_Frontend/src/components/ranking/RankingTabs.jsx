import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/RankingTabs.css';

const RankingTabs = ({ currentTab }) => {
  const navigate = useNavigate();
  const { schoolId } = useParams();

  const handleTabChange = (tab) => {
    if (tab === 'overall') {
      navigate('/ranking/overall');
    } else if (tab === 'school') {
      navigate(`/ranking/school/${schoolId || 1}`); 
    }
  };

  return (
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
  );
};

export default RankingTabs;

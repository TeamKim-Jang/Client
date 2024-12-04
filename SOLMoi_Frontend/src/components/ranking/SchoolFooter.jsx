import React from 'react';

const SchoolFooter = ({ schoolRank }) => {
  return (
    <footer className="school-ranking-footer">
      <span className="footer-content">
        <span className="footer-icon">🏆 </span>
        <strong>{schoolRank.school_name}</strong> {schoolRank.rank}위
      </span>
    </footer>
  );
};

export default SchoolFooter;

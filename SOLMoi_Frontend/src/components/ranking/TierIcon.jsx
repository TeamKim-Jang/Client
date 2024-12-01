import React from 'react';

const TierIcon = ({ tier }) => {
  const tierImages = {
    쏠나무: '../../assets/쏠나무.png',
    쏠방울: '../../assets/쏠방울.png',
    쏠씨: '../../assets/쏠씨.png',
  };

  return (
    <div className="tier-icon">
      <img src={tierImages[tier]} alt={tier} />
    </div>
  );
};

export default TierIcon;

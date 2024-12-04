import React from 'react';
import 쏠나무 from '../../assets/쏠나무.png';
import 쏠방울 from '../../assets/쏠방울.png';
import 쏠씨 from '../../assets/쏠씨.png';

const TierIcon = ({ tier }) => {
  const tierImages = {
    쏠나무: 쏠나무,
    쏠방울: 쏠방울,
    쏠씨: 쏠씨,
  };

  return (
    <div className="tier-icon">
      <img src={tierImages[tier]} alt={tier} />
    </div>
  );
};

export default TierIcon;

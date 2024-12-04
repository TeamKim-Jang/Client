import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SolMainPage.css';
import bear1 from '../../../src/assets/images/imageBear1.png';
import up from '../../../src/assets/images/imageUp.png';
import card from '../../../src/assets/images/image1.png';
import leafL from '../../../src/assets/images/image-leafL.png';
import leafR from '../../../src/assets/images/image-leafR.png';
import cou from '../../../src/assets/images/image-cou.png';
import walk from '../../../src/assets/images/image-walk.png';
import random from "../../../src/assets/images/random.png";

import { useNavigate } from 'react-router-dom';

export default function InvestMain() {
  const navigate = useNavigate();
  const [totalSolLeaf, setTotalSolLeaf] = useState(0); // 쏠잎 포인트 상태
  const userId = sessionStorage.getItem('user_id'); // 사용자 ID를 가져옴
  const userName = sessionStorage.getItem('user_name'); // 사용자 ID를 가져옴

  // 쏠잎 포인트를 DB에서 가져오는 함수
  const fetchTotalSolLeaf = async () => {
    try {
      const response = await axios.get(`/api/user/${userId}/total_sol_leaf`);
      setTotalSolLeaf(response.data.total_sol_leaf); // 상태 업데이트
    } catch (error) {
      console.error('❌ 쏠잎 포인트 가져오기 실패:', error.message);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    if (userId) {
      fetchTotalSolLeaf();
    }
  }, [userId]);

  return (
    <div className="bank-app">
      {/* Header */}
      <div className="rectangle-9">
        <span style={{ fontSize: '25px' }}>👻</span>{' '}
        <div className="profile"style={{fontFamily: 'Paperlogy-4Regular, sans-serif'}}>{userName}</div>
      </div>

      {/* Main Card */}
      <div className="rectangle-12" style={{fontFamily: 'Paperlogy-4Regular, sans-serif'}}>
        <img className="image-card" src={card} />
        머니
      </div>
      <div className="main-card2">
        <div className="account-info">
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            123456-24-123456
            <div style={{ display: 'flex', gap: '3px' }}>
              <div className="rectangle-16"></div>
              <div className="rectangle-17"></div>
            </div>
          </p>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            333,333원
          </h2>
        </div>
      </div>

      {/* 모의투자 하러가기 */}
      <button
        className="investment-card"
        onClick={() => {
          navigate('/stock');
          console.log('모의투자 하러가기!');
        }}
      >
        <h4 style={{fontFamily: 'BMJUA, sans-serif'}}>모의투자 하러 가기</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <img className="image-bear" src={bear1} alt="bear Icon" />
          <img className="image-up" src={up} alt="up Icon" />
        </div>
      </button>

      {/* 챌린지/광고/쿠폰/만보기 */}
      <div className="challenge-section">
        <div
          className="challenge-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold',padding:'15px' }}>
            🌱 현재 쏠잎 🌱
          </p>
          <div className="rectangle-333" style={{ justifyContent: 'center' }}>
            <img className="image-leafR" src={leafR} />
            <img className="image-leafL" src={leafL} />
            {totalSolLeaf}P {/* 실시간 쏠잎 포인트 표시 */}
          </div>
        </div>

        <button className="mini-card" style={{fontFamily: 'Paperlogy-6SemiBold, sans-serif'}} onClick={() => navigate("/random")}>
          쏠쏠 뽑기
          <br />
          <img src={random} className="random-img2"/>
        </button>
        
        <button className="mini-card2" disabled>
        <div style={{fontFamily: 'Paperlogy-6SemiBold, sans-serif'}} >준비중</div>
            <div className="sol-card-icon">
              {/* 로딩 애니메이션 추가 */}
              <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </button>
      </div>

      {/* Footer */}
      <div className="footer-main">
        <div class="icon-container">
          <div class="horizontal-line top"></div>
          <div class="vertical-line left-top"></div>
          <div class="vertical-line left-bottom"></div>
          <div class="horizontal-line bottom-left"></div>
          <div class="horizontal-line bottom-right"></div>
          <div class="vertical-line right-bottom"></div>
          <div class="vertical-line right-top"></div>
          <div class="horizontal-line top-right"></div>
          <div class="center-line"></div>
        </div>

        <div className="payment" style={{fontFamily: 'Paperlogy-6SemiBold, sans-serif'}}>신한 쏠모이 결제</div>
      </div>
    </div>
  );
}
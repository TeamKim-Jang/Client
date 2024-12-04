import './Solleafcontent.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import random from '../../../src/assets/images/random.png';
import solmois from '../../../src/assets/images/solmois.png';

const Solleafcontent = ({ className, ...props }) => {
  const navigate = useNavigate();

  return (
    <div className={'solleaf-container ' + className}>
      <img src={solmois} alt="solmois" className="solmois-img" />
      <h1 className="sol-header-title">쏠잎 모으기</h1>
      <div className="sol-cards-grid">
        {/* 출석 체크 카드 */}
        <button className="sol-card" onClick={() => navigate('/attendance')}>
          <div className="sol-card-icon">📅</div>
          <div className="sol-card-title">출석체크 하러가기</div>
          <div className="sol-card-subtitle">하루 한번</div>
        </button>

        {/* 주가 예측 게임 카드 */}
        <button
          className="sol-card"
          onClick={() => navigate('/predicton/predict')}
        >
          <div className="sol-card-icon">📈</div>
          <div className="sol-card-title">오를까? 내릴까?</div>
          <div className="sol-card-subtitle">주가예측게임</div>
        </button>

        {/* 금융 뉴스 카드 */}
        <button className="sol-card" onClick={() => navigate('/news')}>
          <div className="sol-card-icon">📰</div>
          <div className="sol-card-title">금융뉴스 읽기</div>
          <div className="sol-card-subtitle">뉴스 읽고 쏠받기</div>
        </button>

        {/* 순위표 카드 */}
        <button className="sol-card" onClick={() => navigate('/rankings')}>
          <div className="sol-card-icon">🏆</div>
          <div className="sol-card-title">순위표 보러가기</div>
          <div className="sol-card-subtitle">내 성적</div>
        </button>

        {/* 랜덤뽑기 */}
        <button className="sol-card" onClick={() => navigate('/rankings')}>
          <div className="sol-card-icon">
            <img src={random} alt="random" className="random-img" />
          </div>
          <div className="sol-card-title">쏠쏠 뽑기</div>
          <div className="sol-card-subtitle">랜던 뽑기 게임</div>
        </button>

        <button className="sol-card2" disabled>
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
          <div className="sol-card-title">준비중</div>
          <div className="sol-card-subtitle">더 많은 게임 준비중입니다🙏</div>
        </button>
      </div>
    </div>
  );
};

export default Solleafcontent;

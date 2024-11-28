import "./Solleafcontent.css";
import { useNavigate } from "react-router-dom";

const Solleafcontent = ({ className, ...props }) => {
  const navigate = useNavigate();

  return (
    <div className={"solleaf-container " + className}>
      <h1 className="header-title">쏠방울 모으기</h1>
      <div className="cards-grid">
        {/* 출석 체크 카드 */}
        <button
          className="card"
          onClick={() => navigate("/attendance-check")}
        >
          <div className="card-icon">📅</div>
          <div className="card-title">출석체크 하러가기</div>
          <div className="card-subtitle">하루 한번</div>
        </button>

        {/* 주가 예측 게임 카드 */}
        <button
          className="card"
          onClick={() => navigate("/stock-prediction")}
        >
          <div className="card-icon">📈</div>
          <div className="card-title">오를까? 내릴까?</div>
          <div className="card-subtitle">주가예측게임</div>
        </button>

        {/* 금융 뉴스 카드 */}
        <button
          className="card"
          onClick={() => navigate("/news")}
        >
          <div className="card-icon">📰</div>
          <div className="card-title">금융뉴스 읽기</div>
          <div className="card-subtitle">뉴스 읽고 쏠받기</div>
        </button>

        {/* 순위표 카드 */}
        <button
          className="card"
          onClick={() => navigate("/rankings")}
        >
          <div className="card-icon">🏆</div>
          <div className="card-title">순위표 보러가기</div>
          <div className="card-subtitle">내 성적</div>
        </button>
      </div>
    </div>
  );
};

export default Solleafcontent;

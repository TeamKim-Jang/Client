
import '../styles/Main.css'


export default function InvestMain() {
  return (
    <>
      <div className="rewards-app">
        <header className="header">
          <div className="profile-image"></div>
          <span className="profile-name">김쏠밈</span>
        </header>

        <div className="account-section">
          <button className="account-button money">머니</button>
          <button className="account-button rewards active">쏠임</button>
        </div>

        <div className="balance-card">
          <div className="account-number">
            <span>123456-24-123456</span>
            <button className="copy-button">
              <svg viewBox="0 0 24 24" className="copy-icon">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
            </button>
          </div>
          <div className="balance-info">
            <span className="balance-amount">333,333원</span>
            <button className="send-button">보내기</button>
          </div>
        </div>

        <div className="investment-banner">
          <span className="banner-text">모의투자 하러 가기</span>
          <div className="banner-icons">
            <div className="coin-icon"></div>
            <svg className="chart-icon" viewBox="0 0 24 24">
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
            </svg>
          </div>
        </div>

        <div className="points-section">
          <span className="points-text">
            챌린지하고<br />쏠임 모으기
          </span>
          <div className="points-info">
            <div className="points-icon"></div>
            <span className="points-amount">3,333P</span>
            <svg className="chevron-icon" viewBox="0 0 24 24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </div>
        </div>

        <div className="action-grid">
          <div className="action-card">
            <div className="action-icon ad">AD</div>
            <span className="action-text">
              광고보고<br />쏠임 모으기
            </span>
          </div>
          <div className="action-card">
            <div className="action-icon coupon">★</div>
            <span className="action-text">
              쿠폰<br />사고 팔기
            </span>
          </div>
          <div className="action-card">
            <div className="action-icon pedometer">✨</div>
            <span className="action-text">만보기</span>
          </div>
          <div className="action-card add">
            <svg className="add-icon" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
        </div>

        <div className="bottom-sheet">
          <svg className="payment-icon" viewBox="0 0 24 24">
            <path d="M7 3H17V5H7V3ZM5 7H19V9H5V7ZM3 11H21V13H3V11ZM5 15H19V17H5V15ZM7 19H17V21H7V19Z" />
          </svg>
          <span className="payment-text">신한 쏠모이 결제</span>
        </div>
      </div>
    </>
  );
}
import React from "react";
import "./InvestMain.css";
import bear from "../../src/assets/images/imageBear.png"


export default function InvestMain() {
  return (
    <div className="bank-app">
      {/* Header */}
      <div className="header">
        <div className="profile">
          <span role="img" aria-label="ghost">
            👻
          </span>{" "}
          김쏠밈
        </div>
      </div>


      {/* Main Card */}
      <div className="main-card">
        <div className="tabs">
          <div className="tab active">머니</div>
          <div className="tab">쏠잎</div>
        </div>
        <div className="account-info">
          <p>123456-24-123456 📋</p>
          <h2>333,333원</h2>
          <button className="send-button">보내기</button>
        </div>
      </div>

      {/* 모의투자 하러가기 */}
      <div className="investment-card">
        <p>모의투자 하러 가기</p>
        <img src={bear} alt="Investment Icon" />
      </div>

      {/* 챌린지/광고/쿠폰/만보기 */}
      <div className="challenge-section">
        <div className="challenge-card">
          <p>챌린지하고<br />쏠잎 모으기</p>
          <p>3,333P</p>
        </div>
        <div className="mini-card">광고보고<br />쏠잎 모으기</div>
        <div className="mini-card">쿠폰<br />사고 팔기</div>
        <div className="mini-card">만보기</div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="add-card">+</div>
        <div className="payment">신한 쏠모이 결제</div>
      </div>
    </div>
 
 );
}
import { Calendar, BarChart3, Users, Newspaper, Clock } from 'lucide-react';
import '../../styles/AttendanceCheck.css';

export default function AttendanceCheck() {
  return (
    <div className="attendance-check">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="time">9:41</div>
        <div className="icons">
          <div className="icon">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M12 3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <div className="icon">
            <svg viewBox="0 0 24 24" className="fill-current">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <h1>쏠방울 모으기</h1>
      </div>

      {/* Main Content */}
      <div className="main-card">
        <div className="title">
          <Calendar className="icon" />
          <h2>출석체크</h2>
          <Calendar className="icon" />
        </div>

        <p className="description">
          매일매일 출석만 해도 포인트가 쏠쏠!<br />
          출석할수록 커지는 혜택을 확인해보세요
        </p>

        <div className="progress-circle">
          <div className="circle">
            <div className="mask full">
              <div className="fill"></div>
            </div>
            <div className="mask half">
              <div className="fill"></div>
            </div>
            <div className="inside-circle">
              <span className="label">이달의 출석횟수</span>
              <span className="count">3</span>
            </div>
          </div>
        </div>

        <button className="check-in-button">
          오늘 출석체크 하기
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Clock className="icon" />
        <div className="active-icon"></div>
        <BarChart3 className="icon" />
        <Newspaper className="icon" />
        <Users className="icon" />
      </div>
    </div>
  );
}
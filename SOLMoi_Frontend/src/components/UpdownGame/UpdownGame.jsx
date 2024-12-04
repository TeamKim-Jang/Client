import { Calendar, BarChart3, Users, Newspaper, Clock } from 'lucide-react';
import '../../styles/AttendanceCheck.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import solleaf10 from '../../assets/images/solleaf10.png';

export default function AttendanceCheck() {
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [solAnimation, setSolAnimation] = useState(false);

  useEffect(() => {
    const fetchMonthlyAttendance = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const email = sessionStorage.getItem("email");

        if (!token || !email) {
          throw new Error("로그인 정보가 유효하지 않습니다. 로그인해주세요.");
        }

        const response = await axios.get("http://localhost:3001/api/attendance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMonthlyCount(response.data.monthlyAttendanceCount);
        setTodayCheckedIn(response.data.hasCheckInToday);
        setUserName(sessionStorage.getItem("user_name"));

        // Check if animation should show
        if (response.data.hasCheckInToday && !localStorage.getItem("animationClosed")) {
          setSolAnimation(true);
        }
      } catch (error) {
        console.error("Error fetching montly attendance: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyAttendance();
  }, []);

  const checkInAttendance = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("로그인 정보가 없습니다.");

      const response = await axios.post("http://localhost:3001/api/attendance", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      if (response.data.sol_leaf_earned > 0) {
        setTodayCheckedIn(true); // 오늘 출석 여부 갱신
        setMonthlyCount((prev) => prev + 1); // 이번 달 출석 횟수 증가
        setSolAnimation(true); // 솔 애니메이션 표시
        localStorage.removeItem("animationClosed"); // 애니메이션 표시 상태 초기화
      }
    } catch (error) {
      console.error("Error checking in:", error.message);
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("출석 처리에 실패했습니다.");
      }
    }
  };

  const closeAnimation = () => {
    setSolAnimation(false);
    localStorage.setItem("animationClosed", "true");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="attendance-check">
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
            <div className="inside-circle">
              <span className="label">이달의 출석횟수</span>
              <span className="count">{monthlyCount}</span>
            </div>
          </div>
        </div>

        <button
          className="check-in-button"
          onClick={checkInAttendance}
          disabled={todayCheckedIn}
          style={{
            padding: "10px 20px",
            backgroundColor: todayCheckedIn ? "#ccc" : "blue",
            color: "white",
            border: "none",
            cursor: todayCheckedIn ? "not-allowed" : "pointer",
          }}
        >
          {todayCheckedIn ? "오늘 출석 완료" : "오늘 출석하기"}
        </button>
        {/* 메시지 표시 */}
        {message && (
          <p style={{ color: todayCheckedIn ? "green" : "red" }}>{message}</p>
        )}
      </div>

      {/* Sol Animation */}
      {solAnimation && (
        <div
          className="frame-9"
          key={Date.now()} // 매번 새로운 키로 DOM 강제 갱신
        >
          <button className="close-buttons" onClick={closeAnimation}>
            ×
          </button>
          <img className="solleaf" src={solleaf10} alt="Leaf Image 28" />
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="burst-particle" key={index}></div>
          ))}
        </div>
      )}

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
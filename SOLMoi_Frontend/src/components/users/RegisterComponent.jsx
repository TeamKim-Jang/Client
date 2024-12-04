import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSchool } from "../../contexts/schoolContext";
import '../../styles/User.css';

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { selectedSchool } = useSchool();
  const [schoolName, setSchoolName] = useState("");
  const [isNoSchool, setIsNoSchool] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim() || !nickname.trim() || !birthDate.trim() || !userName.trim()) {
      setErrorMessage("필수 입력 필드를 모두 입력해 주세요.");
      return;
    }

    const payload = {
      email,
      password,
      nickname,
      birth_date: birthDate,
      user_name: userName,
      phone_number: phoneNumber.trim() || null,
      school_name: selectedSchool || "무소속",
    };

    try {
      const response = await axios.post('/api/auth/register', payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/auth/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "회원가입에 실패했습니다. 다시 시도해 주세요.");
      console.error("오류 발생:", error.response || error.message);
    }
  };

  return (
    <div className="user-container">
      <div className="register-page">
        <header className="header">
          <h1>회원가입</h1>
          <button className="close-button" onClick={() => navigate("/")}>×</button>
        </header>
        <form className="user-form" onSubmit={handleRegister}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthDate">생년월일</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>학교</label>
            <p>{selectedSchool || "학교가 선택되지 않았습니다."}</p>
            <Link to="/auth/school">학교 선택</Link>
          </div>
          <button className="user-button" type="submit">가입하기</button>
          <p>
            이미 회원이신가요? <Link to="/auth/login">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
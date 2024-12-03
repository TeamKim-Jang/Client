import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import "../../styles/User.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState(false);
  const { Login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      // 로그인 성공 시
      const result = response.data;
      Login(result);
      navigate("/");
    } catch (error) {
      setLoginCheck(true);
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="user-container">
      <div className="login-page">
        <header className="header">
          <h1>로그인</h1>
          <button className="close-button" onClick={() => navigate("/")}>
            ×
          </button>
        </header>
        <form className="user-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userEmail">이메일</label>
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
          {loginCheck && <p>비밀번호 혹은 아이디를 잘못 입력하셨습니다.</p>}
          <button className="user-button" type="submit">
            로그인
          </button>
        </form>
        <p style={{ paddingLeft: "15px" }}>
          아직 회원이 아니신가요? <Link to="/auth/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;

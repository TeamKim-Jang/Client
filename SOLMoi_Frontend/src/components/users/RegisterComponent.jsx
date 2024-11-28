import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/User.css'

const RegisterComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
            birth_date: birthDate, // 이 값이 정확히 포함되는지 확인
            user_name: userName,
            phone_number: phoneNumber.trim() || null,
            school_name: isNoSchool ? "무소속" : schoolName.trim() || null,
        };
        
        console.log('Payload to send:', payload);

        try {
            const response = await axios.post("http://localhost:3000/auth/register", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                console.log("성공! 이름: " + response.data.userName);
                navigate("/auth/login");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage(error.response.data?.error || "이미 존재하는 이메일입니다.");
            } else {
                setErrorMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
            }
            console.error("오류 발생:", error.response?.data || error);
        }
    };

    return (
        <div className="user-container">
            <div className="status-bar">
                <span className="time">9:41</span>
            </div>
            <div className="register-page">
            <header className="header">
                <h1>회원가입</h1>
                <button className="close-button">×</button>
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
                        <label htmlFor="schoolName">학교 이름</label>
                        <input
                            type="text"
                            id="schoolName"
                            value={isNoSchool ? "무소속" : schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            disabled={isNoSchool}
                        />
                    </div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isNoSchool}
                                onChange={(e) => setIsNoSchool(e.target.checked)} // 상태 업데이트
                            />
                        </label>
                        소속 학교 없음
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

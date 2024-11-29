import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userName, setUserName] = useState("");
    const [onLogin, setOnLogin] = useState(false);
    const [email, setEmail] = useState("");

    // 세션에서 사용자 정보 가져오기
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName) {
            setOnLogin(true);
            setUserName(storedName);
        }
    }, []);

    // 로그아웃
    const Logout = () => {
        sessionStorage.clear();
        setOnLogin(false);
        setUserName("");
        setEmail("");
        window.location.href = "/"; // 페이지 새로고침
    };

    // 로그인
    const Login = (res) => {
        console.log(res, res.email);
        sessionStorage.setItem("user_name", res.userName);
        sessionStorage.setItem("accessToken", res.token);
        sessionStorage.setItem("email", res.email);
        setUserName(res.userName);
        setOnLogin(true);
        setEmail(res.email);
    };

    return (
        <UserContext.Provider
            value={{
                userName,
                setUserName,
                onLogin,
                setOnLogin,
                Logout,
                Login,
                email,
                setEmail,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const {
        onLogin,
        setOnLogin,
        Logout,
        email,
        userName,
        setEmail,
        Login, // Login 함수 추가
    } = useContext(UserContext);

    return { onLogin, setOnLogin, Logout, email, userName, setEmail, Login };
}

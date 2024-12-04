//contexts/userContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userName, setUserName] = useState("");
    const [onLogin, setOnLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);

    // 세션에서 사용자 정보 가져오기
    useEffect(() => {
        const storedName = sessionStorage.getItem("user_name");
        const storedEmail = sessionStorage.getItem("email");
        const storedToken = sessionStorage.getItem("accessToken");
        const storedUserId = sessionStorage.getItem("user_id");
        if (storedName && storedEmail && storedToken && storedUserId) {
            setOnLogin(true);
            setUserName(storedName);
            setEmail(storedEmail);
            setUserId(storedUserId);
        }
    }, []);

    // 로그아웃
    const Logout = () => {
        sessionStorage.clear();
        setOnLogin(false);
        setUserName("");
        setEmail("");
        setUserId(null);
        window.location.href = "/";
    };

    // 로그인
    const Login = (res) => {
        console.log(res, res.email);
        sessionStorage.setItem("user_name", res.userName);
        sessionStorage.setItem("accessToken", res.token);
        sessionStorage.setItem("email", res.email);
        sessionStorage.setItem("user_id", res.user_id);
        setUserName(res.userName);
        setOnLogin(true);
        setEmail(res.email);
        setUserId(res.user_id);
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
                userId,
                setUserId,
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
        Login,
        userId,
        setUserId,
    } = useContext(UserContext);

    return { onLogin, setOnLogin, Logout, email, userName, setEmail, Login, userId, setUserId };
}
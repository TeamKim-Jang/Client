import { createContext, useContext, useState } from "react";

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
    const [selectedSchool, setSelectedSchool] = useState("");
    const [isNoSchool, setIsNoSchool] = useState(false); // 소속 학교 없음 체크 상태

    return (
        <SchoolContext.Provider
            value={{
                selectedSchool,
                setSelectedSchool,
                isNoSchool,
                setIsNoSchool,
            }}
        >
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchool = () => useContext(SchoolContext);

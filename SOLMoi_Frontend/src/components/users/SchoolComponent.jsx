import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchool } from "../../contexts/schoolContext";
import ListGroup from "react-bootstrap/ListGroup";
import "../../styles/User.css";
let debounceTimer;

const SchoolComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolResults, setSchoolResults] = useState([]);
  const [isNoSchool, setIsNoSchool] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(""); // 선택된 학교
  const { setSelectedSchool: updateSelectedSchool } = useSchool();
  const navigate = useNavigate();

  // 디바운스를 활용한 검색
  const handleSearch = async (term) => {
    if (!term.trim()) {
      setSchoolResults([]);
      return;
    }
    try {
      const response = await axios.get(`/api/schools`, {
        params: { query: term },
      });
      setSchoolResults(response.data.schools);
    } catch (error) {
      console.error(
        "Error searching schools:",
        error.response || error.message
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedSchool("");

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  const handleSelectSchool = (schoolName) => {
    setSelectedSchool(schoolName);
    setSearchTerm(schoolName);
    setSchoolResults([]);
  };

  const handleNext = () => {
    const finalSchool = isNoSchool ? "무소속" : selectedSchool || "무소속";
    updateSelectedSchool(finalSchool);
    navigate("/auth/register");
  };

  return (
    <div className="user-container">
      <div className="school-page">
        <header className="header">
          <h1>회원가입 - 학교 선택</h1>
          <button className="close-button" onClick={() => navigate("/")}>
            ×
          </button>
        </header>
        <form className="user-form">
          <div className="form-group">
            <label htmlFor="search">학교 검색</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleInputChange}
              disabled={isNoSchool}
              placeholder="학교명을 입력하세요"
            />
          </div>
          {!isNoSchool && (
            <ListGroup>
              {schoolResults.map((school) => (
                <ListGroup.Item
                  key={school.id}
                  active={selectedSchool === school.name}
                  action
                  onClick={() => handleSelectSchool(school.name)}
                >
                  {school.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <label>
            <input
              type="checkbox"
              checked={isNoSchool}
              onChange={(e) => {
                setIsNoSchool(e.target.checked);
                setSelectedSchool("");
                setSearchTerm("");
                setSchoolResults([]);
              }}
            />
          </label>
          소속 학교 없음
          <button
            className="user-button"
            onClick={handleNext}
            disabled={!isNoSchool && !selectedSchool} // 선택되지 않으면 비활성화
          >
            다음
          </button>
        </form>
      </div>
    </div>
  );
};

export default SchoolComponent;

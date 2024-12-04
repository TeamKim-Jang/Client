import { createBrowserRouter } from "react-router-dom";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";
import SolMainPage from "../components/SolMainPage/SolMainPage";
import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import MockInvestMainBoard from "../routes/MockInvestMainBoard";
import UpdownGameBoard from "../routes/UpdownGameBoard";
import { SchoolProvider } from "../contexts/schoolContext";
import SchoolComponent from "../components/users/SchoolComponent";
export const mainRoutes = [
  {
    path: "/",
    element: <SolMainPage></SolMainPage>,
    index: true,
  },
  {
    path: "/stock",
    element: <MockInvestMainBoard></MockInvestMainBoard>,
    index: true,
  },
  {
    path: "/updowngame",
    element: <UpdownGameBoard></UpdownGameBoard>,
    index: true,
  },
  {
    path: "/news",
    element: <NewsFeed></NewsFeed>,
  },
  {
    path: "/solleafcontent",
    element: <Solleafcontent></Solleafcontent>
  },
  {
    path: "/auth/login",
    element: <LoginBoard></LoginBoard>,
    index: true,
  },
  {
    path: "/auth/school", // 학교 선택 페이지 추가
    element: (
      <SchoolProvider>
        <SchoolComponent />
      </SchoolProvider>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <SchoolProvider>
        <RegisterBoard />
      </SchoolProvider>
    ), // 컨텍스트 적용
    index: true,
  },
  {
    path: "/attendance",
    element: <AttendanceCheckBoard></AttendanceCheckBoard>,
    index: true,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

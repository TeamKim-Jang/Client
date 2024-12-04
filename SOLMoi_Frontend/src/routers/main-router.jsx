import { createBrowserRouter } from "react-router-dom";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";
import SolMainPage from "../components/SolMainPage/SolMainPage";
import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import MockInvestMainBoard from "../routes/MockInvestMainBoard";
import UpdownGameBoard from "../routes/UpdownGameBoard";
import OverallRanking from "../components/ranking/OverallRanking";
import SchoolRanking from "../components/ranking/SchoolRanking";
import StockPage from "../routes/StockPage.jsx";
import BuyBoard from "../routes/BuyBoard.jsx"; // 매수 페이지
import SellBoard from "../routes/SellBoard.jsx"; // 매도 페이지
import Random from "../components/Random/RandomReward"; // 매도 페이지

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
    path: "/auth/register",
    element: <RegisterBoard></RegisterBoard>,
    index: true,
  },
  {
    path: "/attendance",
    element: <AttendanceCheckBoard></AttendanceCheckBoard>,
    index: true,
  },
  {
    path: "/ranking/overall",
    element: <OverallRanking />,
    index: true,
  },
  {
    path: "/ranking/school/:schoolId",
    element: <SchoolRanking />,
    index: true,
  },
  {
    path: "/stock/:stockCode",
    element: <StockPage />,
  },
  {
    path: "/stock/:stockCode/buy", // 매수 라우트
    element: <BuyBoard />,
  },
  {
    path: "/stock/:stockCode/sell", // 매도 라우트
    element: <SellBoard />,
  },
  {
    path: "/random", // 매도 라우트
    element: <Random />,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

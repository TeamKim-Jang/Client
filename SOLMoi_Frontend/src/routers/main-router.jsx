import { createBrowserRouter } from "react-router-dom";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";
import SolMainPage from "../components/SolMainPage/SolMainPage";
import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import InvestMainBoard from "../routes/InvestMainBoard";
import OverallRanking from "../components/ranking/OverallRanking";
import SchoolRanking from "../components/ranking/SchoolRanking";
import StockPage from "../routes/StockPage.jsx";
import BuyBoard from "../routes/BuyBoard.jsx"; // 매수 페이지
import SellBoard from "../routes/SellBoard.jsx"; // 매도 페이지

export const mainRoutes = [
  {
    path: "/",
    element: <SolMainPage />,
    index: true,
  },
  {
    path: "/stock",
    element: <InvestMainBoard />,
    index: true,
  },
  {
    path: "/news",
    element: <NewsFeed />,
  },
  {
    path: "/solleafcontent",
    element: <Solleafcontent />,
  },
  {
    path: "/auth/login",
    element: <LoginBoard />,
    index: true,
  },
  {
    path: "/auth/register",
    element: <RegisterBoard />,
    index: true,
  },
  {
    path: "/attendance",
    element: <AttendanceCheckBoard />,
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
];

const router = createBrowserRouter(mainRoutes);
export default router;

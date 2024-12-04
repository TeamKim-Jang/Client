import { createBrowserRouter } from "react-router-dom";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";
import SolMainPage from "../components/SolMainPage/SolMainPage";
import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import OverallRanking from "../components/ranking/OverallRanking";
import SchoolRanking from "../components/ranking/SchoolRanking";
import StockPage from "../routes/StockPage.jsx";
import BuyBoard from "../routes/BuyBoard.jsx";
import SellBoard from "../routes/SellBoard.jsx";
import MockInvestMainBoard from "../routes/MockInvestMainBoard";
import UpdownGameBoard from "../routes/UpdownGameBoard";

export const mainRoutes = [
  {
    path: "/",
    element: <SolMainPage />,
  },
  {
    path: "/stock",
    element: <MockInvestMainBoard />,
  },
  {
    path: "/stock/:stockCode",
    element: <StockPage />,
  },
  {
    path: "/stock/:stockCode/buy",
    element: <BuyBoard />,
  },
  {
    path: "/stock/:stockCode/sell",
    element: <SellBoard />,
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
  },
  {
    path: "/auth/register",
    element: <RegisterBoard />,
  },
  {
    path: "/attendance",
    element: <AttendanceCheckBoard />,
  },
  {
    path: "/ranking/overall",
    element: <OverallRanking />,
  },
  {
    path: "/ranking/school/:schoolId",
    element: <SchoolRanking />,
  },
  {
    path: "/updowngame",
    element: <UpdownGameBoard />,
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

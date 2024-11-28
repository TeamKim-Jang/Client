import { createBrowserRouter } from "react-router-dom";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";
import SolMainPage from "../components/SolMainPage/SolMainPage"
import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import InvestMainBoard from "../routes/InvestMainBoard";

export const mainRoutes = [
  {
    path: "/",
    element: <SolMainPage></SolMainPage>,
    index: true,
  },
  {
    path: "/stock",
    element: <InvestMainBoard></InvestMainBoard>,
    index: true,
  },
  {
    path: "/news",
    element: <NewsFeed></NewsFeed>,
  },
  {
    path: "/solleafcontent",
    element: <Solleafcontent></Solleafcontent>,

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
    path:"/attendance",
    element: <AttendanceCheckBoard></AttendanceCheckBoard>,
    index: true,
  }
];

const router = createBrowserRouter(mainRoutes);
export default router;
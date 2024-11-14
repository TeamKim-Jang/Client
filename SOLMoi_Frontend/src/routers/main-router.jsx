// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";
import NewsFeed from "../components/NewsPage/NewsFeed";

export const mainRoutes = [
  {
    path: "/",
    element: <InvestMainBoard></InvestMainBoard>,
    index: true,
  },
  {
    path: "/news",
    element: <NewsFeed></NewsFeed>,
  }
];

const router = createBrowserRouter(mainRoutes);
export default router;

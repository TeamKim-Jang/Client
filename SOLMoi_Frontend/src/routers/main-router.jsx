// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";
import NewsFeed from "../components/NewsPage/NewsFeed";
import Solleafcontent from "../components/Solleafcontent/Solleafcontent";

export const mainRoutes = [
  {
    path: "/",
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
  }
];

const router = createBrowserRouter(mainRoutes);
export default router;
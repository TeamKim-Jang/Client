// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";
import UpdownGameBoard from "../routes/UpdownGameBoard";

export const mainRoutes = [
  {
    path: "/stockmain",
    element: <InvestMainBoard></InvestMainBoard>,
    index: true,
  },
  {
    path: "/updowngame",
    element: <UpdownGameBoard></UpdownGameBoard>,
    index: true,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

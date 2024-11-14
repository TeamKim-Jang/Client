// Router: 각 URL에 따른 page 컴포넌트 연결
import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";

export const mainRoutes = [
  {
    path: "/",
    element: <InvestMainBoard></InvestMainBoard>,
    index: true,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

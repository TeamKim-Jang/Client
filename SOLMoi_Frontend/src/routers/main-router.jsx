import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";
import StockPage from "../routes/StockPage.jsx";

export const mainRoutes = [
  {
    path: "/",
    element: <InvestMainBoard></InvestMainBoard>,
    index: true,
  },
  {
    path: "/stock/:stockCode",
    element: <StockPage />,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

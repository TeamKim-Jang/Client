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

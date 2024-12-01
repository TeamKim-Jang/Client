import { createBrowserRouter } from "react-router-dom";

import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";
import InvestMainBoard from "../routes/InvestMainBoard";
import OverallRanking from '../components/ranking/OverallRanking';
import SchoolRanking from '../components/ranking/SchoolRanking';

export const mainRoutes = [
  {
    path: "/",
    element: <InvestMainBoard />,
    index: true,
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
];

const router = createBrowserRouter(mainRoutes);
export default router;

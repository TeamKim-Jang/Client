import { createBrowserRouter } from "react-router-dom";
import InvestMainBoard from "../routes/investMainBoard";
import UpdownGameBoard from "../routes/UpdownGameBoard";

import LoginBoard from "../routes/loginBoard";
import RegisterBoard from "../routes/registerBoard";
import AttendanceCheckBoard from "../routes/AttendanceCheckBoard";

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
  {
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
    path: "/attendance",
    element: <AttendanceCheckBoard></AttendanceCheckBoard>,
    index: true,
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;

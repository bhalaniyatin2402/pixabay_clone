import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Favorite from "../pages/fovorite/Fovorite";
import History from "../pages/history/History";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="/user/favorite" element={<Favorite />} />
      <Route path="/user/history" element={<History />} />
    </Routes>
  );
}

export default CustomRoutes;

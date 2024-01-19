import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default CustomRoutes

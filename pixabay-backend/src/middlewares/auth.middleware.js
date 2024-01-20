import JWT from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middleware.js";
import AppError from "../utils/error.utils.js";

// check that user is logged in or not
export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("user unauthorized"));
  }

  const decodeToken = await JWT.verify(token, process.env.JWT_SECRET_KEY);

  if (!decodeToken) {
    return next(new AppError("user unauthorized or token expired"));
  }

  req.user = decodeToken;
  next();
});

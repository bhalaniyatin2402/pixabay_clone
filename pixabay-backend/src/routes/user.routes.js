import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getLoggedInUserDetail,
  getFavoriteList,
  updateFavoriteList,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/sign-up").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router.route("/me").get(isLoggedIn, getLoggedInUserDetail);

// api for user favorite list
router
  .route("/favorite")
  .get(isLoggedIn, getFavoriteList)
  .post(isLoggedIn, updateFavoriteList);

export default router;

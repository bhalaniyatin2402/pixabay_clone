import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getLoggedInUserDetail,
  getFavoriteList,
  updateFavoriteList,
} from "../controllers/user.controller.js";
import {
  addToDownloadHistory,
  getDownloadHistryOfUser,
  removeFromDownloadHistory,
} from "../controllers/user.history.controller.js";
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

// api for user image download history
router
  .route("/history")
  .get(isLoggedIn, getDownloadHistryOfUser)
  .post(isLoggedIn, addToDownloadHistory)
  .delete(isLoggedIn, removeFromDownloadHistory);

export default router;

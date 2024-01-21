import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import User from "../modals/user.model.js";
import AppError from "../utils/error.utils.js";

/**
 * @SIGN_UP
 * @ROUTE @POST
 * @ACCESS public {{url}}/api/user/register
 */

export const signUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new AppError("all fields required to login"));
  }

  if (username.length < 3 || username.length > 20) {
    return next(
      new AppError("length of username must lies between 3 to 20 character")
    );
  }

  if (password.length < 6 || password.length > 12) {
    return next(
      new AppError("length of password must lies between 3 to 20 character")
    );
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return next(new AppError("please enter another email"));
  }

  const user = new User(req.body);

  if (!user) {
    return next(new AppError("registration failed!"));
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "registration successfull",
  });
});

/**
 * @LOGIN
 * @ROUTE @POST
 * @ACCESS public {{url}}/api/user/login
 */

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("email and password is required"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("invalid username or password"));
  }

  // verify user password using bcrypt
  const isCorrectPasswrd = await bcrypt.compare(password, user.password);

  if (!isCorrectPasswrd) {
    return next(new AppError("invalid username or password"));
  }

  user.password = undefined;

  // generate auth token
  const token = await user.generateAuthToken();

  // set token to cookie in client side
  res.cookie("token", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "login succssfully completed",
    username: user.username,
  });
});

/**
 * @LOGOUT
 * @ROUTE @GET
 * @ACCESS logged in user only {{url}}/api/user/logoutr
 */

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "");

  res.status(200).json({
    success: true,
    message: "user logout successfullly",
  });
});

/**
 * @GET_USER_DETAILS
 * @ROUTE @GET
 * @ACCESS logged in user only {{url}}/api/user/me
 */

export const getLoggedInUserDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("pleaese Login!"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * @GET_FAVORITE_LIST
 * @ROUTE @GET
 * @ACCESS logged in user only {{url}}/api/user/favorite
 */

export const getFavoriteList = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("unauthorized!, please login"));
  }

  res.status(200).json({
    success: true,
    favoriteList: user.favorite,
  });
});

/**
 * @UPDATE_FAVORITE_LIST
 * @ROUTE @POST
 * @ACCESS logged in user only {{url}}/api/user/favrite
 */

export const updateFavoriteList = asyncHandler(async (req, res, next) => {
  const { imageId } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("unauthorized!, please login"));
  }

  if (!imageId) {
    return next(new AppError("image id is required"));
  }

  let message = "";

  if (user.favorite.includes(imageId)) {
    // if image save than remove from favorite list
    user.favorite.splice(user.favorite.indexOf(imageId), 1);
    message = "item rmoved from favorite list";
  } else {
    // if not save than add to favorite list
    user.favorite.unshift(imageId);
    message = "item added to favorite list";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message,
  });
});

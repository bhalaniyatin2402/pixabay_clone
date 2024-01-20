import AppError from "../utils/error.utils.js";

/*
 * catch the error of controller function by binding
 * controller function into this asyncHandler funciton
 */

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(new AppError(err, 400)));
  };
};

export default asyncHandler;

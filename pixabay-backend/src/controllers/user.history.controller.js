import AppError from "../utils/error.utils.js";
import User from "../modals/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

/**
 * @GET_USER_HISTORY
 * @ROUTE @GET
 * @ACCESS logged in user only {{url}}/api/user/history
 */

export const getDownloadHistryOfUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("unauthorized user! please login."));
  }

  let userDownloadHistory = [];
  user.history.map((item, i) => {
    let t = item.time;

    userDownloadHistory.push({
      id: i + 1,
      _id: item._id,
      imageId: item.imageId,
      width: item.width,
      height: item.height,
      filename: item.filename,
      date: `${t.getDate()}/${t.getMonth() + 1}/${t.getFullYear()}`,
      time: `${t.getHours()} : ${t.getMinutes()}`,
    });
  });

  res.status(200).json({
    success: true,
    history: userDownloadHistory,
  });
});

/**
 * @ADD_ITEM_TO_HISTORY
 * @ROUTE @POST
 * @ACCCESS logged in user only {{url}}/api/user/history
 */

export const addToDownloadHistory = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { imageId, width, height } = req.body;

  if (!imageId || !width || !height) {
    return next(new AppError("parameter is missing for add into history"));
  }
  const historyData = {
    ...req.body,
    time: new Date(Date.now())
  }

  const result = await User.findByIdAndUpdate(id, {
    $push: { history: { $each: [historyData], $position: 0 } },
  });

  if (!result) {
    return next(new AppError("item not added to history"));
  }

  res.status(200).json({
    success: true,
    message: "item added to history",
  });
});

/**
 * @REMOVE_FROM_HISTORY
 * @ROUTE @DELETE
 * @ACCESS logged in user only {{url}}/api/user/history
 */

export const removeFromDownloadHistory = asyncHandler(
  async (req, res, next) => {
    const { id } = req.user;
    const { historyIds } = req.body;

    const result = await User.findByIdAndUpdate(id, {
      $pull: { history: { _id: { $in: historyIds } } },
    });

    if (!result) {
      return next(new AppError("items not removed from history"));
    }

    res.status(200).json({
      success: true,
      message: "items remvoed from the histroy",
    });
  }
);

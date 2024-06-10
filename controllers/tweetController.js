import { tryCatch } from "../middlewares/error.js";
import { Tweet } from "../models/tweetModel.js";
import { User } from "../models/userModel.js";
import { ErrorHandler } from "../utils/utility.js";

const createTweet = tryCatch(async (req, res, next) => {
  const { content } = req.body;
  const creator = req.userId;

  if (!creator) return next(new ErrorHandler("User not found", 404));

  const tweet = await Tweet.create({
    content,
    creator,
  });

  res.status(201).json({
    success: true,
    message: "Tweet created",
    tweet,
  });
});

const getMyTweets = tryCatch(async (req, res, next) => {
  const tweets = await Tweet.find({ creator: req.userId }).populate("creator");

  res.status(200).json({
    success: true,
    tweets,
  });
});

const getFriendsTweets = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) return next(new ErrorHandler("User not found", 404));

  const tweets = await Tweet.find({
    creator: { $in: user.following },
  }).populate("creator");

  res.status(200).json({
    success: true,
    tweets,
  });
});

export { createTweet, getMyTweets, getFriendsTweets };

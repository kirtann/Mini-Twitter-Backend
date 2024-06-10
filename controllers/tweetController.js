import { tryCatch } from "../middlewares/error.js";
import { Tweet } from "../models/tweetModel.js";
import { User } from "../models/userModel.js";
import { ErrorHandler } from "../utils/utility.js";

const createTweet = tryCatch(async (req, res, next) => {
  const { content } = req.body;

  const tweet = await Tweet.create({
    content,
    user: req.userId,
  });

  res.status(201).json({
    success: true,
    message: "Tweet created",
    tweet,
  });
});

const getMyTweets = tryCatch(async (req, res, next) => {
  const tweets = await Tweet.find({ creator: req.userId }).populate("user");

  res.status(200).json({
    success: true,
    tweets,
  });
});

const getFirendsTweets = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) return next(new ErrorHandler("User not found", 404));

  const tweets = await Tweet.find({
    creator: { $nin: [user.following] },
  }).populate("user");

  res.status(200).json({
    success: true,
    tweets,
  });
});

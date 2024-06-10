import { tryCatch } from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const newUser = tryCatch(async (req, res, next) => {
  const { name, bio, username, password } = req.body;

  const user = await User.create({
    name,
    bio,
    username,
    password,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(201).cookie("auth-token", token, cookieOptions).json({
    sucess: true,
    message: "User created",
    token,
    user,
  });
});

const login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Username Or Password", 404));
  }

  const isMatch = password === user.password;

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Username Or Password", 404));
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("auth-token", token, cookieOptions)
    .json({
      sucess: true,
      message: `Welcome Back, ${user.name}`,
      token,
      user,
    });
});

const getMyProfile = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = tryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "User logout successful",
    });
});

const searchUser = tryCatch(async (req, res, next) => {
  const { name = "" } = req.query;

  const myData = await User.findById(req.userId);

  if (!myData) return next(new ErrorHandler("User not found", 404));

  const allFollowings = myData.following;

  const allUsersExceptMeAndFollowings = await User.find({
    _id: { $nin: [...allFollowings, req.userId] },
    name: { $regex: name, $options: "i" },
  });

  const searchResult = allUsersExceptMeAndFollowings;

  return res.status(200).json({
    success: true,
    searchResult,
  });
});

const addFollowing = tryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const myData = await User.findById(req.userId);

  if (!myData) return next(new ErrorHandler("User not found", 404));

  const usertoFollow = await User.findById(userId);

  if (!usertoFollow) return next(new ErrorHandler("User not found", 404));

  if (myData.following.includes(userId)) {
    return next(new ErrorHandler("Already following", 400));
  }

  myData.following.push(userId);
  usertoFollow.followers.push(req.userId);

  await myData.save();
  await usertoFollow.save();

  return res.status(200).json({
    success: true,
    message: "Following added",
    myData,
  });
});

const getUserDetail = tryCatch(async (req, res, next) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

export {
  newUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  addFollowing,
  getUserDetail,
};

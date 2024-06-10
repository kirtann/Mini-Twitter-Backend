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

export { newUser, login, getMyProfile };

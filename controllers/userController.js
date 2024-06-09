import { tryCatch } from "../middlewares/error.js";
import { User } from "../models/userModel.js";

const newUser = tryCatch(async (req, res, next) => {
  const { name, bio, username, password } = req.body;

  const user = await User.create({
    name,
    bio,
    username,
    password,
  });

  res.status(201).json({
    success: true,
    user,
  });
});

const login = tryCatch(async (req, res, next) => {});

export { newUser, login };

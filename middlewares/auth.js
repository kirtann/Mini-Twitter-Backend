import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
};

export { isAuthenticated };
